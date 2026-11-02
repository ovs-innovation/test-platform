import { pool } from '../src/config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function check() {
  console.log('=== Local Chapters matching Equilibrium or Chemistry ===');
  const localCh = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%equilibrium%' OR subject_id = 10 ORDER BY id");
  console.table(localCh.rows);

  console.log('\n=== Checking Live Chapters for Chemistry ===');
  try {
    const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const tokenData = await tokenRes.json();
    const token = tokenData?.data?.token || tokenData?.token;

    // fetch chapters for subject_id = 6 (Chemistry)
    const chRes = await fetch('https://edvedum.com/api/admin/chapters?subject_id=6', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const list = chData?.chapters || chData?.data || [];
    console.table(list.filter(c => /equilibrium/i.test(c.name)));
    console.log('All Chemistry Chapters on Live:');
    console.table(list.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));
  } catch (err) {
    console.error('Error fetching live:', err.message);
  }

  process.exit(0);
}

check().catch(console.error);

