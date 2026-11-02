const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  console.log('Fetching live question-bank for Chemistry...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  const questions = json.questions || json.data?.questions || (Array.isArray(json.data) ? json.data : []);

  console.log(`Total live chemistry questions fetched: ${questions.length}`);
  const counts = {};
  const basicIds = [];

  for (const q of questions) {
    const ch = q.chapter || q.chapter_name || 'Unknown';
    counts[ch] = (counts[ch] || 0) + 1;
    if (ch.toLowerCase().includes('basic')) {
      basicIds.push(q.id);
    }
  }

  console.log('Live chapters breakdown:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k}: ${v}`);
  }
  console.log(`Basic chapter count: ${basicIds.length}, min ID: ${Math.min(...basicIds)}, max ID: ${Math.max(...basicIds)}`);
  process.exit(0);
}

checkLive().catch(e => {
  console.error(e);
  process.exit(1);
});
