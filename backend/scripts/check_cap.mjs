import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function check() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const chaps = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%potential%' OR name ILIKE '%capacit%'");
  console.log('Chapters:', chaps.rows);
  const qCount = await pool.query("SELECT count(1) FROM question_bank WHERE chapter ILIKE '%potential%' OR chapter ILIKE '%capacit%'");
  console.log('Question Count:', qCount.rows[0].count);
  await pool.end();
}
check();
