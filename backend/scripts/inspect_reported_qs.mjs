import { pool } from '../src/config/db.js';

async function checkSpecific() {
  const res = await pool.query(`
    SELECT id, question_text, question_type, options, correct_index
    FROM question_bank
    WHERE exam_type = 'JEE' AND chapter_id = 21
    ORDER BY id ASC
    LIMIT 20
  `);
  
  const targetIndices = [0, 1, 2, 8, 9, 12, 14, 15]; // Q1, Q2, Q3, Q9, Q10, Q13, Q15, Q16
  targetIndices.forEach(idx => {
    const q = res.rows[idx];
    console.log(`\n=== Q${idx + 1} (DB ID ${q.id}) ===`);
    console.log('Text:', q.question_text);
    console.log('Options:', q.options);
    console.log('Correct Index:', q.correct_index);
  });
  await pool.end();
}

checkSpecific().catch(console.error);
