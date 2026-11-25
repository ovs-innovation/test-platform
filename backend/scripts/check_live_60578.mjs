import fetch from 'node-fetch';

async function check() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const res = await fetch('https://edvedum.com/api/question-bank/60578', {
    headers: { Authorization: 'Bearer ' + token }
  });
  console.log('Status for 60578:', res.status);
  if (res.ok) {
    const data = await res.json();
    console.log('60578 data:', data);
  } else {
    console.log('Response text:', await res.text());
  }

  // Also search for recent questions with chapter Electrostatics
  const listRes = await fetch('https://edvedum.com/api/question-bank?category=Physics&chapter=Electrostatics&limit=5', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const listData = await listRes.json();
  console.log('Sample questions from live API Electrostatics:', (listData.questions || []).map(q => ({
    id: q.id,
    chapter: q.chapter,
    chapter_id: q.chapter_id,
    exam_type: q.exam_type,
    text: q.question_text?.substring(0, 100),
    options: q.options
  })));
}
check().catch(console.error);
