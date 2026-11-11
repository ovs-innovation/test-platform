import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  
  const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const chData = await chRes.json();
  const liveChapters = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const liveRedox = liveChapters.filter(c => /redox/i.test(c.name || c.chapter_name || ''));
  console.log('Live Redox Chapters for Subject 6:');
  console.table(liveRedox);

  const subRes = await fetch(LIVE_API + '/subjects', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const subData = await subRes.json();
  const liveSubjects = subData.subjects || subData.data || [];
  console.log('Live Chemistry Subjects:');
  console.table(liveSubjects.filter(s => /chem/i.test(s.name || s.subject_name || '')));

  // Neon DB
  if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const neonSub = await pool.query('SELECT * FROM subjects WHERE name ILIKE $1', ['%chem%']);
    console.log('Neon Chemistry Subjects:');
    console.table(neonSub.rows);

    const neonCh = await pool.query('SELECT * FROM chapters WHERE name ILIKE $1', ['%redox%']);
    console.log('Neon Redox Chapters:');
    console.table(neonCh.rows);

    await pool.end();
  }
}

check().catch(console.error);
