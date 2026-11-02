const LIVE_API = 'https://edvedum.com/api';

async function inspect26() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  const questions = json.questions || json.data?.questions || [];

  const outside = questions.filter(q => (q.chapter || '').includes('Basic') && (q.id < 14041 || q.id > 14170));
  console.log('Outside questions count:', outside.length);
  for (const q of outside) {
    console.log(`ID: ${q.id}, chapter_id: ${q.chapter_id}, chapter: ${q.chapter}, topic: ${q.topic}`);
  }

  process.exit(0);
}

inspect26().catch(console.error);

