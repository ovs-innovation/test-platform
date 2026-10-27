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
  console.log('====================================================');
  console.log(' VERIFYING CHAPTER: MECHANICAL PROPERTIES OF FLUIDS');
  console.log('====================================================\n');

  // 1. Neon DB Check
  const neonRes = await pool.query(`
    SELECT id, question_text, image_url, topic, difficulty, marks
    FROM question_bank
    WHERE category = 'Physics' AND (
      chapter ILIKE '%Mechanical Properties of Fluids%'
      OR (chapter ILIKE '%fluid%' AND chapter NOT ILIKE '%solid%')
    )
    ORDER BY id ASC
  `);

  const neonWithDiagrams = neonRes.rows.filter(r => r.image_url && r.image_url.trim() !== '');
  console.log(`[Neon DB] Total Questions: ${neonRes.rows.length}`);
  console.log(`[Neon DB] Questions with Diagrams: ${neonWithDiagrams.length}`);
  if (neonRes.rows.length > 0) {
    console.log(`[Neon DB] ID Range: ${neonRes.rows[0].id} - ${neonRes.rows[neonRes.rows.length - 1].id}`);
  }

  // 2. edvedum.com Check
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

  const liveFluids = allLive.filter(q => 
    q.chapter_id === 28 ||
    (q.chapter && q.chapter.toLowerCase().includes('fluid') && !q.chapter.toLowerCase().includes('solid'))
  );

  const liveWithDiagrams = liveFluids.filter(q => q.image_url && q.image_url.trim() !== '');
  console.log(`\n[edvedum.com Live] Total Questions in Chapter: ${liveFluids.length}`);
  console.log(`[edvedum.com Live] Questions with Diagrams: ${liveWithDiagrams.length}`);
  if (liveFluids.length > 0) {
    console.log(`[edvedum.com Live] ID Range: ${liveFluids[0].id} - ${liveFluids[liveFluids.length - 1].id}`);
  }

  console.log('\n====================================================');
  if (neonRes.rows.length === 219 && liveFluids.length === 219 && neonWithDiagrams.length === 44 && liveWithDiagrams.length === 44) {
    console.log('✅ ALL CHECKS PASSED: 100% PARITY ACHIEVED ACROSS BOTH DATABASES (219/219 Questions, 44/44 Diagrams)');
  } else {
    console.log(`⚠️ Review counts: Neon DB = ${neonRes.rows.length} (Diagrams: ${neonWithDiagrams.length}), Live = ${liveFluids.length} (Diagrams: ${liveWithDiagrams.length})`);
  }
  console.log('====================================================');

  await pool.end();
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
