import { pool } from '../src/config/db.js';

async function main() {
  const subjects = await pool.query("SELECT * FROM subjects WHERE name ILIKE '%botany%' OR name ILIKE '%bio%'");
  console.log('Local DB Subjects:', subjects.rows);

  const chapters = await pool.query("SELECT * FROM chapters WHERE name ILIKE '%biological%' OR name ILIKE '%classification%'");
  console.log('Local DB Chapters:', chapters.rows);

  const qCount = await pool.query("SELECT chapter, COUNT(*) FROM question_bank WHERE chapter ILIKE '%biological%' OR category = 'Botany' GROUP BY chapter");
  console.log('Local DB Botany Chapters:', qCount.rows);
}

main().catch(console.error).finally(() => pool.end());

