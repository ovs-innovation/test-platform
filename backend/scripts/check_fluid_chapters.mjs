import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%fluid%' OR name ILIKE '%matter%'");
  console.log('Chapters in Neon:', res.rows);
  const qRes = await pool.query("SELECT COUNT(id) FROM question_bank WHERE chapter ILIKE '%fluid%'");
  console.log('Existing fluid questions in Neon:', qRes.rows[0].count);
  await pool.end();
}

check().catch(console.error);
