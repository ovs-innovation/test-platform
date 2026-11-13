import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  // Check Neon DB chapters for subject_id = 13 (Zoology)
  const neonRes = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 13 ORDER BY id");
  console.log('All Neon DB Zoology chapters:');
  for (const c of neonRes.rows) {
    console.log(`  id=${c.id}: "${c.name}"`);
  }

  // Check Live Server
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const liveChRes = await fetch('https://edvedum.com/api/admin/subjects/2/chapters', { headers });
  const liveData = await liveChRes.json();
  const liveChList = liveData.chapters || liveData;
  console.log('All Live Server Zoology chapters:');
  liveChList.forEach(c => console.log(`  id=${c.id}: "${c.name}"`));

  await pool.end();
}

check().catch(console.error);
