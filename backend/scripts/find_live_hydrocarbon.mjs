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

async function findLive() {
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  const chaps = json.chapters || [];
  console.log(`Found ${chaps.length} chapters under Chemistry on live:`);
  chaps.forEach(c => {
    if (c.name.toLowerCase().includes('hydrocarbon') || c.name.toLowerCase().includes('organic')) {
      console.log(`* MATCH: ID=${c.id}, Name="${c.name}", Position=${c.position}`);
    }
  });

  const exact = chaps.find(c => c.name.trim().toLowerCase() === 'hydrocarbons');
  console.log('Exact Hydrocarbons chapter on live:', exact);
}

findLive().catch(console.error);
