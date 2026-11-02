import { pool } from '../src/config/db.js';

async function check() {
  const ch = await pool.query("SELECT * FROM chapters WHERE subject_id = 15 AND name ILIKE '%biological%'");
  console.log('Chapters:', ch.rows);
  const q = await pool.query("SELECT count(*) FROM questions WHERE chapter_id = 156 OR chapter ILIKE '%biological%'");
  console.log('Existing questions in Local DB:', q.rows[0].count);
  await pool.end();
}

check().catch(console.error);

