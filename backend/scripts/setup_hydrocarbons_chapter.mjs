import { query } from '../src/config/db.js';

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

async function run() {
  console.log('=== Checking chapters schema in local DB ===');
  const cols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'chapters'");
  console.log('Chapters columns:', cols.rows);

  // Check chemistry chapters in local DB
  const chemChaps = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 ORDER BY id DESC LIMIT 10");
  console.log('Recent Local Chemistry Chapters:', chemChaps.rows);

  const token = await getToken();

  // Check live chapters
  const liveChapsRes = await fetch(`${LIVE_API}/admin/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChaps = await liveChapsRes.json();
  console.log('Live chapters status / length:', liveChapsRes.status, Array.isArray(liveChaps) ? liveChaps.length : Object.keys(liveChaps));
  if (Array.isArray(liveChaps)) {
    const chemLive = liveChaps.filter(c => c.subject_id === 6 || (c.subject_name && c.subject_name.toLowerCase().includes('chem')));
    console.log('Recent Live Chemistry Chapters:', chemLive.slice(-5));
  } else if (liveChaps.data) {
    const chemLive = liveChaps.data.filter(c => c.subject_id === 6 || (c.subject_name && c.subject_name.toLowerCase().includes('chem')));
    console.log('Recent Live Chemistry Chapters in data:', chemLive.slice(-5));
  }
}

run().catch(console.error).finally(() => process.exit(0));

