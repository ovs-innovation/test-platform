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

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%ionic%' OR name ILIKE '%equilibrium%'");
    console.log('Neon Chapters:', res.rows);
  } finally {
    client.release();
    await pool.end();
  }

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;
  const chapRes = await fetch('https://edvedum.com/api/chapters?limit=500', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const cData = await chapRes.json();
  const matched = (cData.chapters || cData || []).filter(c => (c.name || '').toLowerCase().includes('ionic') || (c.name || '').toLowerCase().includes('equilibrium'));
  console.log('Live Chapters:', matched.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));
}

check();
