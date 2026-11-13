import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const sub = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%chem%'");
  console.log('Local Subjects:', sub.rows);
  const ch = await client.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%bond%'");
  console.log('Local Chapters:', ch.rows);
  const qCount = await client.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = 60 OR LOWER(chapter) LIKE '%bond%'");
  console.log('Local existing questions count for bonding:', qCount.rows[0].count);
  client.release();
  await pool.end();

  // Check Live
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const subData = await subRes.json();
    const liveSubs = subData.subjects || subData.data || [];
    console.log('Live Chemistry subjects:', liveSubs.filter(s => /chem/i.test(s.name)));

    const chRes = await fetch(`${LIVE_API}/admin/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const liveChs = chData.chapters || chData.data || [];
    console.log('Live Bonding chapters:', liveChs.filter(c => /bond/i.test(c.name)));
  } catch (e) {
    console.log('Live check error:', e.message);
  }
}

main();

