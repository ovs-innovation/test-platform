import fetch from 'node-fetch';

async function check() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Test direct get if endpoint exists
  const res1 = await fetch('https://edvedum.com/api/question-bank/60578', {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('GET /api/question-bank/60578 status:', res1.status);
  if (res1.ok) {
    console.log('Data:', await res1.json());
  }

  // Search by text
  const res2 = await fetch('https://edvedum.com/api/question-bank?search=paint+A+to+B&refresh=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data2 = await res2.json();
  console.log('Search "paint A to B" count:', data2.questions ? data2.questions.length : data2);

  // Search for the 300 JEE Electrostatics questions currently in live API
  const res3 = await fetch('https://edvedum.com/api/question-bank?chapter_id=106&exam_type=JEE&refresh=true&limit=10', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data3 = await res3.json();
  console.log('Sample current JEE Electrostatics (chId: 106):');
  (data3.questions || []).slice(0, 5).forEach(q => {
    console.log(`ID: ${q.id}, Text: ${q.question_text.substring(0, 80)}, Options: ${JSON.stringify(q.options)}`);
  });
}

check().catch(console.error);
