import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const client = await pool.connect();
  const res = await client.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE (name ILIKE '%atom%' OR name ILIKE '%atomic%')
  `);
  console.log('Neon chapters for Atom:');
  console.table(res.rows);

  const qbRes = await client.query(`
    SELECT id, chapter_id, chapter, count(*) as cnt
    FROM question_bank
    WHERE (chapter ILIKE '%atom%' OR chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%atom%'))
      AND exam_type = 'JEE'
    GROUP BY id, chapter_id, chapter
    LIMIT 5
  `);
  console.log('Existing Neon questions for Atom (JEE):', qbRes.rows.length);

  await client.release();
  await pool.end();

  // Check Live VPS
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapsData = await chapsRes.json();
  const liveChaps = (chapsData.chapters || []).filter(c => /atom/i.test(c.name));
  console.log('Live Subject 6 (Chemistry) chapters for Atom:');
  console.table(liveChaps);

  const qbLiveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbLiveData = await qbLiveRes.json();
  const questions = qbLiveData.questions || [];
  const atomQs = questions.filter(q => /atom/i.test(q.chapter || '') || /atom/i.test(q.chapter_name || ''));
  console.log('Existing Live questions for Atom (JEE):', atomQs.length);
}

main().catch(console.error);
