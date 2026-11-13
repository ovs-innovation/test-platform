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

async function main() {
  const client = await pool.connect();
  const res = await client.query("SELECT id, subject_id, name FROM chapters WHERE subject_id = 10 AND (LOWER(name) LIKE '%nitro%' OR LOWER(name) LIKE '%amine%')");
  console.log("Neon DB chapters:", res.rows);
  const qCount = await client.query("SELECT count(*) FROM question_bank WHERE chapter_id = 118 OR LOWER(chapter) LIKE '%amine%' OR LOWER(chapter) LIKE '%nitro%'");
  console.log("Neon DB question count:", qCount.rows[0].count);
  client.release();
  await pool.end();

  // Check live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qLive102 = await fetch(`${LIVE_API}/question-bank?chapter_id=102`, { headers: { Authorization: `Bearer ${token}` } });
  const qLive102Data = await qLive102.json();
  console.log("Live API chapter 102 questions:", qLive102Data.total || (qLive102Data.questions || qLive102Data.data || []).length);

  const qLive82 = await fetch(`${LIVE_API}/question-bank?chapter_id=82`, { headers: { Authorization: `Bearer ${token}` } });
  const qLive82Data = await qLive82.json();
  console.log("Live API chapter 82 questions:", qLive82Data.total || (qLive82Data.questions || qLive82Data.data || []).length);
}

main().catch(console.error);
