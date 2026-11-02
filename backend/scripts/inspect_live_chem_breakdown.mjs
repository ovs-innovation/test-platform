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

async function check() {
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Live Chemistry Total Questions: ${questions.length}`);

  // Group by chapter
  const map = {};
  for (const q of questions) {
    const ch = q.chapter || 'Unknown';
    map[ch] = (map[ch] || 0) + 1;
  }
  console.log('Live Chemistry chapter breakdown:');
  console.table(map);

  // Check subjects API for Chemistry
  const sRes = await fetch(`${LIVE_API}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const sData = await sRes.json();
  console.log('Live Subjects:', sData.subjects || sData.data || sData);
}

check().catch(console.error);

