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
  const client = await pool.connect();
  const dbRes = await client.query(
    "SELECT id, name FROM chapters WHERE subject_id = 10 AND (LOWER(name) LIKE '%aldehyde%' OR LOWER(name) LIKE '%carboxylic%')"
  );
  console.log("Neon DB chapters:", dbRes.rows);

  const qCount = await client.query(
    "SELECT category, count(*) FROM question_bank WHERE chapter_id = 117 OR LOWER(chapter) LIKE '%aldehyde%' GROUP BY category"
  );
  console.log("Neon DB existing questions by category:", qCount.rows);

  client.release();
  await pool.end();

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chapRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const list = Array.isArray(chapData) ? chapData : (chapData.chapters || chapData.data || []);
  const filtered = list.filter(c => (c.name || '').toLowerCase().includes('aldehyde') || (c.name || '').toLowerCase().includes('carboxylic'));
  console.log("Live API Chemistry chapters:", filtered);
}

main().catch(console.error);
