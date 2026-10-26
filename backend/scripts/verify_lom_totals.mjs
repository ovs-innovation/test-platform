import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  const neonRes = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'laws of motion' OR chapter_id = 36)"
  );
  console.log('Neon DB Laws of Motion Stats:', neonRes.rows[0]);

  // Login to edvedum.com
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  // Live edvedum check
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Physics&chapter_id=27&skip_cache=true', {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  if (liveRes.ok) {
    const data = await liveRes.json();
    const liveQs = data.questions || [];
    const withDiag = liveQs.filter(q => q.image_url && q.image_url.length > 0).length;
    console.log(`Live edvedum.com Chapter 27 (Laws of Motion): ${liveQs.length} questions total, ${withDiag} with diagrams.`);
  } else {
    console.log('Live fetch status:', liveRes.status);
  }

  await pool.end();
}

verify().catch(console.error);
