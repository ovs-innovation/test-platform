import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  console.log('=== CHECKING NEON DB ===');
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT category, chapter_id, chapter, count(*) as count
      FROM question_bank 
      WHERE exam_type = 'JEE' 
      GROUP BY category, chapter_id, chapter 
      ORDER BY category, chapter
    `);
    console.log('Neon DB JEE questions by chapter:');
    console.table(res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('=== CHECKING LIVE VPS ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qb = await res.json();
  const questions = qb.questions || [];
  console.log(`Live total questions for category=Chemistry & exam_type=JEE: ${questions.length}`);

  const chapterCounts = {};
  for (const q of questions) {
    const ch = q.chapter || q.chapter_name || `ID_${q.chapter_id}`;
    chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
  }
  console.log('Live Chemistry JEE questions by chapter:');
  console.table(chapterCounts);
}

check().catch(console.error);
