import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const res = await pool.query('SELECT MIN(id) as min_id, MAX(id) as max_id, count(*)::int as count FROM question_bank WHERE category = $1', ['Physics']);
  console.log('Neon DB Physics count:', res.rows[0]);
  const chRes = await pool.query('SELECT chapter_id, count(*)::int FROM question_bank WHERE category = $1 GROUP BY chapter_id ORDER BY chapter_id', ['Physics']);
  console.log('Neon DB Chapters:', chRes.rows);
  await pool.end();
}

run().catch(console.error);
