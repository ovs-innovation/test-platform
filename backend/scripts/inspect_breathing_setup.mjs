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
  console.log('--- LOCAL DB CHAPTERS FOR ZOOLOGY (subject_id = 13) ---');
  const localCh = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 13 ORDER BY id ASC");
  console.log('Local chapters:', localCh.rows);

  console.log('\n--- LIVE API CHAPTERS ---');
  const token = await getToken();
  const chRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  console.log('Live chapters response keys:', Object.keys(chData));
  const list = chData.chapters || chData.data || [];
  const breathing = list.filter(c => /breath|gas/i.test(c.name || ''));
  console.log('Matching breathing in live chapters:', breathing);
  const zooChaps = list.filter(c => Number(c.subject_id) === 2 || /zoo/i.test(c.category || ''));
  console.log('All live Zoology chapters:', zooChaps.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));

  await pool.end();
}

main().catch(async (e) => {
  console.error(e);
  await pool.end();
});
