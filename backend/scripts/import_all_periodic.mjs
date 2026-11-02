import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_pt_mcq.mjs';
import { batch2Questions } from './batch2_pt_mcq.mjs';
import { batch3Questions } from './batch3_pt_mcq.mjs';
import { batch4Questions } from './batch4_pt_mcq.mjs';
import { batch5Questions } from './batch5_pt_mcq.mjs';
import { batch6ARQuestions } from './batch6_pt_ar.mjs';

const SUBJECT_ID = 10;
const CHAPTER_ID = 155;
const CHAPTER = 'Periodic Table';
const CATEGORY = 'Chemistry';

async function importAll() {
  console.log('=== Starting Full Import for Periodic Table (Local DB) ===');

  // Verify / ensure clean state for this chapter in local DB
  const existing = await pool.query(
    "SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1 OR chapter = $2",
    [CHAPTER_ID, CHAPTER]
  );
  console.log(`Pre-existing questions in Periodic Table: ${existing.rows[0].count}`);

  if (Number(existing.rows[0].count) > 0) {
    console.log('Cleaning up pre-existing questions in chapter 155...');
    await pool.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR chapter = $2",
      [CHAPTER_ID, CHAPTER]
    );
  }

  const allMCQs = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions,
    ...batch5Questions
  ];

  console.log(`Inserting ${allMCQs.length} MCQs...`);
  let mcqCount = 0;
  for (const q of allMCQs) {
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id, chapter_id, category, chapter, topic,
        question_type, question_text, image_url, options,
        correct_index, solution, marks, difficulty, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.topic,
        'mcq',
        q.question_text,
        q.image_url || null,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.marks || 4,
        q.difficulty || 'medium',
        'available'
      ]
    );
    mcqCount++;
    if (mcqCount % 35 === 0 || mcqCount === allMCQs.length) {
      console.log(`[MCQ] Inserted ${mcqCount}/${allMCQs.length} (Latest Local ID: ${res.rows[0].id})`);
    }
  }

  console.log(`Inserting ${batch6ARQuestions.length} AR questions...`);
  let arCount = 0;
  for (const q of batch6ARQuestions) {
    const questionText = `Assertion (A): ${q.assertion_text}\nReason (R): ${q.reason_text}`;
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id, chapter_id, category, chapter, topic,
        question_type, question_text, assertion_text, reason_text,
        options, correct_index, solution, marks, difficulty, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.topic,
        'assertion_reason',
        questionText,
        q.assertion_text,
        q.reason_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.marks || 4,
        q.difficulty || 'medium',
        'available'
      ]
    );
    arCount++;
    console.log(`[AR] Inserted AR Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }

  const finalCheck = await pool.query(
    "SELECT question_type, COUNT(*) FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
    [CHAPTER_ID]
  );
  console.log('=== Final Local DB Breakdown for Periodic Table ===', finalCheck.rows);

  const range = await pool.query(
    "SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as total FROM question_bank WHERE chapter_id = $1",
    [CHAPTER_ID]
  );
  console.log('Local ID Range:', range.rows[0]);

  process.exit(0);
}

importAll().catch(err => {
  console.error(err);
  process.exit(1);
});

