import fetch from 'node-fetch';
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

async function main() {
  console.log('--- Checking Neon DB ---');
  const client = await pool.connect();
  try {
    const dbRes = await client.query('SELECT id, question_text, chapter, exam_type, options, image_url, created_at FROM question_bank WHERE id = 60578');
    console.log('Neon DB row for 60578:', dbRes.rows);

    const dbElectroCount = await client.query(`
      SELECT exam_type, count(*), min(id), max(id) 
      FROM question_bank 
      WHERE chapter ILIKE '%Electrostatics%' 
      GROUP BY exam_type
    `);
    console.log('Neon DB Electro counts by exam_type:', dbElectroCount.rows);
  } finally {
    client.release();
  }

  console.log('--- Checking Live API ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch('https://edvedum.com/api/question-bank?refresh=true&limit=10000', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQ = data.questions || [];
  const q60578 = allQ.find(q => q.id === 60578);
  console.log('Live API q60578:', q60578);

  const electroLive = allQ.filter(q => /electro/i.test(q.chapter || ''));
  console.log('Live API electro count:', electroLive.length);
  const byExamLive = {};
  for (const q of electroLive) {
    const key = `${q.exam_type} | ${q.chapter} (chId: ${q.chapter_id})`;
    byExamLive[key] = (byExamLive[key] || 0) + 1;
  }
  console.log('Live API electro grouped:', byExamLive);

  if (electroLive.length > 0) {
    console.log('First 3 live electro questions:');
    electroLive.slice(0, 3).forEach((q, idx) => {
      console.log(`[${idx+1}] ID: ${q.id}, Exam: ${q.exam_type}, Chapter: ${q.chapter}, ChID: ${q.chapter_id}, Text: ${q.question_text.substring(0, 100)}, Options: ${JSON.stringify(q.options)}`);
    });
  }
}

main().catch(console.error);
