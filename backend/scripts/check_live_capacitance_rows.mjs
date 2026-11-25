import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Check Neon DB directly
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  try {
    const qb = await client.query("SELECT id, chapter, chapter_id, exam_type, question_type, COUNT(*) FROM question_bank WHERE chapter ILIKE '%capacit%' GROUP BY id, chapter, chapter_id, exam_type, question_type LIMIT 10");
    console.log('Sample rows in Neon DB:', qb.rows);

    const counts = await client.query("SELECT chapter, exam_type, count(*) FROM question_bank WHERE chapter ILIKE '%capacit%' OR chapter ILIKE '%electrostatic%' GROUP BY chapter, exam_type");
    console.log('Chapter counts in Neon DB:', counts.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Delete test questions 59368, 59369, 59370
  for (const id of [59368, 59369, 59370]) {
    await fetch(`${LIVE_API}/question-bank/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

main().catch(console.error);
