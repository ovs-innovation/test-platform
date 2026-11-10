import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_WEP_PYQ_QUESTIONS } from './wep_pyq_questions_data.mjs';

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

async function verify() {
  console.log('=== Checking Local Neon DB ===');
  const pyqCount = await pool.query(
    "SELECT count(*) FROM question_bank WHERE chapter_id = 26 AND category = 'PYQ'"
  );
  console.log(`Local DB count: ${pyqCount.rows[0].count} / 69`);

  const diagramCount = await pool.query(
    "SELECT count(*) FROM question_bank WHERE chapter_id = 26 AND category = 'PYQ' AND image_url IS NOT NULL"
  );
  console.log(`Local DB diagram questions: ${diagramCount.rows[0].count} / 5`);

  console.log('\n=== Checking Live edvedum.com API ===');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  const wepQuestions = liveQuestions.filter(q =>
    (q.chapter || '').toLowerCase().includes('work') ||
    Number(q.chapter_id) === 119
  );
  console.log(`Live API verified questions count: ${wepQuestions.length} / 69`);

  const liveDiagrams = wepQuestions.filter(q => q.image_url);
  console.log(`Live questions with diagram: ${liveDiagrams.length} / 5`);
  liveDiagrams.forEach(q => console.log(`- Q ID: ${q.id}, image_url: ${q.image_url}`));

  await pool.end();
}

verify().catch(console.error);

