import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const chapRes = await pool.query("SELECT id, name FROM chapters WHERE subject_id = 11 ORDER BY name");
  console.log('Neon DB Physics Chapters:', chapRes.rows.map(r => `${r.id}: ${r.name}`));

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (loginRes.ok) {
    const token = (await loginRes.json()).token;
    const subsRes = await fetch('https://edvedum.com/api/admin/subjects', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const subs = (await subsRes.json()).subjects || [];
    const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
    if (physicsSub) {
      const chapsRes = await fetch(`https://edvedum.com/api/admin/subjects/${physicsSub.id}/chapters`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const chaps = (await chapsRes.json()).chapters || [];
      console.log('Live edvedum.com Physics Chapters:', chaps.map(c => `${c.id}: ${c.name}`));
    }
  }

  await pool.end();
}

check().catch(console.error);
