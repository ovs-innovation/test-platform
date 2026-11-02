import { query } from '../src/config/db.js';

async function main() {
  const localRes = await query(`
    SELECT id, question_text 
    FROM question_bank 
    WHERE (category = 'Mathematics' OR subject = 'Mathematics') 
      AND (chapter ILIKE '%complex%' OR topic ILIKE '%complex%')
    ORDER BY id
  `);
  console.log('Local Neon Complex Number questions count:', localRes.rows.length);
  for (const r of localRes.rows.slice(0, 10)) {
    console.log(r.id, ':', r.question_text.slice(0, 60).replace(/\n/g, ' '));
  }

  const liveTokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await liveTokenRes.json();
  const token = tokenData.token || tokenData.data?.token || tokenData.accessToken;

  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Mathematics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  const liveCN = liveList.filter(q => /complex/i.test(q.chapter_name || q.chapter || q.topic || ''));
  console.log('\nLive Complex Number questions count:', liveCN.length);
  for (const r of liveCN.slice(0, 10)) {
    console.log(r.id, ':', r.question_text.slice(0, 60).replace(/\n/g, ' '));
  }
}

main().catch(console.error);

