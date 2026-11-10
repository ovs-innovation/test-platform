const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function run() {
  const token = await getToken();
  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await chRes.json();
  const chapters = data.chapters || data;
  const matches = chapters.filter(c => 
    c.name.toLowerCase().includes('straight') || 
    c.name.toLowerCase().includes('motion') || 
    c.name.toLowerCase().includes('line')
  );
  console.log('Live Physics motion chapters:', matches);
}

run().catch(console.error);
