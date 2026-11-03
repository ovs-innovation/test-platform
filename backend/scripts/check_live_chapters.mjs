const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/2/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  console.log('Live chapters for Zoology (Subject 2):', chData);
}

checkLive().catch(console.error);
