import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_bio_mcq.mjs';
import { batch2Questions } from './batch2_bio_mcq.mjs';
import { batch3Questions } from './batch3_bio_mcq.mjs';
import { batch4Questions } from './batch4_bio_mcq.mjs';
import { batch5Questions } from './batch5_bio_mcq.mjs';
import { batch6Questions } from './batch6_bio_mcq.mjs';
import { batch7Questions } from './batch7_bio_mcq.mjs';
import { batch8Questions } from './batch8_bio_ar.mjs';

const allQuestions = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions,
  ...batch5Questions,
  ...batch6Questions,
  ...batch7Questions,
  ...batch8Questions,
];

async function importAll() {
  console.log(`Starting import of ${allQuestions.length} questions into Local DB (Neon)...`);
  
  const subjectId = 15; // Botany in local DB
  const chapterId = 156; // Biological Classification in local DB
  const chapterName = 'Biological Classification';
  const category = 'Botany';

  let insertedCount = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const qType = q.question_type === 'assertion_reason' ? 'assertion_reason' : 'mcq';

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
        q.correct_index,
        JSON.stringify([]),
        null,
        0,
        q.assertion_text || null,
        q.reason_text || null,
        q.marks || 4,
        q.solution || '',
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
    if (insertedCount % 50 === 0 || insertedCount === allQuestions.length) {
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
