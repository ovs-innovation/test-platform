import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function check() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const res = await pool.query("SELECT category, COUNT(id) FROM question_bank WHERE chapter_id = 144 GROUP BY category");
  console.log('Categories in EMI (144):', res.rows);

  const physicsCats = await pool.query("SELECT DISTINCT category FROM question_bank WHERE subject_id = 11");
  console.log('Categories under Physics subject (11):', physicsCats.rows);

  await pool.end();
}

check().catch(console.error);
