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
    const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%thermo%' ORDER BY id ASC");
    console.log('Neon Chapters:', res.rows);
    const subRes = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
    console.log('Neon Chemistry Subjects:', subRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/6/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await chRes.json();
  const list = data.chapters || [];
  console.log('Live Chemistry Chapters for thermo:', list.filter(c => /thermo/i.test(c.name)));
}

check();
