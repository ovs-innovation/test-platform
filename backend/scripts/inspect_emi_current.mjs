import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%electromagnetic induction%' OR name ILIKE '%induction%'");
    console.log('Local chapters matching Electromagnetic Induction:', res.rows);

    const qBank = await client.query("SELECT chapter, chapter_id, count(*) FROM question_bank WHERE chapter ILIKE '%induction%' GROUP BY chapter, chapter_id");
    console.log('Local questions matching Induction:', qBank.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chs = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const emiChs = chs.filter(c => (c.name || '').toLowerCase().includes('induction'));
  console.log('Live chapters matching Induction in Physics (subject 5):', emiChs);

  // Check if questions exist under PYQ
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qJson = await qRes.json();
  const list = qJson.questions || qJson.data || [];
  const existing = list.filter(q => (q.chapter || '').toLowerCase().includes('induction'));
  console.log('Live existing questions for Induction:', existing.length, [...new Set(existing.map(q => `${q.chapter} (id: ${q.chapter_id})`))]);
}

main().catch(console.error);
