import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function inspect() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  try {
    const qRes = await client.query('SELECT count(*), chapter_id FROM question_bank WHERE chapter_id = 114 GROUP BY chapter_id');
    console.log('Neon DB questions for chapter_id 114:', qRes.rows);
    const qRes2 = await client.query("SELECT count(*), chapter FROM question_bank WHERE chapter ILIKE '%semiconductor%' GROUP BY chapter");
    console.log('Neon DB questions with chapter like semiconductor:', qRes2.rows);
  } finally {
    client.release();
    await pool.end();
  }

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const qResLive = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await qResLive.json();
  const semiLive = (data.questions || []).filter(q =>
    (q.chapter && q.chapter.toLowerCase().includes('semiconductor')) ||
    (q.chapter_id === 77)
  );
  console.log('Live edvedum semiconductor questions count:', semiLive.length);
}

inspect().catch(console.error);
