import { pool } from '../src/config/db.js';

async function check() {
  const r = await pool.query("SELECT id, question_text, chapter_id, chapter FROM question_bank WHERE subject_id = 10 AND (question_text ILIKE '%Arrhenius%' OR question_text ILIKE '%activation energy%' OR question_text ILIKE '%first order%') LIMIT 10");
  console.log('Matching chemistry questions in local DB:', r.rows.length);
  r.rows.forEach(row => console.log(row.id, row.chapter_id, row.chapter, row.question_text.slice(0, 60)));
  await pool.end();
}

check().catch(console.error);
