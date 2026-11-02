import { pool } from '../src/config/db.js';

async function main() {
  const qb = await pool.query("SELECT count(*)::int as count FROM question_bank WHERE chapter_id = 23");
  const q = await pool.query("SELECT count(*)::int as count FROM questions WHERE chapter_id = 23");
  console.log('QB using chapter 23:', qb.rows[0].count);
  console.log('Questions using chapter 23:', q.rows[0].count);
  await pool.end();
}

main().catch(console.error);
