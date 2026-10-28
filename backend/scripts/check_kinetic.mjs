import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const chaps = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%kinetic%'");
  console.log('Chapters:', chaps.rows);
  const qCount = await pool.query("SELECT count(1) FROM question_bank WHERE chapter ILIKE '%kinetic%'");
  console.log('Question Count:', qCount.rows[0].count);
  
  const subjects = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE 'Physics'");
  console.log('Physics Subject:', subjects.rows);
  await pool.end();
}
main();
