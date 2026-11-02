const LIVE_API = 'https://edvedum.com/api';

async function checkTarget() {
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

  const target = questions.filter(q => q.id >= 14041 && q.id <= 14170);
  console.log('Target questions count:', target.length);
  const chIds = {};
  for (const q of target) {
    chIds[q.chapter_id] = (chIds[q.chapter_id] || 0) + 1;
  }
  console.log('Chapter IDs of 14041-14170 on live:', chIds);

  process.exit(0);
}

checkTarget().catch(console.error);

