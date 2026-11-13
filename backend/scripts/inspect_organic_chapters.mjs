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
  console.log('--- Inspecting Local Neon DB Chapters for Chemistry (ID: 10) ---');
  const client = await pool.connect();
  try {
    const chapters = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND (name ILIKE '%organic%' OR name ILIKE '%basic%') ORDER BY id ASC"
    );
    console.log('Local chapters:', chapters.rows);

    const allCh = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = 10 ORDER BY id ASC"
    );
    console.log('All Local Chemistry chapters:', allCh.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- Inspecting Live API (edvedum.com) Chapters for Chemistry (ID: 6) ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const authData = await loginRes.json();
    const token = authData.token || authData.accessToken || authData.data?.token;

    const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (chRes.ok) {
      const chList = await chRes.json();
      const list = Array.isArray(chList) ? chList : (chList.chapters || chList.data || []);
      const matched = list.filter(c => /organic|basic/i.test(c.name));
      console.log('Matched Live chapters:', matched);
      console.log('All Live Chemistry chapters count:', list.length);
      console.log('All Live Chemistry chapters:', list.map(c => ({ id: c.id, name: c.name })));
    }
  } catch (err) {
    console.error('Error querying Live API:', err);
  }
}

main();

