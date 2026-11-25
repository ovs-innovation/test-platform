import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function checkLiveElectro() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&refresh=true&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Found ${questions.length} JEE Electrostatics questions on live edvedum.com`);

  // Check the first 10 questions
  questions.slice(0, 10).forEach((q, i) => {
    console.log(`\n[Question #${i + 1}] Live ID: ${q.id}`);
    console.log('Text:', q.question_text);
    console.log('Options:', q.options);
    console.log('Correct Index:', q.correct_index);
    console.log('Image URL:', q.image_url);
    console.log('Solution:', q.solution);
  });
}

checkLiveElectro().catch(console.error);
