import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('================================================================');
  console.log('VERIFYING CHAPTER "Semiconductor Electronics" IN NEON DB & LIVE');
  console.log('================================================================\n');

  // 1. Check Neon DB
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const s = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics'");
    const subId = s.rows[0].id;

    const ch = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND name ILIKE '%Semiconductor%'", [subId]);
    console.log('Neon DB Chapter:', ch.rows);

    if (ch.rows.length > 0) {
      const qRes = await client.query(
        "SELECT COUNT(*) as count FROM question_bank WHERE chapter_id = $1 AND category = 'Physics'",
        [ch.rows[0].id]
      );
      console.log(`Neon DB Questions count for chapter ${ch.rows[0].id}: ${qRes.rows[0].count}`);

      const sample = await client.query(
        "SELECT id, question_text FROM question_bank WHERE chapter_id = $1 ORDER BY id ASC LIMIT 3",
        [ch.rows[0].id]
      );
      console.log('Neon DB Sample Questions:');
      sample.rows.forEach(r => console.log(`  [ID ${r.id}] ${r.question_text.slice(0, 60)}...`));
    }
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Check Live API
  console.log('\n--- Checking Live API edvedum.com ---');
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
  let liveChap = chaps.find(c => c.name.toLowerCase().includes('semiconductor'));
  console.log(`Live Chapter: ${liveChap?.name} (ID: ${liveChap?.id})`);

  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qbData = await qbRes.json();
  const allQs = qbData.questions || [];
  const semiQs = allQs.filter(q =>
    (liveChap?.id && q.chapter_id === liveChap.id) ||
    (q.chapter && q.chapter.toLowerCase().includes('semiconductor'))
  );

  console.log(`Total Physics Questions on edvedum.com: ${allQs.length}`);
  console.log(`Semiconductor Electronics Questions on edvedum.com: ${semiQs.length}`);
  if (semiQs.length > 0) {
    console.log('Live edvedum.com Sample:');
    semiQs.slice(0, 3).forEach(q => console.log(`  [ID ${q.id}] ${q.question_text.slice(0, 60)}...`));
  }
  console.log('\n================================================================');
}

verify().catch(console.error);
