import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  console.log('=== Checking Neon DB for Chemistry Chapters ===');
  const neonSubs = await pool.query("SELECT id, name FROM subjects");
  console.log('Neon Subjects:', neonSubs.rows);

  // Chemistry in Neon
  const neonChaps = await pool.query(
    "SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%organic%' OR name ILIKE '%basic%' ORDER BY id"
  );
  console.log('Neon Organic/Basic Chapters:', neonChaps.rows);

  console.log('\n=== Checking Live edvedum.com for Chemistry Chapters ===');
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
  console.log('Live Subjects:', subs);

  const chemSub = subs.find(s => s.name.toLowerCase() === 'chemistry');
  if (chemSub) {
    const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${chemSub.id}/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chaps = (await chapsRes.json()).chapters || [];
    const related = chaps.filter(c => c.name.toLowerCase().includes('organic') || c.name.toLowerCase().includes('basic'));
    console.log(`Live Chemistry (Subject ID ${chemSub.id}) Organic/Basic Chapters:`, related);
  }

  // Also check CHEMISTRY_STANDARD_11 or existing questions in JEE Chemistry
  const qRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qData = await qRes.json();
  const allQ = qData.questions || [];
  console.log(`Total Live JEE Chemistry questions currently: ${allQ.length}`);
  const chapCounts = {};
  allQ.forEach(q => {
    chapCounts[q.chapter] = (chapCounts[q.chapter] || 0) + 1;
  });
  console.log('Current chapter breakdown in Live JEE Chemistry:', chapCounts);

  await pool.end();
}

check().catch(console.error);
