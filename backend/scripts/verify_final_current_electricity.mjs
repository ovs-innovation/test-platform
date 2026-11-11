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
  console.log('=== VERIFYING CURRENT ELECTRICITY PYQ ON LOCAL DB & LIVE API ===');

  // 1. Local DB Check
  const client = await pool.connect();
  let localCount = 0;
  let localDiagrams = 0;
  try {
    const res = await client.query(
      "SELECT count(*)::int as count, count(image_url)::int as diagrams FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 69 OR LOWER(chapter) = 'current electricity')"
    );
    localCount = res.rows[0].count;
    localDiagrams = res.rows[0].diagrams;
    console.log(`Local DB: ${localCount} questions found, ${localDiagrams} diagrams.`);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API Check
  let liveCount = 0;
  let liveDiagrams = 0;
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

    const ceQuestions = questions.filter(
      q => Number(q.chapter_id) === 24 || (q.chapter || '').toLowerCase() === 'current electricity'
    );
    liveCount = ceQuestions.length;
    liveDiagrams = ceQuestions.filter(q => !!q.image_url).length;

    console.log(`Live API: ${liveCount} questions found, ${liveDiagrams} diagrams.`);
  } catch (err) {
    console.error('Error querying Live API:', err.message);
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Local DB: ${localCount} / 173 questions, ${localDiagrams} / 56 diagrams`);
  console.log(`Live API: ${liveCount} / 173 questions, ${liveDiagrams} / 56 diagrams`);

  if (localCount === 173 && liveCount === 173 && localDiagrams === 56 && liveDiagrams === 56) {
    console.log('🎉 PERFECT MATCH: 173 QUESTIONS & 56 DIAGRAMS ON BOTH PLATFORMS!');
  } else {
    console.log('⚠️ Count discrepancy detected, please inspect details.');
  }
}

main().catch(console.error);

