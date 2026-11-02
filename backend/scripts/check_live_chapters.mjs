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
  const chRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  console.log('chData keys:', Object.keys(chData));
  const chList = chData.chapters || chData.data || [];
  console.log(`Total chapters returned: ${chList.length}`);
  const chemChaps = chList.filter(c => c.subject_id === 6 || (c.subject_name || '').toLowerCase() === 'chemistry');
  console.log('Live Chemistry chapters:');
  console.table(chemChaps.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));
}

check().catch(console.error);
