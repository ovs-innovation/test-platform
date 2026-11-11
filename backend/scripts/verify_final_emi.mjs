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

async function verify() {
  console.log('=== VERIFYING FINAL ELECTROMAGNETIC INDUCTION STATUS ===');

  // 1. Check Local DB
  const client = await pool.connect();
  let localQuestions = [];
  try {
    const res = await client.query(`
      SELECT id, question_text, image_url
      FROM question_bank
      WHERE category = 'PYQ' AND (chapter_id = 144 OR LOWER(chapter) = 'electromagnetic induction')
      ORDER BY id ASC
    `);
    localQuestions = res.rows;
  } finally {
    client.release();
    await pool.end();
  }

  console.log(`Local Neon DB questions found: ${localQuestions.length}`);
  const localWithImages = localQuestions.filter(q => q.image_url);
  console.log(`Local questions with diagram image_url: ${localWithImages.length}`);
  if (localQuestions.length > 0) {
    console.log('\nSample Local Question 1:');
    console.log({
      id: localQuestions[0].id,
      text: localQuestions[0].question_text.slice(0, 100),
      hasImage: !!localQuestions[0].image_url,
      imageUrl: localQuestions[0].image_url
    });
  }

  // 2. Check Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const list = qData.questions || qData.data || [];
  const liveEmi = list.filter(q => Number(q.chapter_id) === 195 || (q.chapter || '').toLowerCase() === 'electromagnetic induction');

  console.log(`\nLive Platform EMI questions found: ${liveEmi.length}`);
  const liveWithImages = liveEmi.filter(q => q.image_url);
  console.log(`Live questions with diagram image_url: ${liveWithImages.length}`);

  if (localQuestions.length === 57 && liveEmi.length === 57 && localWithImages.length === 13 && liveWithImages.length === 13) {
    console.log('\n>>> PERFECT MATCH! Exactly 57 questions and 13 diagrams verified on both Local DB and Live edvedum.com! <<<');
  } else {
    console.error('\n>>> MISMATCH DETECTED! <<<');
    process.exit(1);
  }
}

verify().catch(console.error);
