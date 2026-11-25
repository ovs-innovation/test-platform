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

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%equilibrium%' OR name ILIKE '%ionic%' ORDER BY id ASC");
    console.log('Neon DB Chapters:');
    console.table(res.rows);

    const subs = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
    console.log('Neon DB Chemistry Subject:');
    console.table(subs.rows);

    const qbRes = await client.query("SELECT exam_type, chapter, chapter_id, count(*) FROM question_bank WHERE subject_id = 10 AND (chapter ILIKE '%equilibrium%' OR chapter ILIKE '%ionic%') GROUP BY exam_type, chapter, chapter_id");
    console.log('Neon QB Equilibrium Breakdown:');
    console.table(qbRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Also check live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chapRes = await fetch(`${LIVE_API}/admin/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chapRes.status === 200) {
    const data = await chapRes.json();
    const liveChapters = (data.chapters || data.data || []).filter(c => /equilibrium|ionic/i.test(c.name));
    console.log('Live Platform Chapters:');
    console.table(liveChapters);
  } else {
    console.log('Live admin/chapters status:', chapRes.status);
  }

  const qbLiveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&refresh=true&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbData = await qbLiveRes.json();
  const eqQs = (qbData.questions || []).filter(q => (q.chapter || '').toLowerCase().includes('eq'));
  console.log('Live Equilibrium questions count:', eqQs.length);
  const byCh = {};
  for (const q of eqQs) {
    const key = `${q.chapter} (ch_id: ${q.chapter_id}, exam: ${q.exam_type})`;
    byCh[key] = (byCh[key] || 0) + 1;
  }
  console.log('Live Equilibrium questions breakdown:', byCh);
}

main().catch(console.error);
