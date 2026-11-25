const LIVE_API = 'https://edvedum.com/api';

async function listLiveChapters() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;

  const chapRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const chapters = chapData.chapters || [];
  console.log(`Live chapters under Subject 6 (Chemistry): total ${chapters.length}`);
  for (const c of chapters) {
    console.log(`ID: ${c.id.toString().padEnd(5)} | Name: ${c.name}`);
  }
}

listLiveChapters().catch(console.error);
