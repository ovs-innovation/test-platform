import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function checkIds() {
  console.log('--- Checking Neon DB ---');
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT c.id, c.name, s.id as subject_id, s.name as subject_name
      FROM chapters c
      JOIN subjects s ON c.subject_id = s.id
      WHERE c.name ILIKE '%Thermodynamics%'
    `);
    console.log('Neon chapters matching Thermodynamics:', res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('--- Checking Live API ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;

  // Let's check subjects first
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const chemSub = (subData.subjects || []).filter(s => s.name.toLowerCase().includes('chem'));
  console.log('Live Chemistry subjects:', chemSub);

  for (const s of chemSub) {
    const chapRes = await fetch(`${LIVE_API}/admin/subjects/${s.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chapData = await chapRes.json();
    const thermoChaps = (chapData.chapters || []).filter(c => c.name.toLowerCase().includes('thermo'));
    console.log(`Live chapters under subject ${s.id} (${s.name}):`, thermoChaps);
  }
}

checkIds().catch(console.error);
