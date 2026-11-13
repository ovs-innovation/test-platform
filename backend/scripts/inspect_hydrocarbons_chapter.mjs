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
  try {
    console.log('=== LOCAL NEON DB ===');
    const chRes = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE LOWER(name) LIKE '%hydrocarbon%'"
    );
    console.log('Local chapters:', chRes.rows);

    const subRes = await client.query(
      "SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%chem%'"
    );
    console.log('Local chemistry subjects:', subRes.rows);

    if (chRes.rows.length > 0) {
      const qCount = await client.query(
        "SELECT count(1)::int as count FROM question_bank WHERE chapter_id = $1 AND category = 'PYQ'",
        [chRes.rows[0].id]
      );
      console.log(`Local PYQ count for chapter ${chRes.rows[0].id}: ${qCount.rows[0].count}`);
    }
  } finally {
    client.release();
  }

  console.log('\n=== LIVE PRODUCTION API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chapRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const chaps = chapData.chapters || chapData.data || [];
  const hydroChaps = chaps.filter(c => /hydrocarbon/i.test(c.name));
  console.log('Live chapters:', hydroChaps);
}

main().catch(console.error);

