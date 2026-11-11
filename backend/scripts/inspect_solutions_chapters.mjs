import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const neonSolutions = await pool.query("SELECT * FROM chapters WHERE subject_id = 10 AND name ILIKE '%solution%'");
  console.log('Neon DB Solutions chapters (subject_id 10):');
  console.table(neonSolutions.rows);
  await pool.end();

  // Check Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const chData = await chRes.json();
  const liveChapters = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const liveSolutions = liveChapters.filter(c => /solution/i.test(c.name || c.chapter_name || ''));
  console.log('Live Platform Solutions chapters (subject_id 6):');
  console.table(liveSolutions);
}

main().catch(console.error);
