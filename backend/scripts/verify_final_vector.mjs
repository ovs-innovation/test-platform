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

async function verifyAll() {
  console.log('=== VERIFYING VECTOR IN LOCAL NEON DB ===');
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT id, question_text, options, correct_index, category, subject, chapter FROM question_bank WHERE chapter = 'Vector' AND category = 'PYQ' ORDER BY id ASC"
    );
    console.log(`Local questions count: ${res.rows.length}`);
    res.rows.forEach((r, i) => {
      console.log(`Q${i+1} [ID: ${r.id}]:`);
      console.log(` Text: ${r.question_text}`);
      console.log(` Correct Index: ${r.correct_index}`);
    });
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== VERIFYING VECTOR ON LIVE API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await liveRes.json();
  const list = qData.questions || qData.data || [];
  const vectorQuestions = list.filter(q => Number(q.chapter_id) === 267 || (q.chapter || '').toLowerCase() === 'vector');
  console.log(`Live questions count: ${vectorQuestions.length}`);
  vectorQuestions.forEach((r, i) => {
    console.log(`Q${i+1} [Live ID: ${r.id}]:`);
    console.log(` Text: ${r.question_text}`);
    console.log(` Correct Index: ${r.correct_index}`);
  });
}

verifyAll().catch(console.error);

