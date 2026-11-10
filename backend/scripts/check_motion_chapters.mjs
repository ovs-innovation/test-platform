import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function check() {
  // Local DB
  const localRes = await pool.query(
    "SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%straight%line%' OR LOWER(name) LIKE '%motion%straight%'"
  );
  console.log('Local DB Motion in Straight Line chapters:', localRes.rows);

  // Live DB
  const token = await getToken();
  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chRes.ok) {
    const data = await chRes.json();
    const chs = (data.chapters || data).filter(c => (c.name || '').toLowerCase().includes('straight') || (c.name || '').toLowerCase().includes('motion'));
    console.log('Live Physics chapters matching motion/straight:', chs);
  }

  await pool.end();
}

check().catch(console.error);

