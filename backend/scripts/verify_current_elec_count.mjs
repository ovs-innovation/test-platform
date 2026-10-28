import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function verify() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const res = await pool.query("SELECT count(*) as count FROM question_bank WHERE chapter ILIKE 'Current Electricity'");
  console.log(`Neon DB Total Current Electricity questions: ${res.rows[0].count}`);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Physics', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  const currentElec = liveQuestions.filter(q => (q.chapter && q.chapter.toLowerCase() === 'current electricity') || q.chapter_id === 24);
  console.log(`Live edvedum.com Total Current Electricity questions: ${currentElec.length}`);

  await pool.end();
}

verify().catch(console.error);
