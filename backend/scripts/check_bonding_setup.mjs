import { pool } from '../src/config/db.js';

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

async function main() {
  console.log('=== Checking Local DB ===');
  const subs = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Chemistry subjects in Local DB:', subs.rows);

  const chaps = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%bonding%' OR name ILIKE '%chemical%'");
  console.log('Bonding chapters in Local DB:', chaps.rows);

  console.log('\n=== Checking Live DB ===');
  const token = await getToken();
  // Usually Chemistry subject_id is 14 or check all subjects
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const liveSubs = subData.data?.subjects || subData.subjects || subData.data || [];
  console.log('Live subjects:', liveSubs);

  const chemSub = liveSubs.find(s => /chem/i.test(s.name));
  if (chemSub) {
    const chRes = await fetch(`${LIVE_API}/admin/subjects/${chemSub.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const liveChaps = chData.data?.chapters || chData.chapters || [];
    console.log(`Live chapters in ${chemSub.name} (id: ${chemSub.id}):`);
    const bondChaps = liveChaps.filter(c => /bond/i.test(c.name));
    console.log('Matching bonding chapters:', bondChaps);
  }

  await pool.end();
}

main().catch(console.error);
