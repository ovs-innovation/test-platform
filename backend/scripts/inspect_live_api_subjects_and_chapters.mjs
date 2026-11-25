import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function test() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chapters = chData.chapters || [];
  console.log(`Live Physics chapters count: ${chapters.length}`);

  const electro = chapters.filter(c => /electro/i.test(c.name));
  console.log('Electro chapters for Physics (subject 5):', electro);
}

test().catch(console.error);
