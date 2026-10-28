import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

import { SEMICONDUCTOR_BATCH1_QUESTIONS } from './seed_semiconductor_part1.mjs';
import { SEMICONDUCTOR_BATCH2_QUESTIONS } from './seed_semiconductor_part2.mjs';
import { SEMICONDUCTOR_BATCH3_QUESTIONS } from './seed_semiconductor_part3.mjs';
import { SEMICONDUCTOR_BATCH4_QUESTIONS } from './seed_semiconductor_part4.mjs';
import { SEMICONDUCTOR_BATCH5_QUESTIONS } from './seed_semiconductor_part5.mjs';
import { SEMICONDUCTOR_BATCH6_QUESTIONS } from './seed_semiconductor_part6.mjs';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

// Map question number to its question object from the batches
const QUESTION_MAP = new Map();

// Batch 1: Q1 - Q20
SEMICONDUCTOR_BATCH1_QUESTIONS.forEach((q, idx) => {
  QUESTION_MAP.set(idx + 1, q);
});

// Batch 2: Q21 - Q40
SEMICONDUCTOR_BATCH2_QUESTIONS.forEach((q, idx) => {
  QUESTION_MAP.set(21 + idx, q);
});

// Batch 3: Q41 - Q60
SEMICONDUCTOR_BATCH3_QUESTIONS.forEach((q, idx) => {
  QUESTION_MAP.set(41 + idx, q);
});

// Batch 4: Q61 - Q80
SEMICONDUCTOR_BATCH4_QUESTIONS.forEach((q, idx) => {
  QUESTION_MAP.set(61 + idx, q);
});

// Batch 5: Q81 - Q92
SEMICONDUCTOR_BATCH5_QUESTIONS.forEach((q, idx) => {
  QUESTION_MAP.set(81 + idx, q);
});

// Batch 6: Q98, Q99, Q100
QUESTION_MAP.set(98, SEMICONDUCTOR_BATCH6_QUESTIONS[0]);
QUESTION_MAP.set(99, SEMICONDUCTOR_BATCH6_QUESTIONS[1]);
QUESTION_MAP.set(100, SEMICONDUCTOR_BATCH6_QUESTIONS[2]);

// List of all 51 questions that have diagrams
const DIAGRAM_QUESTION_IDS = [
  14, 19, 20,
  22, 23, 24, 25, 26, 27, 29,
  31, 32, 34, 35, 36, 37, 38,
  43, 44, 47, 51, 53, 54, 55,
  56, 57, 58, 59, 60,
  69, 70, 74, 75,
  76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 89, 91, 92,
  98, 99, 100
];

