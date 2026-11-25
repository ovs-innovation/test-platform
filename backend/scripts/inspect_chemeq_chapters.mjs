import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const LIVE_API = 'https://edvedum.com/api';

async function check() {
  console.log('--- 1. NEON DATABASE ---');
  const client = await pool.connect();
  try {
    const subs = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry'");
    console.log('Neon Chemistry subject:', subs.rows);
    const chemSubId = subs.rows[0]?.id;
    const chapters = await client.query("SELECT id, subject_id, name FROM chapters WHERE subject_id = $1 AND (name ILIKE '%equilibrium%' OR name ILIKE '%chemical%')", [chemSubId]);
    console.log('Neon Equilibrium chapters:', chapters.rows);

    const allCh = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY id", [chemSubId]);
    console.log('All Neon Chemistry chapters count:', allCh.rows.length);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- 2. LIVE VPS ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const liveSubs = subData.subjects || subData || [];
  const liveChem = liveSubs.find(s => s.name?.toLowerCase() === 'chemistry');
  console.log('Live Chemistry subject:', liveChem);

  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveChem.id}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChData = await liveChRes.json();
  const liveChapters = liveChData.chapters || liveChData || [];
  const eqCh = liveChapters.filter(c => c.name?.toLowerCase().includes('equilibrium'));
  console.log('Live Equilibrium chapters:', eqCh);
}

check().catch(console.error);
