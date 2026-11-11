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
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    const physicsId = subRes.rows[0].id;
    console.log('Local Physics Subject ID:', physicsId);

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY id",
      [physicsId]
    );
    const emwChaps = chapRes.rows.filter(c =>
      c.name.toLowerCase().includes('electromagnetic') ||
      c.name.toLowerCase().includes('wave')
    );
    console.log('Local chapters with electromagnetic or wave:', emwChaps);

    const qCount = await client.query(
      "SELECT chapter_id, chapter, count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (LOWER(chapter) LIKE '%wave%' OR LOWER(chapter) LIKE '%electromagnetic%') GROUP BY chapter_id, chapter"
    );
    console.log('Local existing PYQ counts:', qCount.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Check Live API
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();
    const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const emw = chList.filter(c =>
      (c.name || '').toLowerCase().includes('electromagnetic') ||
      (c.name || '').toLowerCase().includes('wave')
    );
    console.log('Live Physics chapters with electromagnetic or wave:', emw);
  } catch (err) {
    console.error('Live API check error:', err.message);
  }
}

main().catch(console.error);

