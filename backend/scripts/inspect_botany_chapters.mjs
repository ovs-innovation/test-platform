import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  // Subjects on Live
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  console.log('Live Subjects:', subData);

  const botany = (subData.subjects || subData.data || []).find(s => s.name.toLowerCase() === 'botany');
  console.log('Botany on Live:', botany);

  if (botany) {
    const chRes = await fetch(`${LIVE_API}/admin/subjects/${botany.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    console.log('Botany Chapters on Live:');
    console.table((chData.chapters || chData.data || []).map(c => ({ id: c.id, name: c.name })));
  }

  process.exit(0);
}

check().catch(console.error);

