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
  console.log('=== VERIFYING ELECTROMAGNETIC WAVES PYQ ON LOCAL DB & LIVE API ===');

  // 1. Local DB Check
  const client = await pool.connect();
  let localCount = 0;
  try {
    const res = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (LOWER(chapter) = 'electromagnetic waves' OR chapter_id = 200)"
    );
    localCount = res.rows[0].count;
    console.log(`Local DB: ${localCount} questions found.`);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API Check
  let liveCount = 0;
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=2000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || qData.data || [];

    const emwQuestions = questions.filter(
      q => Number(q.chapter_id) === 19 || (q.chapter || '').toLowerCase() === 'electromagnetic waves'
    );
    liveCount = emwQuestions.length;

    console.log(`Live API: ${liveCount} questions found.`);
  } catch (err) {
    console.error('Error querying Live API:', err.message);
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Local DB: ${localCount} / 56 questions`);
  console.log(`Live API: ${liveCount} / 56 questions`);

  if (localCount === 56 && liveCount === 56) {
    console.log('🎉 PERFECT MATCH: 56 QUESTIONS ON BOTH PLATFORMS!');
  } else {
    console.log('⚠️ Count discrepancy detected, please inspect details.');
  }
}

main().catch(console.error);

