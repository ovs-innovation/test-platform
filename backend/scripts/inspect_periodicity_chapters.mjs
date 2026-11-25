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

async function check() {
  const client = await pool.connect();
  try {
    const q155 = await client.query("SELECT exam_type, count(*) FROM question_bank WHERE chapter_id = 155 GROUP BY exam_type");
    console.log('Neon chapter 155 breakdown by exam_type:', q155.rows);
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
  const q94Res = await fetch('https://edvedum.com/api/question-bank?chapter_id=94&category=Chemistry&exam_type=JEE&limit=50', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const q94Data = await q94Res.json();
  console.log('Live VPS Chapter 94 JEE Chemistry questions:', (q94Data.questions || []).length);
}
check().catch(e => console.error(e));
