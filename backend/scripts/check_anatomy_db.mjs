import { pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  console.log('--- Checking Local DB Chapters for Botany ---');
  const localRes = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 15 AND name ILIKE '%anatomy%'"
  );
  console.log('Local Anatomy Chapters:', localRes.rows);

  console.log('--- Checking Live API Chapters for Botany (Subject 10) ---');
  const token = await getToken();
  const chRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chapters = chData.data?.chapters || chData.chapters || [];
  const anatomyCh = chapters.filter(c => /anatomy/i.test(c.name));
  console.log('Live Anatomy Chapters:', anatomyCh);

  await pool.end();
}

check().catch(console.error);

