import { pool } from '../src/config/db.js';
import { batch1_bonding_mcq } from './batch1_bonding_mcq.mjs';
import { batch2_bonding_mcq } from './batch2_bonding_mcq.mjs';
import { batch3_bonding_mcq } from './batch3_bonding_mcq.mjs';
import { batch4_bonding_mcq } from './batch4_bonding_mcq.mjs';
import { batch5_bonding_ar } from './batch5_bonding_ar.mjs';

async function importAll() {
  console.log('=== Importing Chemical Bonding and Molecular Structure to Local DB (Neon) ===');

  const subjectId = 10; // Chemistry in Local DB
  const chapterId = 60; // Chemical Bonding & Molecular Structure in Local DB
  const chapterName = 'Chemical Bonding and Molecular Structure';
  const category = 'Chemistry';

  const mcqs = [
    ...batch1_bonding_mcq,
    ...batch2_bonding_mcq,
    ...batch3_bonding_mcq,
    ...batch4_bonding_mcq
  ];
  const ars = [...batch5_bonding_ar];

  console.log(`Starting import: ${mcqs.length} MCQs + ${ars.length} ARs = ${mcqs.length + ars.length} Total Questions...`);

  // Check if any existing questions exist for chapterId 60 or chapter name
  const existRes = await pool.query(
    "SELECT count(*) as count FROM question_bank WHERE chapter_id = $1 OR chapter ILIKE $2",
    [chapterId, '%Chemical Bonding%']
  );
  if (parseInt(existRes.rows[0].count) > 0) {
    console.log(`Found ${existRes.rows[0].count} existing questions for chapter ${chapterId}. Deleting before re-import...`);
    await pool.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR chapter ILIKE $2",
      [chapterId, '%Chemical Bonding%']
    );
  }

  let insertedMcq = 0;
  let insertedAr = 0;

  // Insert MCQs
  for (const q of mcqs) {
    const correctIndex = typeof q.correct_option === 'number' 
      ? q.correct_option 
      : ['A', 'B', 'C', 'D'].indexOf(q.correct_option);

    if (correctIndex === -1 || correctIndex === undefined) {
      throw new Error(`Invalid correct_option "${q.correct_option}" for question: ${q.question_text.slice(0, 30)}`);
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
        'single_choice',
        q.question_text,
        JSON.stringify(q.options || []),
        correctIndex,
        JSON.stringify([]),
        null,
        0,
        null,
        null,
        4,
        q.solution || '',
        subjectId,
        chapterId,
        q.difficulty_level || 'medium',
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
    const correctIndex = typeof q.correct_option === 'number' 
      ? q.correct_option 
      : ['A', 'B', 'C', 'D'].indexOf(q.correct_option);

    if (correctIndex === -1 || correctIndex === undefined) {
      throw new Error(`Invalid correct_option "${q.correct_option}" for AR question: ${q.question_text.slice(0, 30)}`);
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
        'assertion_reason',
        q.question_text,
        JSON.stringify(q.options || []),
        correctIndex,
        JSON.stringify([]),
        null,
        0,
        q.assertion_text,
        q.reason_text,
        4,
        q.solution || '',
        subjectId,
        chapterId,
        q.difficulty_level || 'medium',
        q.image_url || null,
        chapterName,
        q.topic || 'Assertion-Reason',
        category,
        'available'
      ]
    );
    insertedAr++;
    if (insertedAr % 5 === 0 || insertedAr === ars.length) {
      console.log(`[AR Progress] ${insertedAr}/${ars.length} inserted (Latest ID: ${res.rows[0].id})`);
    }
  }

  console.log(`\n🎉 Successfully imported all questions to Local DB!`);
  console.log(`Total MCQs: ${insertedMcq}`);
  console.log(`Total ARs:  ${insertedAr}`);
  console.log(`Total Questions: ${insertedMcq + insertedAr}`);

  // Query final verification
  const countRes = await pool.query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
    [chapterId]
  );
  console.log('\n--- Final Local DB Verification by Type ---');
  console.table(countRes.rows);

  await pool.end();
}

importAll().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
