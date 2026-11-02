import { query } from '../src/config/db.js';

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

async function run() {
  // 1. Local Neon DB
  const localChaps = await query(
    `SELECT id, name FROM chapters WHERE subject_id = 21 AND name ILIKE '%quadratic%'`
  );
  console.log('Local Quadratic chapters:', localChaps.rows);

  const localQs = await query(
    `SELECT count(*) FROM question_bank WHERE category = 'Mathematics' AND (chapter ILIKE '%quadratic%' OR topic ILIKE '%quadratic%')`
  );
  console.log('Local Quadratic questions count:', localQs.rows[0].count);

  // 2. Live Production
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const liveChaps = (data.chapters || []).filter(c => c.name.toLowerCase().includes('quadratic'));
  console.log('Live Quadratic chapters:', liveChaps);

  const liveQsRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQsData = await liveQsRes.json();
  const liveList = liveQsData.data?.questions || liveQsData.questions || [];
  const liveQuadQs = liveList.filter(q => (q.chapter || '').toLowerCase().includes('quadratic'));
  console.log(`Live questions with chapter matching "quadratic": ${liveQuadQs.length}`);
  console.log('Distinct chapters for these live questions:', [...new Set(liveQuadQs.map(q => `${q.chapter_id} - ${q.chapter}`))]);
}

run().catch(console.error);

