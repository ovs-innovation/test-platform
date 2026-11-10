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

async function check() {
  const client = await pool.connect();
  try {
    const subs = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%phys%'");
    console.log('Local Physics subjects:', subs.rows);
    const chaps = await client.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%electrostat%'");
    console.log('Local Electrostatics chapters:', chaps.rows);
    const qCount = await client.query("SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND LOWER(chapter) LIKE '%electrostat%'");
    console.log('Local Electrostatics PYQ count:', qCount.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }

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
  const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const liveChaps = chList.filter(c => (c.name || '').toLowerCase().includes('electrostat'));
  console.log('Live Electrostatics chapters:', liveChaps);

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const allQ = qData.questions || qData.data || [];
  const rotLive = allQ.filter(q => (q.chapter || '').toLowerCase().includes('electrostat'));
  console.log('Live Electrostatics PYQ count:', rotLive.length);
}

check().catch(console.error);

