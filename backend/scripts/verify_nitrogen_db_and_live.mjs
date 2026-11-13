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
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 118 OR LOWER(chapter) LIKE '%nitrogen%')"
  );
  console.log(`[Neon DB] PYQ Questions in 'Organic Compounds Containing Nitrogen': ${dbRes.rows[0].count}`);
  client.release();
  await pool.end();

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&chapter_id=102&limit=100`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveRes.ok) {
    const liveData = await liveRes.json();
    const count = liveData.total || (liveData.questions || liveData.data || []).length;
    console.log(`[Live Server] Questions count reported: ${count}`);
  }
}

main().catch(console.error);

