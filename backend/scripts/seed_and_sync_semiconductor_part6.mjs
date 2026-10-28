import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { SEMICONDUCTOR_BATCH6_QUESTIONS } from './seed_semiconductor_part6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log(`================================================================`);
  console.log(`Starting Semiconductor Batch 6 Seeding & Sync for ${SEMICONDUCTOR_BATCH6_QUESTIONS.length} Questions`);
  console.log(`  Section A Q98-Q100 (Objective): 3`);
  console.log(`  Section B Q1-Q22 (Assertion-Reason): 22`);
  console.log(`================================================================\n`);

  // Phase 1: Neon Database
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
    const neonSubjectId = subjRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE 'Semiconductor Electronics' AND subject_id = $1 LIMIT 1",
      [neonSubjectId]
    );
    const neonChapterId = chapRes.rows[0].id;
    console.log(`Neon DB Chapter: '${chapRes.rows[0].name}' (ID: ${neonChapterId}, Subject ID: ${neonSubjectId})`);

    for (let i = 0; i < SEMICONDUCTOR_BATCH6_QUESTIONS.length; i++) {
      const q = SEMICONDUCTOR_BATCH6_QUESTIONS[i];
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
    console.log(`Neon DB Batch 6 Complete: ${neonInserted} inserted, ${neonSkipped} skipped.\n`);
  } finally {
    client.release();
    await pool.end();
  }

  // Phase 2: Live edvedum.com
  console.log(`--- PHASE 2: Syncing to Live edvedum.com ---`);
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  const token = (await loginRes.json()).token;
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  const liveSubjectId = physicsSub.id;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase().includes('semiconductor'));
  console.log(`Live edvedum chapter: '${liveChap.name}' (ID: ${liveChap.id})`);

  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingQuestions = (await existingRes.json()).questions || [];
  const existingInChapter = existingQuestions.filter(q =>
    (liveChap.id && q.chapter_id === liveChap.id) ||
    (q.chapter && q.chapter.toLowerCase().includes('semiconductor'))
  );
  console.log(`Existing in chapter on live: ${existingInChapter.length}`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  let liveInserted = 0;
  let liveSkipped = 0;

  for (let i = 0; i < SEMICONDUCTOR_BATCH6_QUESTIONS.length; i++) {
    const q = SEMICONDUCTOR_BATCH6_QUESTIONS[i];
    const key = q.question_text.trim().toLowerCase();
    if (existingTextSet.has(key)) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: liveSubjectId,
      chapter_id: liveChap.id,
      chapter: 'Semiconductor Electronics',
      topic: 'Semiconductor Electronics',
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
          console.log(`[${i + 1}/${SEMICONDUCTOR_BATCH6_QUESTIONS.length}] Uploaded: "${q.question_text.slice(0, 45)}..."`);
        } else {
          const errText = await uploadRes.text();
          console.warn(`Upload failed: ${errText}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.warn(`Error: ${err.message}`);
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log(`\nLive Sync Complete: ${liveInserted} inserted, ${liveSkipped} skipped.`);
}

main().catch(err => {
  console.error('Error during batch 6 seed & sync:', err);
  process.exit(1);
});
