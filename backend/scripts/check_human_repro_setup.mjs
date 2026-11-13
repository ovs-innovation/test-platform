import dotenv from 'dotenv';
import pg from 'pg';
import fetch from 'node-fetch';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  // Check Neon DB chapters for subject_id = 13
  const chs = await pool.query('SELECT id, name FROM chapters WHERE subject_id = 13 ORDER BY id');
  console.log('Neon DB Zoology chapters:');
  for (const c of chs.rows) {
    console.log(`  id=${c.id}: "${c.name}"`);
  }
  const repro = chs.rows.filter(c => c.name.toLowerCase().includes('reproduction'));
  console.log('Matching reproduction chapters in Neon DB:', repro);

  // Check Live Server
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const liveChRes = await fetch('https://edvedum.com/api/admin/subjects/2/chapters', { headers });
  const liveData = await liveChRes.json();
  const liveChList = liveData.chapters || liveData;
  const liveRepro = liveChList.filter(c => c.name.toLowerCase().includes('reproduction'));
  console.log('Matching reproduction chapters on Live Server (subject_id=2):', liveRepro);

  await pool.end();
}

main().catch(console.error);
