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
  console.log('=== Step 1: Checking Neon Database ===');
  const neonRes = await pool.query(`
    SELECT count(*) as total,
           count(image_url) as with_images
    FROM question_bank
    WHERE category = 'Physics' AND chapter = 'Thermal Properties of Matter'
  `);
  console.log('Neon DB Stats:', neonRes.rows[0]);

  const neonChap = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND name = 'Thermal Properties of Matter'"
  );
  console.log('Neon Chapter:', neonChap.rows[0]);

  console.log('\n=== Step 2: Checking Live edvedum.com Database ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  const liveChap = chaps.find(c => c.name.toLowerCase() === 'thermal properties of matter');
  console.log('Live Chapter:', liveChap);

  const qRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qData = await qRes.json();
  const allQuestions = qData.questions || [];

  const matchedByChapId = allQuestions.filter(q => liveChap && q.chapter_id === liveChap.id);
  const matchedByChapName = allQuestions.filter(q => q.chapter?.toLowerCase() === 'thermal properties of matter');

  console.log(`Live matched by chapter_id (${liveChap?.id}):`, matchedByChapId.length);
  console.log(`Live matched by chapter name:`, matchedByChapName.length);

  const withImages = matchedByChapName.filter(q => q.image_url && q.image_url.length > 0);
  console.log(`Live questions with diagram image_url:`, withImages.length);

  console.log('\n=== Step 3: Parity Verification ===');
  const neonCount = parseInt(neonRes.rows[0].total, 10);
  const liveCount = matchedByChapName.length;
  if (neonCount === 195 && liveCount === 195 && matchedByChapId.length === 195) {
    console.log('🎉 100% PARITY ACHIEVED! Both Neon DB and live edvedum.com have exactly 195 questions in "Thermal Properties of Matter"!');
  } else {
    console.warn(`Discrepancy: Neon=${neonCount}, LiveName=${liveCount}, LiveId=${matchedByChapId.length}`);
  }

  await pool.end();
}

verify().catch(console.error);
