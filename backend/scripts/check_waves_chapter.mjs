import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  const client = await pool.connect();
  const localRes = await client.query(
    "SELECT id, subject_id, name FROM chapters WHERE subject_id = 11 AND LOWER(name) LIKE '%wave%'"
  );
  console.log('Local Waves chapters:', localRes.rows);
  client.release();
  await pool.end();

  const token = await getToken();
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await liveChRes.json();
  const liveList = (chData.chapters || []).filter(c => (c.name || '').toLowerCase().includes('wave'));
  console.log('Live Waves chapters in Physics (subject_id 5):', liveList);
}

main().catch(console.error);
