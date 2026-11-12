import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neon = await pool.query(`
    SELECT category, chapter, chapter_id, count(*)
    FROM question_bank
    WHERE chapter ILIKE '%Biodiversity%' OR chapter_id = 192
    GROUP BY category, chapter, chapter_id
  `);
  console.log('Neon questions for Biodiversity:', neon.rows);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const qData = await qRes.json();
  const list = qData.questions || [];
  const bioQs = list.filter(q => (q.chapter && q.chapter.toLowerCase().includes('biodiversity')) || q.chapter_id === 219);
  console.log('Live PYQ questions for Biodiversity:', bioQs.length, bioQs[0]?.chapter, bioQs[0]?.chapter_id);
  await pool.end();
}

check().catch(console.error);
