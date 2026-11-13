import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%Chemical%'");
  console.log('Neon chapters for Chemical:', neonCh.rows);

  const neonQ = await pool.query(`
    SELECT count(*) as total, count(*) filter (where category = 'PYQ') as pyq_total
    FROM question_bank
    WHERE subject = 'Zoology' AND (chapter ILIKE '%Chemical%' OR chapter_id = 175)
  `);
  console.log('Neon existing questions:', neonQ.rows[0]);

  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const chRes = await fetch(LIVE_API + '/admin/subjects/2/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const chData = await chRes.json();
  const liveCh = (chData.chapters || []).filter(c => c.name.toLowerCase().includes('chemical'));
  console.log('Live chapters for Chemical:', liveCh);

  await pool.end();
}

check().catch(console.error);

