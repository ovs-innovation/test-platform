import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  console.log('--- Checking Local DB ---');
  const subjects = await query('SELECT id, name FROM subjects ORDER BY id');
  console.log('Local Subjects:', subjects.rows);
  const chapters = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 13 OR name ILIKE '%chemical%' ORDER BY id");
  console.log('Local Chapters (Zoology / Chemical):', chapters.rows);

  console.log('\n--- Checking Live API ---');
  const token = await getLiveToken();
  const subRes = await fetch(`${LIVE_API}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  console.log('Live Subjects:', subData);

  const chapRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const allChaps = chapData.chapters || chapData.data || [];
  const zooChaps = allChaps.filter(c => c.subject_id === 2 || (c.name && c.name.toLowerCase().includes('chemical')));
  console.log('Live Zoology / Chemical Chapters:', zooChaps);
}

check().catch(console.error);

