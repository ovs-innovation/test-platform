import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Wave%20Optics&exam_type=JEE&limit=200`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const qs = data.questions || [];
  console.log(`Live API fetched ${qs.length} questions for JEE Wave Optics.`);

  // Check diagrams
  const withDiagrams = qs.filter(q => q.image_url);
  console.log(`Questions with diagram on live API: ${withDiagrams.length}`);

  // Check first question
  if (qs.length > 0) {
    console.log('Sample Q1:', {
      text: qs[0].question_text.substring(0, 100),
      type: qs[0].question_type,
      options: qs[0].options,
      correct_index: qs[0].correct_index
    });
  }

  // Check last question
  if (qs.length === 191) {
    console.log('Sample Q191:', {
      text: qs[190].question_text.substring(0, 100),
      type: qs[190].question_type,
      numeric_answer: qs[190].numeric_answer
    });
  }
}

verify().catch(console.error);
