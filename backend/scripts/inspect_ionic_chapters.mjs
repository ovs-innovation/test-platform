import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_dMyv1s0tAYre@ep-quiet-grass-a1c112re-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const client = await pool.connect();
  const res = await client.query("SELECT id, name, subject_id, class_level FROM chapters WHERE name ILIKE '%equilibrium%' OR name ILIKE '%ionic%' ORDER BY id ASC");
  console.log('Neon DB Chapters:');
  console.table(res.rows);

  const subs = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Neon DB Chemistry Subject:');
  console.table(subs.rows);
  client.release();
  await pool.end();

  // Also check live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chapRes = await fetch(`${LIVE_API}/admin/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chapRes.status === 200) {
    const data = await chapRes.json();
    const liveChapters = (data.chapters || data.data || []).filter(c => /equilibrium|ionic/i.test(c.name));
    console.log('Live Platform Chapters:');
    console.table(liveChapters);
  }
}

main().catch(console.error);

