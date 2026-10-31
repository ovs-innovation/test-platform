import { pool } from '../src/config/db.js';

async function initChapter() {
  const check = await pool.query(
    "SELECT * FROM chapters WHERE subject_id = 15 AND name ILIKE '%biological%classification%'"
  );
  if (check.rows.length > 0) {
    console.log('Chapter already exists in Local DB:', check.rows[0]);
    return check.rows[0].id;
  }
  const res = await pool.query(
    "INSERT INTO chapters (subject_id, name, position) VALUES (15, 'Biological Classification', 0) RETURNING *"
  );
  console.log('Created Chapter in Local DB:', res.rows[0]);
  return res.rows[0].id;
}

initChapter().catch(console.error).finally(() => pool.end());
