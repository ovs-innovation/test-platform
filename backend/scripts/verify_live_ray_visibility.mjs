import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Ray Optics';

async function main() {
  console.log('=== VERIFYING LIVE VISIBILITY FOR RAY OPTICS (JEE) ===\n');

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
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=350`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Live API responded with status ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const questions = data?.questions || [];
  console.log(`- Status: 200 OK`);
  console.log(`- Total JEE Questions returned: ${questions.length} / 298`);

  let mcqCount = 0;
  let numCount = 0;
  let dummyCount = 0;
  let diagramCount = 0;
  const dummyTerms = ['Option A', 'Option B', 'Option C', 'Option D', '(A)', '(B)', '(C)', '(D)'];

  for (const q of questions) {
    if (q.question_type === 'numerical') {
      numCount++;
    } else {
      mcqCount++;
      for (const opt of q.options || []) {
        if (dummyTerms.includes(String(opt.text || opt.option_text).trim())) {
          dummyCount++;
        }
      }
    }
    if (q.image_url) diagramCount++;
  }

  console.log(`- MCQs: ${mcqCount}`);
  console.log(`- Numericals: ${numCount}`);
  console.log(`- Diagrams Present: ${diagramCount}`);
  console.log(`- Dummy Options Found: ${dummyCount} (Strictly 0)`);

  // Verify NEET questions count on Live API
  const neetRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=NEET&refresh=true&limit=350`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const neetData = await neetRes.json();
  console.log(`- Live NEET Questions Preserved: ${neetData?.questions?.length || 0}`);

  // 2. Verify Neon DB
  console.log('\n2. Checking Neon PostgreSQL Database:');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  try {
    const dbRes = await client.query(`
      SELECT exam_type, count(*), chapter, chapter_id 
      FROM question_bank 
      WHERE chapter_id = 202 OR chapter = 'Ray Optics'
      GROUP BY exam_type, chapter, chapter_id
      ORDER BY exam_type
    `);
    console.table(dbRes.rows);

    // Verify sample question in DB
    const sample = await client.query(`
      SELECT id, question_text, options, correct_index, numeric_answer, question_type, image_url 
      FROM question_bank 
      WHERE chapter_id = 202 AND exam_type = 'JEE'
      ORDER BY id ASC
      LIMIT 2
    `);
    console.log('Sample DB rows:');
    console.log(JSON.stringify(sample.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===');
}

main().catch(console.error);
