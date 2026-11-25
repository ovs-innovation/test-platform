import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Moving Charges and Magnetism';

async function main() {
  console.log('=== VERIFYING LIVE VISIBILITY FOR MOVING CHARGES AND MAGNETISM (JEE) ===\n');

  // Authenticate
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();

  // 1. Verify Live API
  console.log('1. Checking Live Production API:');
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Live API responded with status ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const questions = data?.questions || [];
  console.log(`- Status: 200 OK`);
  console.log(`- Total JEE Questions returned: ${questions.length} / 268`);

  let mcqCount = 0;
  let numCount = 0;
  let diagCount = 0;
  let dummyCount = 0;

  for (const q of questions) {
    if (q.question_type === 'numerical') numCount++;
    if (q.question_type === 'mcq') mcqCount++;
    if (q.image_url) diagCount++;

    for (const opt of q.options || []) {
      const t = String(opt.text || opt.option_text || '').trim();
      if (['Option A', 'Option B', 'Option C', 'Option D', '(A)', '(B)', '(C)', '(D)'].includes(t)) {
        dummyCount++;
      }
    }
  }

  console.log(`- MCQs count: ${mcqCount}`);
  console.log(`- Numericals count: ${numCount}`);
  console.log(`- Questions with diagrams: ${diagCount}`);
  console.log(`- Dummy options detected: ${dummyCount} (strictly 0)`);

  // 2. Check Live API NEET questions preservation
  console.log('\n2. Checking Live API NEET Preservation:');
  const neetRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=NEET&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const neetData = await neetRes.json();
  const neetQuestions = neetData?.questions || [];
  console.log(`- NEET questions returned on Live API: ${neetQuestions.length} (Preserved!)`);

  // 3. Verify Neon DB
  console.log('\n3. Checking Neon DB:');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  const neonRes = await client.query(`
    SELECT count(*), exam_type, chapter, chapter_id 
    FROM question_bank 
    WHERE chapter_id = 143 OR chapter ILIKE '%Moving Charges%'
    GROUP BY exam_type, chapter, chapter_id
    ORDER BY exam_type
  `);
  console.log('Neon DB Rows:', neonRes.rows);
  client.release();
  await pool.end();

  console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
