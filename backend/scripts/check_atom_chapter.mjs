import { pool } from '../src/config/db.js';

async function test() {
  const localCh = await pool.query("SELECT * FROM chapters WHERE (name ILIKE '%atom%' OR name ILIKE '%structure%')");
  console.log('Local DB chapters for atom:', localCh.rows);

  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { chapters } = await chapsRes.json();
  const liveAtom = chapters.filter(c => c.name.toLowerCase().includes('atom') || c.name.toLowerCase().includes('structure'));
  console.log('Live chapters for atom:', liveAtom);
  process.exit(0);
}

test().catch(console.error);

