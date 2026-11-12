import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  console.log('Checking Neon DB...');
  const sRes = await pool.query("SELECT * FROM subjects WHERE name ILIKE 'Botany'");
  console.log('Neon Botany subject:', sRes.rows[0]);
  const botId = sRes.rows[0].id;
  const cRes = await pool.query("SELECT * FROM chapters WHERE subject_id = $1 AND name ILIKE '%Organisms%'", [botId]);
  console.log('Neon Organisms and Populations chapters:', cRes.rows);

  console.log('\nChecking Live Server...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = await subsRes.json();
  const liveBot = subs.find(s => s.name.toLowerCase() === 'botany');
  console.log('Live Botany subject:', liveBot);

  const chsRes = await fetch(`${LIVE_API}/admin/subjects/${liveBot.id}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chs = await chsRes.json();
  const liveOrgPop = chs.find(c => c.name.toLowerCase().includes('organisms'));
  console.log('Live Organisms and Populations chapter:', liveOrgPop);

  await pool.end();
}

check().catch(console.error);
