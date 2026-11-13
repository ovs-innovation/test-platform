import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  console.log('--- Checking Local Neon DB for p-block chapters ---');
  const localRes = await query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%p-block%' OR name ILIKE '%p block%'");
  console.log('Local DB:', localRes.rows);

  console.log('\n--- Checking Live API (Subject 6 Chemistry) for p-block chapters ---');
  const token = await getToken();
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await liveChRes.json();
  const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const pBlockChapters = chList.filter(c => /p[- ]?block/i.test(c.name));
  console.log('Live API:', pBlockChapters);

  // Check existing questions in Live API for p-block
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const questions = qData.questions || qData.data || [];
  const existingPblock = questions.filter(q => /p[- ]?block/i.test(q.chapter || '') || /p[- ]?block/i.test(q.chapter_name || ''));
  console.log('\nExisting Live p-block questions:', existingPblock.length);
  if (existingPblock.length > 0) {
    const byCh = {};
    existingPblock.forEach(q => {
      const key = `${q.chapter_id} (${q.chapter || q.chapter_name})`;
      byCh[key] = (byCh[key] || 0) + 1;
    });
    console.log('Existing Live questions by chapter:', byCh);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

