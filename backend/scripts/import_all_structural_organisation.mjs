import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_zoo_mcq.mjs';
import { batch2Questions } from './batch2_zoo_mcq.mjs';
import { batch3Questions } from './batch3_zoo_mcq.mjs';
import { batch4Questions } from './batch4_zoo_mcq.mjs';

const allQuestions = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions
];

async function importAll() {
  console.log(`Starting import of ${allQuestions.length} questions into Local DB (Neon)...`);
  
  const subjectId = 13; // Zoology in local DB
  const chapterId = 158; // Structural Organisation in Animals in local DB
  const chapterName = 'Structural Organisation in Animals';
  const category = 'Zoology';

  let insertedCount = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const qType = 'mcq';
    const correctIndex = q.options.indexOf(q.correct_answer);
    if (correctIndex === -1) {
      throw new Error(`Correct answer not found in options for Q${q.question_number}`);
    }

    const res = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
         subject_id, chapter_id, difficulty, image_url, chapter, topic, subject
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
       RETURNING id`,
      [
        category,
        qType,
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
      ]
    );

    insertedCount++;
    if (insertedCount % 30 === 0 || insertedCount === allQuestions.length) {
      console.log(`Progress: ${insertedCount}/${allQuestions.length} inserted. (Latest ID: ${res.rows[0].id})`);
    }
  }

  console.log(`Successfully imported all ${insertedCount} questions into local DB!`);
  await pool.end();
}

importAll().catch(async (err) => {
  console.error('Import failed:', err);
  await pool.end();
  process.exit(1);
});
