import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('--- Checking existing questions in Local DB ---');
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT chapter_id, chapter, category, count(1)::int FROM question_bank WHERE subject_id = 10 AND (chapter ILIKE '%organic%' OR chapter_id IN (167, 249, 116, 74, 50)) GROUP BY chapter_id, chapter, category"
    );
    console.log('Local DB counts:', res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- Checking existing questions on Live API ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const authData = await loginRes.json();
  const token = authData.token || authData.accessToken || authData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const list = qData.questions || qData.data || [];
  const organic = list.filter(q => /organic/i.test(q.chapter || '') || /organic/i.test(q.chapter_name || '') || [167, 249, 116, 74, 50, 165, 100, 17].includes(Number(q.chapter_id)));
  console.log(`Live PYQ questions matching organic: ${organic.length}`);
  organic.forEach(q => console.log({ id: q.id, chId: q.chapter_id, ch: q.chapter, text: q.question_text?.slice(0, 50) }));
}

main();

