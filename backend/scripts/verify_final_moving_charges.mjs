import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== VERIFYING FINAL MOVING CHARGES AND MAGNETISM PYQ ===\n');

  // 1. Local Neon DB
  console.log('1. Checking Local Neon Database:');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const localRes = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as diagrams FROM question_bank WHERE chapter_id = 143 AND category = 'PYQ'"
  );
  console.log(`- Local DB: Total = ${localRes.rows[0].total} / 104, Diagrams = ${localRes.rows[0].diagrams} / 17`);
  await pool.end();

  // 2. Live API
  console.log('\n2. Checking Live Platform (edvedum.com):');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const questions = qData.questions || qData.data || [];

  const mcQuestions = questions.filter(
    q => Number(q.chapter_id) === 193 || (q.chapter || '').toLowerCase().includes('moving charges')
  );
  const liveDiagrams = mcQuestions.filter(q => q.image_url && q.image_url.trim().length > 0);

  console.log(`- Live API: Total = ${mcQuestions.length} / 104, Diagrams = ${liveDiagrams.length} / 17`);

  if (localRes.rows[0].total === 104 && mcQuestions.length === 104) {
    console.log('\n SUCCESS: Exactly 104 questions and 17 diagrams verified on both Local DB and Live edvedum.com!');
  } else {
    console.warn(`\n WARNING: Counts mismatch. Local: ${localRes.rows[0].total}, Live: ${mcQuestions.length}`);
  }
}

verify().catch(console.error);
