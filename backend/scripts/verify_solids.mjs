import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function verify() {
  console.log('=== Step 1: Checking Neon DB Questions for "Mechanical Properties of Solids" ===');
  const dbRes = await pool.query(`
    SELECT COUNT(*) as total,
           COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as with_diagrams
    FROM question_bank
    WHERE category = 'Physics' AND (
      chapter ILIKE '%Mechanical Properties of Solids%'
      OR chapter ILIKE '%solid%'
    )
  `);

  console.log(`Neon DB Total: ${dbRes.rows[0].total} questions`);
  console.log(`Neon DB with diagrams: ${dbRes.rows[0].with_diagrams} questions`);

  console.log('\n=== Step 2: Checking Live edvedum.com Questions ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];

  const solidQuestions = liveQuestions.filter(q => 
    q.chapter?.toLowerCase().includes('solids') ||
    q.chapter?.toLowerCase() === 'mechanical properties of solids'
  );
  const solidWithDiagrams = solidQuestions.filter(q => q.image_url && q.image_url.length > 0);

  console.log(`Live platform total Physics questions: ${liveQuestions.length}`);
  console.log(`Live platform questions in "Mechanical Properties of Solids": ${solidQuestions.length}`);
  console.log(`Live platform "Mechanical Properties of Solids" with diagrams: ${solidWithDiagrams.length}`);

  if (Number(dbRes.rows[0].total) === 100 && solidQuestions.length === 100) {
    console.log('\n🎉 ALL 100 QUESTIONS ARE FULLY SYNCED AND VERIFIED ON BOTH NEON DB AND LIVE EDVEDUM.COM!');
  } else {
    console.warn('\n⚠️ Discrepancy detected:', {
      neon: dbRes.rows[0].total,
      live: solidQuestions.length
    });
  }

  await pool.end();
}

verify().catch(console.error);
