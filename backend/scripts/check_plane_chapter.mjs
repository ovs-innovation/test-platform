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
  const localRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND (LOWER(name) LIKE '%plane%' OR LOWER(name) LIKE '%projectile%') ORDER BY id"
  );
  console.log('Local Physics Chapters matching plane/projectile:', localRes.rows);

  const allLocal = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 11 ORDER BY id");
  console.log('All Local Physics Chapters:', allLocal.rows);

  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveRes.ok) {
    const data = await liveRes.json();
    const chs = (data.chapters || data).filter(c => (c.name || '').toLowerCase().includes('plane') || (c.name || '').toLowerCase().includes('motion'));
    console.log('Live Physics chapters matching plane/motion:', chs);
  }

  await pool.end();
}

check().catch(console.error);