async function main() {
  console.log(`========================================================================`);
  console.log(`Syncing Semiconductor Diagrams for ${DIAGRAM_QUESTION_IDS.length} Questions`);
  console.log(`Method: Code-based cropping + Cloudinary CDN upload + DB & Live Sync`);
  console.log(`========================================================================\n`);

  // Step 1: Upload each diagram to Cloudinary
  console.log(`--- STEP 1: Uploading Diagrams to Cloudinary ---`);
  const uploadedUrls = new Map(); // id -> secure_url

  for (const id of DIAGRAM_QUESTION_IDS) {
    const filename = `semi_q${id}.png`;
    const localPath = path.resolve(__dirname, `../uploads/semiconductor/${filename}`);

    if (!fs.existsSync(localPath)) {
      throw new Error(`Local crop file missing: ${localPath}`);
    }

    console.log(`Uploading Q${id} diagram (${filename})...`);
    const uploadRes = await uploadImageToCloudinary(localPath, {
      folder: 'edvedum_semiconductor',
      public_id: `semiconductor_q${id}`,
      overwrite: true
    });

    const secureUrl = uploadRes.secure_url;
    uploadedUrls.set(id, secureUrl);
    console.log(`  -> Q${id}: ${secureUrl}`);
  }

  console.log(`\nAll ${uploadedUrls.size} diagrams successfully uploaded to Cloudinary!\n`);

  // Step 2: Update Neon PostgreSQL Database
  console.log(`--- STEP 2: Updating Neon PostgreSQL Database ---`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  let neonUpdated = 0;
  let neonMissing = 0;

  try {
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    const neonSubjectId = subjRes.rows[0].id;
    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE 'Semiconductor Electronics' AND subject_id = $1 LIMIT 1",
      [neonSubjectId]
    );
    const neonChapterId = chapRes.rows[0].id;
    console.log(`Neon target chapter: ${chapRes.rows[0].name} (ID: ${neonChapterId})`);

    for (const id of DIAGRAM_QUESTION_IDS) {
      const q = QUESTION_MAP.get(id);
      const cloudUrl = uploadedUrls.get(id);

      const findRes = await client.query(
        "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = $1 AND question_text = $2",
        [neonChapterId, q.question_text]
      );

      if (findRes.rows.length === 0) {
        console.warn(`[Neon Warning] Q${id} not found by question_text in chapter ${neonChapterId}`);
        neonMissing++;
        continue;
      }

      const row = findRes.rows[0];
      await client.query(
        "UPDATE question_bank SET image_url = $1 WHERE id = $2",
        [cloudUrl, row.id]
      );
      neonUpdated++;
      console.log(`[Neon Updated] Q${id} (DB ID: ${row.id}) -> image_url set`);
    }

    console.log(`Neon DB Update Summary: ${neonUpdated} updated, ${neonMissing} missing.\n`);
  } finally {
    client.release();
    await pool.end();
  }

  // Step 3: Update Live edvedum.com Production API
  console.log(`--- STEP 3: Updating Live edvedum.com Platform ---`);
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed with status ${loginRes.status}: ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Authenticated successfully with edvedum.com as admin.');

  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  const liveChapterQuestions = existingQuestions.filter(q =>
    (q.chapter && q.chapter.toLowerCase().includes('semiconductor')) ||
    q.chapter_id === 77
  );
  console.log(`Found ${liveChapterQuestions.length} Semiconductor questions on edvedum.com.`);

  const liveTextMap = new Map();
  liveChapterQuestions.forEach(q => {
    liveTextMap.set(q.question_text.trim().toLowerCase(), q);
  });

  let liveUpdated = 0;
  let liveMissing = 0;

  for (const id of DIAGRAM_QUESTION_IDS) {
    const q = QUESTION_MAP.get(id);
    const cloudUrl = uploadedUrls.get(id);
    const key = q.question_text.trim().toLowerCase();

    const liveQ = liveTextMap.get(key);
    if (!liveQ) {
      console.warn(`[Live Warning] Q${id} not found on edvedum.com by question_text`);
      liveMissing++;
      continue;
    }

    // PUT update with image_url
    const updatePayload = {
      ...liveQ,
      image_url: cloudUrl
    };

    const putRes = await fetch(`${LIVE_API}/question-bank/${liveQ.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePayload)
    });

    if (!putRes.ok) {
      console.error(`[Live Error] Failed to update Q${id} (ID: ${liveQ.id}): ${await putRes.text()}`);
    } else {
      liveUpdated++;
      console.log(`[Live Updated] Q${id} (Live ID: ${liveQ.id}) -> image_url set`);
    }
  }

  console.log(`\n========================================================================`);
  console.log(`FINAL SYNC SUMMARY:`);
  console.log(`  Cloudinary Uploads: ${uploadedUrls.size} / ${DIAGRAM_QUESTION_IDS.length}`);
  console.log(`  Neon DB Questions Updated: ${neonUpdated} / ${DIAGRAM_QUESTION_IDS.length}`);
  console.log(`  Live edvedum.com Updated: ${liveUpdated} / ${DIAGRAM_QUESTION_IDS.length}`);
  console.log(`========================================================================`);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
