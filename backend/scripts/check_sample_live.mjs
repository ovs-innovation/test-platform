const LIVE_API = 'https://edvedum.com/api';

async function checkSample() {
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

  const q8655 = questions.find(q => q.id === 8655);
  const q12648 = questions.find(q => q.id === 12648);
  console.log('Q8655:', q8655 ? { id: q8655.id, chapter: q8655.chapter, chapter_id: q8655.chapter_id } : 'Not found');
  console.log('Q12648:', q12648 ? { id: q12648.id, chapter: q12648.chapter, chapter_id: q12648.chapter_id } : 'Not found');

  process.exit(0);
}

checkSample().catch(console.error);

