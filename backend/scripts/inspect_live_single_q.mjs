import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function test() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Fetch all questions for category=Physics and exam_type=JEE with refresh=true
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=5000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log('Total questions in live API for JEE Physics:', questions.length);

  const q37952 = questions.find(q => q.id === 37952);
  console.log('Question 37952 in live API:', q37952);

  // Search if any question has chapter_id === 198
  const ch198 = questions.filter(q => q.chapter_id === 198);
  console.log(`Questions with chapter_id === 198 in live API: ${ch198.length}`);
}

test().catch(console.error);
