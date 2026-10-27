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
  console.log('=== Step 1: Checking Neon DB ===');
  const neonRes = await pool.query(`
    SELECT id, question_text, chapter, image_url, correct_index, options
    FROM question_bank
    WHERE category = 'Physics' AND chapter = 'Waves'
    ORDER BY id ASC
  `);
  console.log(`Neon DB Total Waves Questions: ${neonRes.rows.length}`);
  const neonWithDiagrams = neonRes.rows.filter(r => r.image_url && r.image_url.trim().length > 0);
  console.log(`Neon DB Waves Questions with Diagrams: ${neonWithDiagrams.length}`);
  neonWithDiagrams.forEach(r => console.log(`  - Neon ID ${r.id}: ${r.image_url}`));

  console.log('\n=== Step 2: Checking Live edvedum.com ===');
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
  const allLive = liveData.questions || [];

  const liveWaves = allLive.filter(q => 
    q.chapter?.toLowerCase() === 'waves'
  );

  console.log(`Live edvedum.com Total Waves Questions: ${liveWaves.length}`);
  const liveWithDiagrams = liveWaves.filter(r => r.image_url && r.image_url.trim().length > 0);
  console.log(`Live edvedum.com Waves Questions with Diagrams: ${liveWithDiagrams.length}`);
  liveWithDiagrams.forEach(r => console.log(`  - Live ID ${r.id}: ${r.image_url}`));

  console.log('\n=== Step 3: Parity Verification ===');
  if (neonRes.rows.length === 176 && liveWaves.length === 176 && neonWithDiagrams.length === 13 && liveWithDiagrams.length === 13) {
    console.log('✅ PERFECT PARITY: Exactly 176 questions and 13 diagrams verified across both Neon DB and live edvedum.com!');
  } else {
    console.warn(`⚠️ Warning: Expected 176 questions, found Neon: ${neonRes.rows.length}, Live: ${liveWaves.length}`);
  }

  await pool.end();
}

verify().catch(console.error);
