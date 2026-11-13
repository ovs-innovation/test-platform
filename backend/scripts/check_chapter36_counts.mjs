import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function checkBoth() {
  // 1. Local DB
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, image_url 
      FROM question_bank 
      WHERE chapter_id = 133
    `);
    console.log(`Local DB: total questions for chapter_id 133 = ${res.rows.length}`);
    const pyqs = res.rows.filter(r => r.category === 'PYQ');
    const nonPyqs = res.rows.filter(r => r.category !== 'PYQ');
    console.log(`Local DB: PYQs = ${pyqs.length}, non-PYQs = ${nonPyqs.length}`);
    if (nonPyqs.length > 0) {
      console.log('Non-PYQ in chapter 133:', nonPyqs);
    }
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  // Let's fetch questions from Live API for subject_id 6 (Chemistry)
  const qRes = await fetch(`${LIVE_API}/question-bank?subject_id=6&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qs = qData.questions || qData.data || [];
  const ch36 = qs.filter(q => Number(q.chapter_id) === 36 || Number(q.chapter_id) === 133);
  console.log(`Live API: total questions for chapter 36/133 = ${ch36.length}`);
  const livePyqs = ch36.filter(q => q.category === 'PYQ');
  const liveNonPyqs = ch36.filter(q => q.category !== 'PYQ');
  console.log(`Live API: PYQs = ${livePyqs.length}, non-PYQs = ${liveNonPyqs.length}`);
  if (liveNonPyqs.length > 0) {
    for (const q of liveNonPyqs) {
      console.log('Live Non-PYQ question in chapter 36:', q.id, q.category, q.subject, q.question_text.slice(0, 50));
    }
  }
}

checkBoth().catch(console.error);

