import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  let neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%Locomotion%'");
  if (neonCh.rows.length === 0) {
    console.log('Inserting Locomotion chapter into Neon DB...');
    const inserted = await pool.query("INSERT INTO chapters (subject_id, name) VALUES (13, 'Locomotion and Movement') RETURNING *");
    console.log('Inserted Neon chapter:', inserted.rows[0]);
    neonCh = inserted;
  } else {
    console.log('Neon chapters for Locomotion:', neonCh.rows);
  }

  const neonQ = await pool.query(`
    SELECT count(*) as total, count(*) filter (where category = 'PYQ') as pyq_total
    FROM question_bank
    WHERE subject = 'Zoology' AND (chapter ILIKE '%Locomotion%' OR chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%Locomotion%'))
  `);
  console.log('Neon existing questions:', neonQ.rows[0]);

  // Live Server check
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
  const liveLocomotion = (chData.chapters || []).filter(c => c.name.toLowerCase().includes('locomotion'));
  console.log('Live chapters for Locomotion:', liveLocomotion);

  await pool.end();
}

check().catch(console.error);
