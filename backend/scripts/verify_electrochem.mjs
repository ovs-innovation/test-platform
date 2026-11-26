import { query, pool } from '../src/config/db.js';

async function verify() {
  console.log('=== VERIFYING ELECTROCHEMISTRY QUESTION BANK DATA IN NEON DB ===\n');

  const res = await query(`
    SELECT COUNT(*) as total, 
           COUNT(*) FILTER (WHERE question_type = 'mcq') as mcq_count,
           COUNT(*) FILTER (WHERE question_type = 'numerical') as num_count,
           COUNT(*) FILTER (WHERE image_url IS NOT NULL) as img_count
    FROM question_bank
    WHERE exam_type = 'JEE' AND category = 'Chemistry' AND (chapter = 'Electrochemistry' OR chapter_id = 126)
  `);
  console.log('Summary:', res.rows[0]);

  const samples = await query(`
    SELECT id, question_type, question_text, options, correct_index, numeric_answer, image_url 
    FROM question_bank 
    WHERE exam_type = 'JEE' AND category = 'Chemistry' AND (chapter = 'Electrochemistry' OR chapter_id = 126)
    ORDER BY id ASC LIMIT 3
  `);
  console.log('\nSample 1 (MCQ):');
  console.log(JSON.stringify(samples.rows[0], null, 2));

  const numSample = await query(`
    SELECT id, question_type, question_text, options, correct_index, numeric_answer, image_url 
    FROM question_bank 
    WHERE exam_type = 'JEE' AND category = 'Chemistry' AND question_type = 'numerical' AND (chapter = 'Electrochemistry' OR chapter_id = 126)
    ORDER BY id ASC LIMIT 1
  `);
  console.log('\nSample 2 (Numerical):');
  console.log(JSON.stringify(numSample.rows[0], null, 2));

  const imgSample = await query(`
    SELECT id, question_type, question_text, options, correct_index, numeric_answer, image_url 
    FROM question_bank 
    WHERE exam_type = 'JEE' AND category = 'Chemistry' AND image_url IS NOT NULL AND (chapter = 'Electrochemistry' OR chapter_id = 126)
    ORDER BY id ASC LIMIT 1
  `);
  console.log('\nSample 3 (Diagram Question):');
  console.log(JSON.stringify(imgSample.rows[0], null, 2));

  await pool.end();
}

verify().catch(console.error);
