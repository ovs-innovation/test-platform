import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('========================================================');
  console.log('  FINAL VERIFICATION: RAY OPTICS');
  console.log('========================================================\n');

  // 1. Verify Local Neon DB
  console.log('--- 1. Local Neon Database Verification ---');
  const localRes = await pool.query(`
    SELECT count(*)::int as count 
    FROM question_bank 
    WHERE category = 'PYQ' AND (LOWER(chapter) = 'ray optics' OR chapter_id = 202)
  `);
  console.log(`Local DB Ray Optics Question Count: ${localRes.rows[0].count} / 114`);

  const localDiagRes = await pool.query(`
    SELECT count(*)::int as count 
    FROM question_bank 
    WHERE category = 'PYQ' AND (LOWER(chapter) = 'ray optics' OR chapter_id = 202) AND image_url IS NOT NULL
  `);
  console.log(`Local DB Ray Optics Diagram Count: ${localDiagRes.rows[0].count} / 15`);

  // 2. Verify Live Platform API
  console.log('\n--- 2. Live Platform (edvedum.com) Verification ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=2000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || qData.data || [];
    const roQuestions = questions.filter(q => /ray\s*optics/i.test(q.chapter || '') || /ray\s*optics/i.test(q.chapter_name || '') || q.chapter_id === 198);
    console.log(`Live Platform Ray Optics Question Count: ${roQuestions.length} / 114`);

    const roDiag = roQuestions.filter(q => q.image_url);
    console.log(`Live Platform Ray Optics Diagram Count: ${roDiag.length} / 15`);
  } catch (err) {
    console.error('Error fetching live questions:', err.message);
  }

  await pool.end();
}

main().catch(console.error);

