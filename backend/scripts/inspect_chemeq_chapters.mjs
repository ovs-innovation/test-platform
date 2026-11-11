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
  const liveEq = liveChapters.filter(c => /equilib/i.test(c.name || c.chapter_name || ''));
  console.log('Live Equilibrium Chapters for Subject 6:');
  console.table(liveEq);

  // Check Neon DB
  if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 10 AND name ILIKE '%equilib%'");
    console.log('Neon Equilibrium Chapters:');
    console.table(neonCh.rows);

    await pool.end();
  }
}

check().catch(console.error);
