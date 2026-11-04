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

async function run() {
  console.log('--- LOCAL DATABASE ---');
  const localChapters = await query("SELECT id, name FROM chapters WHERE subject_id = 21 ORDER BY id");
  console.log('Local Math Chapters count:', localChapters.rows.length);
  console.log('Local Math Chapters:', localChapters.rows);

  console.log('\n--- LIVE PRODUCTION ---');
  const token = await getLiveToken();
  const res1 = await fetch(`${LIVE_API}/chapters?subject_id=7`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('GET /chapters?subject_id=7 status:', res1.status);
  const data1 = await res1.json();
  console.log('data1:', Array.isArray(data1) ? data1.length : data1);

  const res2 = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('GET /question-bank?category=Mathematics status:', res2.status);
  const data2 = await res2.json();
  const qList = data2.questions || data2.data || [];
  console.log('Live Mathematics questions count:', qList.length);
  const chaptersInQ = [...new Set(qList.map(q => q.chapter || q.chapter_name))];
  console.log('Chapters found in Live Mathematics questions:', chaptersInQ);

  process.exit(0);
}

run().catch(console.error);
