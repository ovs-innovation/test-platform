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
  const res = await pool.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 ORDER BY id");
  console.log('Neon Chapters:');
  for (const row of res.rows) {
    console.log(`[Neon] ID: ${row.id} -> ${row.name}`);
  }

  const countRes = await pool.query("SELECT count(id) FROM question_bank WHERE LOWER(chapter) LIKE '%alcohol%' OR LOWER(chapter) LIKE '%phenol%'");
  console.log('Neon Q count for alcohol:', countRes.rows[0]);

  try {
    const loginRes = await fetch('https://edvedum.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    for (const cid of [81, 101]) {
      const qRes = await fetch(`https://edvedum.com/api/admin/questions?category=PYQ&subject_id=6&chapter_id=${cid}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const qData = await qRes.json();
      console.log(`Live Q for ${cid}:`, Object.keys(qData), qData.pagination || qData.total || (qData.data ? qData.data.length : ''));
    }
  } catch (e) {
    console.error('Error:', e.message);
  }

  await pool.end();
}

main();
