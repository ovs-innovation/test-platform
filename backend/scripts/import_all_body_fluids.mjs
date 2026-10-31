import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_fluids_mcq.mjs';
import { batch2Questions } from './batch2_fluids_mcq.mjs';
import { batch3Questions } from './batch3_fluids_mcq.mjs';
import { batch4Questions } from './batch4_fluids_mcq.mjs';
import { batch5ARQuestions } from './batch5_fluids_ar.mjs';

async function importAll() {
  console.log('=== Importing Body Fluids and Circulation to Local DB (Neon) ===');

  const subjectId = 13; // Zoology
  const chapterId = 160; // Body Fluids and Circulation
  const chapterName = 'Body Fluids and Circulation';
  const category = 'Zoology';

  const mcqs = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions
  ];
  const ars = [...batch5ARQuestions];

  console.log(`Starting import: ${mcqs.length} MCQs + ${ars.length} ARs = ${mcqs.length + ars.length} Total Questions...`);

  let insertedMcq = 0;
  let insertedAr = 0;

  // Insert MCQs
  for (const q of mcqs) {
    const correctIndex = q.options.indexOf(q.correct_answer);
    if (correctIndex === -1) {
      throw new Error(`Correct answer not found in options for Q${q.question_number}`);
    }

    const res = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
         subject_id, chapter_id, difficulty, image_url, chapter, topic, subject, status
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
       RETURNING id`,
      [
        category,
        'mcq',
        q.question_text,
        JSON.stringify(q.options || []),
        correctIndex,
        JSON.stringify([]),
        null,
        0,
        null,
        null,
        4,
        q.explanation || '',
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.image_url || null,
        chapterName,
        q.topic || chapterName,
        category,
        'available'
      ]
    );
    insertedMcq++;
    if (insertedMcq % 30 === 0 || insertedMcq === mcqs.length) {
      console.log(`[MCQ Progress] ${insertedMcq}/${mcqs.length} inserted (Latest ID: ${res.rows[0].id})`);
    }
  }

  // Insert ARs
  for (const q of ars) {
    const res = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
         subject_id, chapter_id, difficulty, image_url, chapter, topic, subject, status
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
       RETURNING id`,
      [
        category,
        'assertion_reason',
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        JSON.stringify([]),
        null,
        0,
        q.assertion_text,
        q.reason_text,
        4,
        q.explanation || '',
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        null,
        chapterName,
        q.topic || `Assertion-Reason - ${chapterName}`,
        category,
        'available'
      ]
    );
    insertedAr++;
    if (insertedAr % 10 === 0 || insertedAr === ars.length) {
      console.log(`[AR Progress] ${insertedAr}/${ars.length} inserted (Latest ID: ${res.rows[0].id})`);
    }
  }

  console.log(`\nSUCCESS! Inserted ${insertedMcq} MCQs and ${insertedAr} AR questions into Local DB!`);

  // Verify total count in Local DB
  const countRes = await pool.query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
    [chapterId]
  );
  console.log('Chapter count breakdown in Local DB:', countRes.rows);

  const rangeRes = await pool.query(
    "SELECT min(id) as min_id, max(id) as max_id, count(*) as total FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log('ID Range in Local DB:', rangeRes.rows[0]);

  await pool.end();
}

importAll().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
