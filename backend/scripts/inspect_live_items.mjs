const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const authData = await loginRes.json();
  const token = authData.token || authData.accessToken || authData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const list = qData.questions || qData.data || [];
  const pblock = list.filter(q => Number(q.chapter_id) === 107 || Number(q.chapter_id) === 23 || /p[- ]?block/i.test(q.chapter || '') || /p[- ]?block/i.test(q.chapter_name || ''));
  console.log(`Found ${pblock.length} items:`);
  pblock.forEach(q => console.log({ id: q.id, chId: q.chapter_id, ch: q.chapter, text: q.question_text?.slice(0, 60) }));
}

main();

