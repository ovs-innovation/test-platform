import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  console.log('=== CHECKING NEON DB ===');
  const neonSubjects = await pool.query("SELECT * FROM subjects ORDER BY id");
  console.log('Neon Subjects:', neonSubjects.rows.map(s => ({ id: s.id, name: s.name })));
  
  const zNeon = neonSubjects.rows.find(s => s.name.toLowerCase().includes('zool'));
  if (zNeon) {
    const neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = $1 ORDER BY id", [zNeon.id]);
    console.log(`Neon Chapters for ${zNeon.name} (id ${zNeon.id}):`, neonCh.rows.map(c => ({ id: c.id, name: c.name })));
  }

  console.log('\n=== CHECKING LIVE SERVER ===');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const subRes = await fetch('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const subData = await subRes.json();
  console.log('Live Subjects:', (subData.subjects || []).map(s => ({ id: s.id, name: s.name })));

  const zLive = (subData.subjects || []).find(s => s.name.toLowerCase().includes('zool'));
  if (zLive) {
    const chRes = await fetch(`https://edvedum.com/api/admin/subjects/${zLive.id}/chapters`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const chData = await chRes.json();
    console.log(`Live Chapters for ${zLive.name} (id ${zLive.id}):`, (chData.chapters || []).map(c => ({ id: c.id, name: c.name })));
  }

  await pool.end();
}

check().catch(console.error);

