import { pool } from '../src/config/db.js';

async function check() {
  const r1 = await pool.query("SELECT count(*)::int as c FROM question_bank WHERE chapter_id = 21");
  const r2 = await pool.query("SELECT count(*)::int as c FROM question_bank WHERE chapter ILIKE '%kinetic%'");
  const ch = await pool.query("SELECT id, name, subject_id FROM chapters WHERE id = 21 OR name ILIKE '%kinetic%'");
  console.log('Chapter rows:', ch.rows);
  console.log('chapter_id 21 count:', r1.rows[0].c);
  console.log('chapter kinetics count:', r2.rows[0].c);
  await pool.end();
}

check().catch(console.error);
