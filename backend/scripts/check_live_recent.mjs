const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?limit=100`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qs = qData.questions || qData.data || [];
  console.log('Most recent live questions:');
  for (const q of qs.slice(0, 10)) {
    console.log(q.id, q.category, q.subject, q.chapter_id, q.chapter, q.question_text.slice(0, 30));
  }
}

checkLive().catch(console.error);

