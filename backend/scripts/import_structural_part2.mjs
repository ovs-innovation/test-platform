import { pool } from '../src/config/db.js';
import { batch5Questions } from './batch5_zoo_mcq.mjs';
import { batch6Questions } from './batch6_zoo_mcq.mjs';
import { batch7Questions } from './batch7_zoo_ar.mjs';

async function importPart2() {
  console.log('Importing Structural Organisation Part 2 (Batches 5, 6, 7)...');

  const subjectId = 13; // Zoology in local DB
  const chapterId = 158; // Structural Organisation in Animals in local DB
  const chapterName = 'Structural Organisation in Animals';
  const category = 'Zoology';

  const mcqQuestions = [...batch5Questions, ...batch6Questions];
  const arQuestions = [...batch7Questions];

  let insertedMcq = 0;
  let insertedAr = 0;

  // Insert MCQs
  for (const q of mcqQuestions) {
    const correctIndex = q.options.indexOf(q.correct_answer);
    if (correctIndex === -1) {
      throw new Error(`Correct answer not found in options for MCQ Q${q.question_number}`);
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
  }

  console.log(`Inserted ${insertedMcq} MCQs.`);

  // Insert ARs
  for (const q of arQuestions) {
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
        q.topic || 'Assertion-Reason - Structural Organisation in Animals',
        category,
        'available'
      ]
    );
    insertedAr++;
  }

  console.log(`Inserted ${insertedAr} AR questions.`);

  const summary = await pool.query(`
    SELECT question_type, COUNT(*) as count, MIN(id) as min_id, MAX(id) as max_id
    FROM question_bank
    WHERE chapter_id = $1
    GROUP BY question_type
  `, [chapterId]);

  console.log('\nFinal Local DB Chapter 158 counts:', summary.rows);
  await pool.end();
}

importPart2().catch(async (err) => {
  console.error('Import failed:', err);
  await pool.end();
  process.exit(1);
});
