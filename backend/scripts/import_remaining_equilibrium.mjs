import { pool } from '../src/config/db.js';
import { batch8Questions } from './batch8_eq_mcq.mjs';
import { batch9ARQuestions } from './batch9_eq_ar.mjs';

const SUBJECT_ID = 10;
const CHAPTER_ID = 73;
const CHAPTER = 'Equilibrium';
const CATEGORY = 'Chemistry';

async function importRemaining() {
  console.log('=== Importing Remaining Equilibrium Questions to Local DB ===');

  // 1. Import Batch 8 MCQs
  console.log(`Inserting ${batch8Questions.length} remaining MCQs...`);
  for (const q of batch8Questions) {
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id, chapter_id, category, chapter, topic,
        question_type, question_text, options, correct_index,
        solution, marks, difficulty, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.topic,
        'mcq',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.marks || 4,
        q.difficulty || 'medium',
        'available'
      ]
    );
    console.log(`Inserted MCQ ${q.serialNumber} (Local ID: ${res.rows[0].id})`);
  }

  // 2. Import Batch 9 ARs
  console.log(`Inserting ${batch9ARQuestions.length} AR questions...`);
  for (const q of batch9ARQuestions) {
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
    console.log(`Inserted AR Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }

  const counts = await pool.query(
    "SELECT question_type, COUNT(*) FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
    [CHAPTER_ID]
  );
  console.log('=== Current Local DB Equilibrium Breakdown ===', counts.rows);

  const range = await pool.query(
    "SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as total FROM question_bank WHERE chapter_id = $1",
    [CHAPTER_ID]
  );
  console.log('Local ID Range:', range.rows[0]);

  process.exit(0);
}

importRemaining().catch(err => {
  console.error(err);
  process.exit(1);
});

