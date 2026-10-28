import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { NUCLEI_BATCH1_QUESTIONS } from './seed_nuclei_part1.mjs';
import { NUCLEI_BATCH2_QUESTIONS } from './seed_nuclei_part2.mjs';
import { NUCLEI_BATCH3_QUESTIONS } from './seed_nuclei_part3.mjs';
import { NUCLEI_BATCH4_QUESTIONS } from './seed_nuclei_part4.mjs';
import { NUCLEI_BATCH5_QUESTIONS } from './seed_nuclei_part5.mjs';
import { NUCLEI_BATCH6_QUESTIONS } from './seed_nuclei_part6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ALL_NUCLEI_QUESTIONS = [
  ...NUCLEI_BATCH1_QUESTIONS,
  ...NUCLEI_BATCH2_QUESTIONS,
  ...NUCLEI_BATCH3_QUESTIONS,
  ...NUCLEI_BATCH4_QUESTIONS,
  ...NUCLEI_BATCH5_QUESTIONS,
  ...NUCLEI_BATCH6_QUESTIONS
];

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log(`================================================================`);
  console.log(`Starting Nuclei Seeding and Sync for ${ALL_NUCLEI_QUESTIONS.length} Questions`);
  console.log(`  Part 1 (Section A Q1-Q20): ${NUCLEI_BATCH1_QUESTIONS.length}`);
  console.log(`  Part 2 (Section A Q21-Q40): ${NUCLEI_BATCH2_QUESTIONS.length}`);
  console.log(`  Part 3 (Section A Q41-Q60): ${NUCLEI_BATCH3_QUESTIONS.length}`);
  console.log(`  Part 4 (Section A Q61-Q80): ${NUCLEI_BATCH4_QUESTIONS.length}`);
  console.log(`  Part 5 (Section A Q81-Q93): ${NUCLEI_BATCH5_QUESTIONS.length}`);
  console.log(`  Part 6 (Section B AR Q1-Q15): ${NUCLEI_BATCH6_QUESTIONS.length}`);
  console.log(`================================================================\n`);

  // ==========================================
  // PHASE 1: SEED NEON POSTGRESQL DATABASE
  // ==========================================
  console.log(`--- PHASE 1: Seeding Neon Database ---`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  let neonInserted = 0;
  let neonSkipped = 0;

  try {
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) throw new Error("Subject 'Physics' not found in Neon DB");
    const neonSubjectId = subjRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE 'Nuclei' AND subject_id = $1 LIMIT 1",
      [neonSubjectId]
    );
    if (chapRes.rows.length === 0) throw new Error("Chapter 'Nuclei' not found in Neon DB");
    const neonChapterId = chapRes.rows[0].id;
    console.log(`Neon DB target chapter '${chapRes.rows[0].name}' (ID: ${neonChapterId}, Subject ID: ${neonSubjectId})`);

    for (let i = 0; i < ALL_NUCLEI_QUESTIONS.length; i++) {
      const q = ALL_NUCLEI_QUESTIONS[i];
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, neonChapterId]
      );

      if (existing.rows.length > 0) {
        neonSkipped++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            subject_id, chapter_id, category, question_type,
            question_text, options, correct_index, correct_indices,
            marks, difficulty, solution, image_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            neonSubjectId,
            neonChapterId,
            'Physics',
            q.question_type || 'single_choice',
            q.question_text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify(q.correct_indices),
            q.marks || 4,
            q.difficulty || 'medium',
            q.solution || '',
            q.image_url || null
          ]
        );
        neonInserted++;
      }
    }
    console.log(`Neon DB Seeding Complete: ${neonInserted} inserted, ${neonSkipped} skipped (already present).\n`);
  } finally {
    client.release();
    await pool.end();
  }

  // ==========================================
  // PHASE 2: SYNC TO LIVE EDVEDUM.COM API
  // ==========================================
  console.log(`--- PHASE 2: Syncing to Live edvedum.com Production API ---`);
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

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on edvedum.com');
  const liveSubjectId = physicsSub.id;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  const liveChap = chaps.find(c => c.name.toLowerCase() === 'nuclei');
  if (!liveChap) throw new Error('Chapter "Nuclei" not found on edvedum.com');
  console.log(`Live edvedum chapter '${liveChap.name}' (ID: ${liveChap.id}, Subject ID: ${liveSubjectId})`);

  // Fetch all existing questions in chapter Nuclei on edvedum.com
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  const existingInChapter = existingQuestions.filter(q =>
    (liveChap.id && q.chapter_id === liveChap.id) ||
    (q.chapter && q.chapter.toLowerCase() === 'nuclei')
  );
  console.log(`Found ${existingInChapter.length} existing questions in chapter "Nuclei" on edvedum.com.`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  let liveInserted = 0;
  let liveSkipped = 0;

  for (let i = 0; i < ALL_NUCLEI_QUESTIONS.length; i++) {
    const q = ALL_NUCLEI_QUESTIONS[i];
    const key = q.question_text.trim().toLowerCase();
    if (existingTextSet.has(key)) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: liveSubjectId,
      chapter_id: liveChap.id,
      chapter: 'Nuclei',
      topic: 'Nuclei',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      marks: 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: ''
    };

    let retries = 3;
    let uploaded = false;
    while (retries > 0 && !uploaded) {
      try {
        const uploadRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (uploadRes.ok) {
          uploaded = true;
          liveInserted++;
          if ((liveInserted % 10 === 0) || (liveInserted === ALL_NUCLEI_QUESTIONS.length)) {
            console.log(`[${i + 1}/${ALL_NUCLEI_QUESTIONS.length}] Uploaded: "${q.question_text.slice(0, 40)}..."`);
          }
        } else {
          const errText = await uploadRes.text();
          console.warn(`[${i + 1}/${ALL_NUCLEI_QUESTIONS.length}] Upload failed (status ${uploadRes.status}): ${errText}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.warn(`[${i + 1}/${ALL_NUCLEI_QUESTIONS.length}] Error uploading: ${err.message}`);
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log(`\nLive edvedum.com Sync Complete: ${liveInserted} inserted, ${liveSkipped} skipped.`);

  // ==========================================
  // PHASE 3: FINAL VERIFICATION
  // ==========================================
  console.log(`\n================================================================`);
  console.log(`SUMMARY OF SEED & SYNC:`);
  console.log(`Total questions in Chapter Nuclei: ${ALL_NUCLEI_QUESTIONS.length}`);
  console.log(`Neon Database: ${neonInserted} inserted, ${neonSkipped} skipped (Total present: ${neonInserted + neonSkipped})`);
  console.log(`Live edvedum.com: ${liveInserted} inserted, ${liveSkipped} skipped (Total present: ${liveInserted + liveSkipped})`);
  console.log(`================================================================\n`);
}

main().catch(err => {
  console.error('Fatal error during seed & sync:', err);
  process.exit(1);
});
