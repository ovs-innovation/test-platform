import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  // 1. Live server check
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const liveChapsRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, { headers });
  const liveChaps = await liveChapsRes.json();
  const cellCycleLive = liveChaps.chapters?.find(c => c.name.toLowerCase().includes('cell cycle'));
  console.log('Cell Cycle on Live (Botany subj 10):', cellCycleLive);

  // 2. Neon DB check
  const neonSubjs = await query(`SELECT id, name FROM subjects WHERE LOWER(name) = 'botany'`);
  console.log('Botany subjects in Neon:', neonSubjs.rows);
  const neonChaps = await query(`
    SELECT id, name, subject_id FROM chapters 
    WHERE LOWER(name) LIKE '%cell cycle%'
  `);
  console.log('Cell Cycle chapters in Neon:', neonChaps.rows);
}

main().catch(console.error);

