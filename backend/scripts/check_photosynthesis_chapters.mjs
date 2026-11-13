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
  const photoLive = liveChaps.chapters?.find(c => c.name.toLowerCase().includes('photosynthesis'));
  console.log('Photosynthesis on Live (Botany subj 10):', photoLive);

  // 2. Neon DB check
  const neonChaps = await query(`
    SELECT id, name, subject_id FROM chapters 
    WHERE LOWER(name) LIKE '%photosynthesis%'
  `);
  console.log('Photosynthesis chapters in Neon:', neonChaps.rows);

  if (neonChaps.rows.length === 0) {
    const ins = await query(`
      INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id, name, subject_id
    `, [15, 'Photosynthesis in Higher Plants']);
    console.log('Created chapter in Neon DB:', ins.rows[0]);
  }
}

main().catch(console.error);

