import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  console.log('=== CHECKING NEON DB ===');
  const client = await pool.connect();
  try {
    const subs = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry'");
    console.log('Neon Chemistry subject:', subs.rows);
    const subId = subs.rows[0]?.id;
    const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%Redox%'");
    console.log('Neon Redox chapters:', chs.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('=== CHECKING LIVE VPS ===');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const subRes = await fetch('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const subData = await subRes.json();
  const liveSubs = subData.subjects || subData || [];
  const liveChem = liveSubs.find(s => s.name?.toLowerCase() === 'chemistry');
  console.log('Live Chemistry subject:', liveChem);
  
  if (liveChem) {
    const chRes = await fetch('https://edvedum.com/api/admin/subjects/' + liveChem.id + '/chapters', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const chData = await chRes.json();
    const liveChs = chData.chapters || chData || [];
    const redox = liveChs.filter(c => c.name?.toLowerCase().includes('redox'));
    console.log('Live Redox chapters:', redox);
  }
}
check().catch(e => console.error(e));
