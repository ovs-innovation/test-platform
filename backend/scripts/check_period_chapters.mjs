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
  console.log('--- Checking Local DB Chapters for Chemistry (subject_id = 10) ---');
  const res = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND (name ILIKE '%periodic%' OR name ILIKE '%classification%')"
  );
  console.log('Local chapters:', res.rows);

  const allCh = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 10 ORDER BY id");
  console.log('All local chemistry chapters:', allCh.rows);

  console.log('\n--- Checking Live API Chapters for Chemistry (subject_id = 6) ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chRes.ok) {
    const chData = await chRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    console.log('Live chapters:', chList);
  } else {
    console.log('Failed to fetch live chapters:', chRes.status);
  }

  await pool.end();
}

main().catch(console.error);
