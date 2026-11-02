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
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const list = data.data?.questions || data.questions || [];
  const qList = list.filter(q => (q.chapter || '').toLowerCase().includes('quadratic'));
  console.log(`Found ${qList.length} questions:`);
  for (const q of qList) {
    console.log(`[${q.id}] (${q.chapter_id} - ${q.chapter}): ${q.question_text?.slice(0, 80)}`);
  }
}

run().catch(console.error);

