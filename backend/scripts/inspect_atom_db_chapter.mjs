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

async function check() {
  console.log('=== CHECKING STRUCTURE OF ATOM CHAPTER IDS ===\n');

  // 1. Neon DB
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = 10 AND LOWER(name) LIKE '%atom%' ORDER BY id"
    );
    console.log('Neon DB Chemistry chapters matching "atom":', res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chRes.ok) {
    const chData = await chRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    console.log('\nLive API Chemistry chapters matching "atom":');
    chList.forEach(c => {
      if (/atom/i.test(c.name)) {
        console.log(`  ID ${c.id}: "${c.name}"`);
      }
    });
  }
}

check().catch(console.error);

