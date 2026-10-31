import { pool } from '../src/config/db.js';

async function check() {
  const res = await pool.query("SELECT count(*) FROM question_bank WHERE chapter_id = 156 OR chapter ILIKE '%biological%'");
  console.log('Count in question_bank:', res.rows[0].count);
  await pool.end();
}

check().catch(console.error);
