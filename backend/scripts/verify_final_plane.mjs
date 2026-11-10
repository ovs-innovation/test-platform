import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION_IN_PLANE_QUESTIONS } from './plane_pyq_questions_data.mjs';

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
  let localMatches = 0;
  for (const q of MOTION_IN_PLANE_QUESTIONS) {
    const res = await pool.query(
      "SELECT id, category, chapter, chapter_id, marks, status, image_url FROM question_bank WHERE question_text = $1",
      [q.question.trim()]
    );
    if (res.rows.length > 0) {
      localMatches++;
    } else {
      console.log(`Local DB missing Q${q.qNum}`);
    }
  }
  console.log(`Local DB verified questions found: ${localMatches} / 75`);

  const pyqCount = await pool.query(
    "SELECT count(*) FROM question_bank WHERE chapter_id = 135 AND category = 'PYQ'"
  );
  console.log(`Total PYQ in chapter_id 135: ${pyqCount.rows[0].count}`);

  console.log('\n=== Checking Live edvedum.com API ===');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  const planeQuestions = liveQuestions.filter(q =>
    (q.chapter || '').toLowerCase().includes('plane') ||
    Number(q.chapter_id) === 72
  );
  console.log(`Live API verified questions count: ${planeQuestions.length} / 75`);

  // Check diagrams
  const diagramLive = planeQuestions.filter(q => q.image_url);
  console.log(`Live questions with diagram: ${diagramLive.length} (expected 6)`);
  diagramLive.forEach(q => console.log(`- Q ID: ${q.id}, image_url: ${q.image_url}`));

  await pool.end();
}

verify().catch(console.error);

