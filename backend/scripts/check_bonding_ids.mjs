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

async function check() {
  console.log('--- Checking Neon DB for Chemical Bonding ---');
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT c.id, c.name, s.id as subject_id, s.name as subject_name
      FROM chapters c
      JOIN subjects s ON c.subject_id = s.id
      WHERE c.name ILIKE '%Bonding%'
    `);
    console.table(res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('--- Checking Live API for Chemical Bonding ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;

  const chapRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const bondingChaps = (chapData.chapters || []).filter(c => c.name.toLowerCase().includes('bond'));
  console.table(bondingChaps);
}

check().catch(console.error);
