import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });
import { pool } from '../src/config/db.js';

async function check() {
  console.log('=== Checking Local Chapters for Chemistry (subject_id = 10) ===');
  const localChaps = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 10 ORDER BY id ASC"
  );
  console.table(localChaps.rows);

  console.log('\n=== Checking Live Chapters for Chemistry (subject_id = 6) ===');
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const liveChapsRes = await fetch('https://edvedum.com/api/admin/subjects/6/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChapsData = await liveChapsRes.json();
  const liveChaps = liveChapsData.chapters || liveChapsData.data || [];
  console.table(liveChaps.map(c => ({ id: c.id, name: c.name })));

  process.exit(0);
}

check().catch(console.error);

