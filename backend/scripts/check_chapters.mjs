import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const res = await pool.query('SELECT * FROM chapters WHERE subject_id = 11 ORDER BY id');
  console.log('Local chapters for Physics (subject_id=11):');
  console.log(res.rows.map(r => `${r.id}: ${r.name}`));

  // Check live chapters
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const liveChRes = await fetch(`${LIVE_API}/admin/chapters?subject_id=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const liveChapters = await liveChRes.json();
    console.log('\nLive chapters for Physics (subject_id=5):');
    const chList = Array.isArray(liveChapters) ? liveChapters : (liveChapters.chapters || []);
    console.log(chList.map(r => `${r.id}: ${r.name}`));
  } else {
    console.log('Failed to fetch live chapters:', liveChRes.status);
  }

  await pool.end();
}

main().catch(console.error);

