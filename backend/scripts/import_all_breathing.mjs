import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_breathing_mcq.mjs';
import { batch2Questions } from './batch2_breathing_mcq.mjs';
import { batch3Questions } from './batch3_breathing_mcq.mjs';
import { batch4Questions } from './batch4_breathing_mcq.mjs';
import { batch5Questions } from './batch5_breathing_mcq.mjs';
import { batch6Questions } from './batch6_breathing_ar.mjs';

async function importAll() {
  console.log('=== Importing Breathing and Exchange of Gases to Local DB (Neon) ===');

  const subjectId = 13; // Zoology
  const chapterId = 159; // Breathing and Exchange of Gases
  const chapterName = 'Breathing and Exchange of Gases';
  const category = 'Zoology';

  const mcqs = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions,
    ...batch5Questions
  ];
  const ars = [...batch6Questions];

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
        q.topic || 'Assertion-Reason - Breathing and Exchange of Gases',
        category,
        'available'
      ]
    );
    insertedAr++;
  }

  console.log(`[AR Completed] ${insertedAr} Assertion-Reason questions inserted.`);

  const summary = await pool.query(`
    SELECT question_type, COUNT(*) as count, MIN(id) as min_id, MAX(id) as max_id
    FROM question_bank
    WHERE chapter_id = $1
    GROUP BY question_type
  `, [chapterId]);

  console.log('\nFinal Local DB Chapter 159 counts:', summary.rows);
  await pool.end();
}

importAll().catch(async (err) => {
  console.error('Import failed:', err);
  await pool.end();
  process.exit(1);
});
