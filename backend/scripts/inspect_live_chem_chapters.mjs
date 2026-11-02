const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];
  console.log(`Live Chemistry (Subject 6) chapters count: ${liveChaps.length}`);
  console.table(liveChaps.map(c => ({ id: c.id, name: c.name, position: c.position })));
}

check().catch(console.error);

