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

async function verify() {
  const neonRes = await pool.query(
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 206 OR LOWER(chapter) LIKE '%alcohol%')"
  );
  console.log(`Neon DB PYQ Count for Alcohols: ${neonRes.rows[0].count}`);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=PYQ&chapter_id=101&limit=100', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const items = liveData.data || [];
  console.log(`Live API PYQ Count for Alcohols (Chapter 101): ${items.length}`);
  if (items.length > 0) {
    console.log(`First item: [${items[0].chapter}] ${items[0].question_text.slice(0, 70)}...`);
    console.log(`Last item: [${items[items.length - 1].chapter}] ${items[items.length - 1].question_text.slice(0, 70)}...`);
  }

  await pool.end();
}

verify().catch(console.error);
