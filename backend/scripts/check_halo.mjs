import { pool } from '../src/config/db.js';

async function check() {
  const ch = await pool.query("SELECT id, name, subject_id, position FROM chapters WHERE subject_id = 10 ORDER BY position, id");
  console.log('Chemistry Chapters:', ch.rows);
  const subs = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Subjects:', subs.rows);
  const countRes = await pool.query("SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = 153");
  console.log('Chapter 153 Summary:', countRes.rows[0]);
  const imgCheck = await pool.query("SELECT id, topic, image_url FROM question_bank WHERE chapter_id = 153 AND image_url IS NOT NULL LIMIT 5");
  console.log('Sample image_url in DB:');
  console.table(imgCheck.rows);
  await pool.end();
}

check().catch(console.error);
