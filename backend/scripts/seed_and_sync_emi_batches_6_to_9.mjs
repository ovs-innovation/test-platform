import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { EMI_BATCH6_QUESTIONS } from './seed_emi_part6.mjs';
import { EMI_BATCH7_QUESTIONS } from './seed_emi_part7.mjs';
import { EMI_BATCH8_QUESTIONS } from './seed_emi_part8.mjs';
import { EMI_BATCH9_QUESTIONS } from './seed_emi_part9.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ALL_NEW_QUESTIONS = [
  ...EMI_BATCH6_QUESTIONS,
  ...EMI_BATCH7_QUESTIONS,
  ...EMI_BATCH8_QUESTIONS,
  ...EMI_BATCH9_QUESTIONS
];

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log(`=== Seeding & Syncing ${ALL_NEW_QUESTIONS.length} Questions for Electromagnetic Induction (Batches 6-9) ===`);

  // -------------------------------------------------------------
  // Part 1: Neon PostgreSQL DB Insertion
  // -------------------------------------------------------------
  console.log('\n--- Part 1: Neon Database ---');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();

  let neonInserted = 0;
  let neonSkipped = 0;

  try {
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rowCount === 0) throw new Error("Subject 'Physics' not found in Neon DB");
    const subjectId = subjRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE 'Electromagnetic Induction' AND subject_id = $1 LIMIT 1",
      [subjectId]
    );
    if (chapRes.rowCount === 0) throw new Error("Chapter 'Electromagnetic Induction' not found in Neon DB");
    const chapterId = chapRes.rows[0].id;
    console.log(`Neon DB: Subject ID = ${subjectId}, Chapter ID = ${chapterId}`);

    for (let i = 0; i < ALL_NEW_QUESTIONS.length; i++) {
      const q = ALL_NEW_QUESTIONS[i];
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rowCount > 0) {
        console.log(`[Neon ${i + 1}/${ALL_NEW_QUESTIONS.length}] Skipping existing: ${q.question_text.slice(0, 45)}...`);
        neonSkipped++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            subject_id, chapter_id, category, chapter, topic, question_type,
            question_text, options, correct_index, correct_indices,
            marks, difficulty, solution, image_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            subjectId,
            chapterId,
            'Physics',
            'Electromagnetic Induction',
            'Electromagnetic Induction',
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
        console.log(`[Neon ${i + 1}/${ALL_NEW_QUESTIONS.length}] Inserted: ${q.question_text.slice(0, 45)}...`);
        neonInserted++;
      }
    }
    console.log(`Neon DB Completed: ${neonInserted} inserted, ${neonSkipped} skipped.`);
  } finally {
    client.release();
    await pool.end();
  }

  // -------------------------------------------------------------
  // Part 2: Sync to edvedum.com Live API
  // -------------------------------------------------------------
  console.log('\n--- Part 2: Live edvedum.com API ---');
  let liveCreated = 0;
  let liveSkipped = 0;

  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    if (!loginRes.ok) {
      console.warn(`Live login failed (${loginRes.status}): ${await loginRes.text()}`);
    } else {
      const token = (await loginRes.json()).token;
      console.log('Logged in successfully to edvedum.com as admin.');

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
      const targetChap = chaps.find(c => c.name.toLowerCase() === 'electromagnetic induction');
      if (!targetChap) throw new Error('Chapter Electromagnetic Induction not found on live edvedum.com');
      console.log(`Live edvedum: Chapter ID = ${targetChap.id}`);

      // Fetch existing questions on live
      const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const existingData = await existingRes.json();
      const liveQuestions = existingData.questions || [];
      const liveExistingTexts = new Set(
        liveQuestions
          .filter(q => q.chapter_id === targetChap.id || (q.chapter && q.chapter.toLowerCase() === 'electromagnetic induction'))
          .map(q => q.question_text.trim().toLowerCase())
      );
      console.log(`Found ${liveExistingTexts.size} existing EMI questions on live edvedum.com.`);

      for (let i = 0; i < ALL_NEW_QUESTIONS.length; i++) {
        const q = ALL_NEW_QUESTIONS[i];
        const textKey = q.question_text.trim().toLowerCase();

        if (liveExistingTexts.has(textKey)) {
          console.log(`[Live ${i + 1}/${ALL_NEW_QUESTIONS.length}] Skipping existing: ${q.question_text.slice(0, 45)}...`);
          liveSkipped++;
          continue;
        }

        const payload = {
          subject_id: physicsSub.id,
          chapter_id: targetChap.id,
          category: 'Physics',
          chapter: 'Electromagnetic Induction',
          topic: 'Electromagnetic Induction',
          question_type: q.question_type || 'single_choice',
          question_text: q.question_text,
          options: q.options,
          correct_index: q.correct_index,
          correct_indices: q.correct_indices,
          marks: q.marks || 4,
          difficulty: q.difficulty || 'medium',
          solution: q.solution || '',
          image_url: q.image_url || null,
          is_active: true
        };

        const postRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!postRes.ok) {
          console.error(`[Live ${i + 1}/${ALL_NEW_QUESTIONS.length}] Post error (${postRes.status}):`, await postRes.text());
        } else {
          console.log(`[Live ${i + 1}/${ALL_NEW_QUESTIONS.length}] Created: ${q.question_text.slice(0, 45)}...`);
          liveCreated++;
          liveExistingTexts.add(textKey);
        }
      }
      console.log(`Live edvedum.com Completed: ${liveCreated} created, ${liveSkipped} skipped.`);
    }
  } catch (err) {
    console.error('Error in live sync:', err.message);
  }

  console.log('\n=== All Operations Completed Successfully ===');
  process.exit(0);
}

main().catch(console.error);
