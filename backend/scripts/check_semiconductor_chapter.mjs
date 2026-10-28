import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  console.log('=== Checking Neon DB for Semiconductor chapters ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  let neonChap = null;
  let neonSubId = null;

  try {
    const s = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics'");
    neonSubId = s.rows[0].id;
    const res = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1", [neonSubId]);
    console.log('All Physics chapters in Neon DB:');
    res.rows.forEach(r => console.log(`  [ID ${r.id}] ${r.name}`));

    const semi = res.rows.filter(r => r.name.toLowerCase().includes('semiconductor') || r.name.toLowerCase().includes('electronic'));
    console.log('Matching semiconductor chapters in Neon:', semi);
    if (semi.length > 0) neonChap = semi[0];
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Checking live edvedum.com for Semiconductor chapters ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  console.log('All Physics chapters on live edvedum.com:');
  chaps.forEach(c => console.log(`  [ID ${c.id}] ${c.name}`));

  const liveSemi = chaps.filter(c => c.name.toLowerCase().includes('semiconductor') || c.name.toLowerCase().includes('electronic'));
  console.log('Matching semiconductor chapters on live edvedum:', liveSemi);
}

check().catch(console.error);
