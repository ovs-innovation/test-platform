import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function check() {
  const localRes = await pool.query(
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (LOWER(chapter) LIKE '%plane%' OR chapter_id = 135)"
  );
  console.log('Local DB PYQ Motion in a Plane count:', localRes.rows[0].count);

  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const qList = (liveData.questions || []).filter(q =>
    (q.chapter || '').toLowerCase().includes('plane') ||
    Number(q.chapter_id) === 72
  );
  console.log('Live API PYQ Motion in a Plane count:', qList.length);

  await pool.end();
}

check().catch(console.error);

