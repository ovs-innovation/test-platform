import fetch from 'node-fetch';

async function testPerf() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const res1 = await fetch('https://edvedum.com/api/question-bank?category=PYQ&subject=Physics', { headers });
  const text1 = await res1.text();
  console.log('Physics payload size:', (text1.length / (1024 * 1024)).toFixed(2), 'MB');

  const resAll = await fetch('https://edvedum.com/api/question-bank?category=PYQ', { headers });
  const textAll = await resAll.text();
  console.log('ALL PYQ payload size:', (textAll.length / (1024 * 1024)).toFixed(2), 'MB');
}

testPerf().catch(console.error);
