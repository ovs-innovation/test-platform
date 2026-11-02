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
  console.log('Got live token.');

  // Fetch chapters for Chemistry
  const chRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chList = chData.data?.chapters || chData.chapters || chData.data || [];
  const thermoChaps = chList.filter(c => (c.name || '').toLowerCase().includes('thermo'));
  console.log('Live chapters matching thermo:');
  console.log(thermoChaps);

  // Fetch question bank counts for Chemistry Thermodynamics
  const qRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&chapter=Thermodynamics&limit=100`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qList = qData.data?.questions || qData.questions || [];
  console.log(`Live Chemistry Thermodynamics count: ${qList.length}`);
}

check().catch(console.error);

