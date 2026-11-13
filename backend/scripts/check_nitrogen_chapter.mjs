import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('--- Neon DB Chapters for Subject 10 (Chemistry) ---');
  const res = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 10 AND (LOWER(name) LIKE '%amine%' OR LOWER(name) LIKE '%nitrogen%') ORDER BY id"
  );
  console.log('Neon Nitrogen / Amines chapters:', res.rows);

  console.log('\n--- Live API Chapters for Subject 6 (Chemistry) ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chapRes = await fetch('https://edvedum.com/api/admin/subjects/6/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const list = chapData.chapters || chapData.data || [];
  const nitroChaps = list.filter(c => c.name.toLowerCase().includes('amine') || c.name.toLowerCase().includes('nitrogen'));
  console.log('Live Nitrogen / Amines chapters:', nitroChaps);

  await pool.end();
}

main().catch(console.error);

