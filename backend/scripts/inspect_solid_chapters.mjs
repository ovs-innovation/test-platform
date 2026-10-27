import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const subjRes = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE 'Physics'");
  console.log('Physics subject in Neon:', subjRes.rows);
  const subjectId = subjRes.rows[0]?.id;

  const res = await pool.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE subject_id = $1 OR name ILIKE '%solid%' OR name ILIKE '%elastic%' OR name ILIKE '%mechanic%'
    ORDER BY id ASC
  `, [subjectId]);

  console.log('Chapters in Neon:', res.rows);

  // Check live edvedum.com
  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveSubsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveSubs = (await liveSubsRes.json()).subjects || [];
  const livePhysics = liveSubs.find(s => s.name.toLowerCase() === 'physics');

  const liveChapsRes = await fetch(`${LIVE_API}/admin/subjects/${livePhysics.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveChaps = (await liveChapsRes.json()).chapters || [];
  console.log('Chapters in Live edvedum:', liveChaps.filter(c => 
    c.name.toLowerCase().includes('solid') || 
    c.name.toLowerCase().includes('elastic') || 
    c.name.toLowerCase().includes('mechanic')
  ));

  await pool.end();
}

check().catch(console.error);
