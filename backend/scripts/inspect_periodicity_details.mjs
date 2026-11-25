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

async function checkDetails() {
  const client = await pool.connect();
  try {
    const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND (name ILIKE '%period%' OR name ILIKE '%element%')");
    console.log('Neon Chemistry Chapters:', chs.rows);

    const qb = await client.query("SELECT exam_type, chapter, chapter_id, count(*) FROM question_bank WHERE subject_id = 10 AND (chapter ILIKE '%period%' OR chapter ILIKE '%element%') GROUP BY exam_type, chapter, chapter_id");
    console.log('Neon QB Periodicity breakdown:', qb.rows);
  } finally {
    client.release();
    await pool.end();
  }

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const q94Res = await fetch('https://edvedum.com/api/question-bank?chapter_id=94&category=Chemistry&limit=2500', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const q94Data = await q94Res.json();
  const questions = q94Data.questions || [];
  console.log('Live Chapter 94 total questions:', questions.length);

  const byExam = {};
  for (const q of questions) {
    const et = q.exam_type || 'NONE';
    byExam[et] = (byExam[et] || 0) + 1;
  }
  console.log('Live Chapter 94 breakdown by exam_type:', byExam);
}
checkDetails().catch(console.error);
