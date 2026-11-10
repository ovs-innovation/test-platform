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
  const localCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 11 AND LOWER(name) LIKE '%gravitation%'");
  console.log('Local gravitation chapters:', localCh.rows);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await chRes.json();
  const liveGrav = (data.chapters || []).filter(c => (c.name || '').toLowerCase().includes('gravitation'));
  console.log('Live gravitation chapters:', liveGrav);

  await pool.end();
}

main().catch(console.error);

