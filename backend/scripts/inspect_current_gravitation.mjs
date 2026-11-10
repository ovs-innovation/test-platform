import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  const client = await pool.connect();
  const localRes = await client.query(
    "SELECT id, category, question_text FROM question_bank WHERE chapter_id = 24 OR LOWER(chapter) = 'gravitation'"
  );
  console.log(`Local DB questions count in Gravitation: ${localRes.rows.length}`);
  client.release();
  await pool.end();

  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = (liveData.questions || []).filter(q =>
    Number(q.chapter_id) === 190 || (q.chapter || '').toLowerCase() === 'gravitation'
  );
  console.log(`Live API questions count in Gravitation (chapter_id 190): ${liveQuestions.length}`);
}

main().catch(console.error);

