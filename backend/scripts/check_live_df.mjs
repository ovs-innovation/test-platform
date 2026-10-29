import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  let page = 1;
  let allQs = [];
  while (true) {
    const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=500&page=${page}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const qs = data.questions || [];
    if (qs.length === 0) break;
    allQs.push(...qs);
    if (allQs.length >= (data.pagination?.total || qs.length)) break;
    page++;
  }

  const matching = allQs.filter(q => {
    const text = (q.question_text || '').toLowerCase();
    const ch = (q.chapter || '').toLowerCase();
    return text.includes('lanthan') || text.includes('actin') || ch.includes('d- and f') || ch.includes('d and f') || ch.includes('kmno4') || text.includes('k2cr2o7') || text.includes('kmno4');
  });

  console.log(`Live matching d/f block questions: ${matching.length}`);
  matching.forEach((m, idx) => {
    console.log(`${idx + 1}. [ID: ${m.id}] [Chapter: ${m.chapter}] "${m.question_text.slice(0, 70)}..."`);
  });
}

checkLive().catch(console.error);
