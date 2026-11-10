import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const res = await pool.query(
    "SELECT category, count(*)::int as count FROM question_bank WHERE chapter_id = 24 OR LOWER(chapter) = 'gravitation' GROUP BY category"
  );
  console.log('Categories:', res.rows);
  await pool.end();
}

main().catch(console.error);

