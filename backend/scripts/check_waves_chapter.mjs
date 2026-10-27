import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonChaps = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND name ILIKE '%wave%'"
  );
  console.log('Neon DB wave chapters:', neonChaps.rows);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveChapsRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveChaps = (await liveChapsRes.json()).chapters || [];
  console.log('Live edvedum wave chapters:', liveChaps.filter(c => c.name.toLowerCase().includes('wave')));
  
  await pool.end();
}

check().catch(console.error);
