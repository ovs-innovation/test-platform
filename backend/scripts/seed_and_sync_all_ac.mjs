import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { AC_BATCH1_QUESTIONS } from './seed_ac_part1.mjs';
import { AC_BATCH2_QUESTIONS } from './seed_ac_part2.mjs';
import { AC_BATCH3_QUESTIONS } from './seed_ac_part3.mjs';
import { AC_BATCH4_QUESTIONS } from './seed_ac_part4.mjs';
import { AC_BATCH5_QUESTIONS } from './seed_ac_part5.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const ALL_AC_QUESTIONS = [
  ...AC_BATCH1_QUESTIONS,
  ...AC_BATCH2_QUESTIONS,
  ...AC_BATCH3_QUESTIONS,
  ...AC_BATCH4_QUESTIONS,
  ...AC_BATCH5_QUESTIONS
];

async function run() {
  console.log(`=======================================================`);
  console.log(`Starting Seed & Sync for Alternating Current (Total: ${ALL_AC_QUESTIONS.length} Questions)`);
  console.log(`=======================================================\n`);

  // --- Step 1: Seed into Neon PostgreSQL ---
  console.log('=== Step 1: Seeding into Neon Database ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();

  let neonChapterId = null;
  let neonSubjectId = null;

  try {
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) throw new Error("Physics subject not found in Neon DB");
    neonSubjectId = subjRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE 'Alternating Current' AND subject_id = $1 LIMIT 1",
      [neonSubjectId]
    );
    if (chapRes.rows.length === 0) throw new Error("Alternating Current chapter not found in Neon DB");
    neonChapterId = chapRes.rows[0].id;

    console.log(`Using Neon DB - Subject ID: ${neonSubjectId}, Chapter ID: ${neonChapterId}`);

    let neonInserted = 0;
    let neonSkipped = 0;

    for (let i = 0; i < ALL_AC_QUESTIONS.length; i++) {
      const q = ALL_AC_QUESTIONS[i];
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, neonChapterId]
      );

      if (existing.rows.length > 0) {
        neonSkipped++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            subject_id, chapter_id, chapter, category, topic, question_type,
            question_text, options, correct_index, correct_indices,
            marks, difficulty, solution, image_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            neonSubjectId,
            neonChapterId,
            'Alternating Current',
            'Physics',
            'Alternating Current',
            q.question_type || 'single_choice',
            q.question_text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify(q.correct_indices),
            q.marks || 4,
            q.difficulty || 'medium',
            q.solution,
            q.image_url || null
          ]
        );
        neonInserted++;
      }
    }

    console.log(`Neon DB Result: ${neonInserted} inserted, ${neonSkipped} skipped (total ${ALL_AC_QUESTIONS.length})\n`);
  } finally {
    client.release();
    await pool.end();
  }

  // --- Step 2: Sync to Live edvedum.com ---
  console.log('=== Step 2: Syncing to Live edvedum.com API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Live login failed: ${loginRes.status} ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Successfully authenticated as admin with edvedum.com');

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on live edvedum.com');

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === 'alternating current');
  if (!liveChap) throw new Error('Alternating Current chapter not found on live edvedum.com');

  console.log(`Using Live edvedum.com - Subject ID: ${physicsSub.id}, Chapter ID: ${liveChap.id}`);

  // Fetch existing live questions
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  const existingTexts = new Set(
    existingQuestions
      .filter(q => (liveChap.id && q.chapter_id === liveChap.id) || (q.chapter && q.chapter.toLowerCase() === 'alternating current'))
      .map(q => q.question_text.trim())
  );

  console.log(`Existing Alternating Current questions on live: ${existingTexts.size}`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_AC_QUESTIONS.length; i++) {
    const q = ALL_AC_QUESTIONS[i];
    if (existingTexts.has(q.question_text.trim())) {
      liveSkipped++;
      continue;
    }

    const payload = {
      subject_id: physicsSub.id,
      chapter_id: liveChap.id,
      chapter: 'Alternating Current',
      category: 'Physics',
      topic: 'Alternating Current',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution,
      image_url: q.image_url || null
    };

    try {
      const createRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (createRes.ok) {
        liveInserted++;
        if (liveInserted % 10 === 0 || liveInserted === ALL_AC_QUESTIONS.length) {
          console.log(`Live sync progress: ${liveInserted} questions inserted...`);
        }
      } else {
        console.error(`Failed to insert Q${i + 1} on live:`, createRes.status, await createRes.text());
        liveFailed++;
      }
    } catch (err) {
      console.error(`Error inserting Q${i + 1} on live:`, err.message);
      liveFailed++;
    }
  }

  console.log(`\nLive edvedum.com Result: ${liveInserted} inserted, ${liveSkipped} skipped, ${liveFailed} failed.\n`);

  // --- Step 3: Verification & Invalidation ---
  console.log('=== Step 3: Verifying Final Counts ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = (verifyData.questions || []).filter(q =>
    (liveChap.id && q.chapter_id === liveChap.id) ||
    (q.chapter && q.chapter.toLowerCase() === 'alternating current')
  );
  console.log(`Total Alternating Current questions now on live edvedum.com: ${verifyQuestions.length}`);

  console.log('\n=======================================================');
  console.log('Seed and sync completed successfully!');
  console.log('=======================================================');
}

run().catch(console.error);
