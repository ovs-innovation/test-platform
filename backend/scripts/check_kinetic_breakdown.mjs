import { pool } from '../src/config/db.js';

async function check() {
  const r = await pool.query("SELECT DISTINCT chapter_id, chapter, subject, subject_id, count(*)::int FROM question_bank WHERE chapter ILIKE '%kinetic%' GROUP BY chapter_id, chapter, subject, subject_id");
  console.log('Kinetic questions breakdown:', r.rows);
  await pool.end();
}

check().catch(console.error);
