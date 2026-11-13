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
  const neonRes = await pool.query("SELECT count(*) FROM question_bank WHERE subject = 'Zoology' AND (chapter = 'Evolution' OR chapter_id = 214)");
  console.log('Neon DB question_bank existing Evolution count:', neonRes.rows[0].count);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const liveRes = await fetch('https://edvedum.com/api/admin/questions?subject_id=2&chapter_id=212&limit=100', { headers });
  const liveData = await liveRes.json();
  console.log('Live Server existing Evolution count:', liveData.total || (liveData.questions ? liveData.questions.length : 0));

  await pool.end();
}

check().catch(console.error);
