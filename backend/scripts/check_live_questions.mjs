import fetch from 'node-fetch';

async function checkLive() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const qRes = await fetch('https://edvedum.com/api/admin/questions?subject_id=2&chapter_id=5&limit=100', { headers });
  const data = await qRes.json();
  console.log('Live questions count:', data.total || (data.questions ? data.questions.length : 0));
}

checkLive().catch(console.error);

