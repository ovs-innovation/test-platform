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
  // 1. Check local DB
  const localSubs = await query(`SELECT id, name FROM subjects WHERE name ILIKE '%math%'`);
  console.log('Local Subjects:', localSubs.rows);

  const localChaps = await query(`
    SELECT c.id, c.subject_id, c.name, s.name as subject_name 
    FROM chapters c 
    JOIN subjects s ON c.subject_id = s.id 
    WHERE c.name ILIKE '%trig%' OR c.name ILIKE '%inverse%'
  `);
  console.log('Local Chapters:', localChaps.rows);

  // If chapter not found, list all Math chapters in local DB
  if (localSubs.rows.length > 0) {
    const allMathChaps = await query(`SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY id`, [localSubs.rows[0].id]);
    console.log('All Local Math Chapters:', allMathChaps.rows.map(r => `[${r.id}] ${r.name}`));
  }

  // 2. Check Live API
  try {
    const token = await getToken();
    const liveSubsRes = await fetch(`${LIVE_API}/subjects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveSubs = await liveSubsRes.json();
    console.log('Live Subjects:', liveSubs.data ? liveSubs.data.filter(s => s.name.toLowerCase().includes('math')) : liveSubs);

    const mathSub = (liveSubs.data || liveSubs).find(s => s.name.toLowerCase().includes('math'));
    if (mathSub) {
      const liveChapsRes = await fetch(`${LIVE_API}/chapters?subject_id=${mathSub.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const liveChaps = await liveChapsRes.json();
      console.log('Live Math Chapters:', (liveChaps.data || liveChaps).map(c => `[${c.id}] ${c.name}`));
    }
  } catch (err) {
    console.log('Live API check failed (may need BypassSandbox):', err.message);
  }
}

run().catch(console.error);
