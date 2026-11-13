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
  console.log('--- LOCAL DATABASE ---');
  const localRes = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%dual%' OR name ILIKE '%matter%' OR name ILIKE '%radiation%'");
  console.log('Local chapters:', localRes.rows);

  console.log('\n--- LIVE PLATFORM API ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const res = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const chList = Array.isArray(data) ? data : (data.chapters || data.data || []);
    for (const ch of chList) {
      if (/dual|radiation|matter/i.test(ch.name)) {
        console.log('Live Dual Nature chapter:', ch);
      }
    }
  } catch (e) {
    console.error('Error fetching live:', e.message);
  }

  await pool.end();
}

main().catch(console.error);

