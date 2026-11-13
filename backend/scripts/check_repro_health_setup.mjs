import dotenv from 'dotenv';
import pg from 'pg';
import fetch from 'node-fetch';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  // Check Neon DB
  const neonSub = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE '%zool%'");
  console.log('Neon Zoology subject:', neonSub.rows);
  const neonChs = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 13 AND name ILIKE '%repro%'");
  console.log('Neon Reproductive chapters:', neonChs.rows);

  // Check existing PYQ count in Neon DB
  const existingNeon = await pool.query(`
    SELECT count(*) as total FROM question_bank 
    WHERE category = 'PYQ' AND subject = 'Zoology' AND (chapter_id = 131 OR chapter ILIKE '%reproductive health%')
  `);
  console.log('Existing Neon DB PYQ count for Reproductive Health:', existingNeon.rows[0].total);

  // Check Live Server
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const chRes = await fetch('https://edvedum.com/api/admin/subjects/2/chapters', { headers });
  const data = await chRes.json();
  const liveChs = (data.chapters || data).filter(c => c.name.toLowerCase().includes('repro'));
  console.log('Live Server Reproductive chapters (subject_id=2):', liveChs);

  await pool.end();
}

main().catch(console.error);
