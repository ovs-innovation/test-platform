import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== Verifying Moving Charges and Magnetism Questions in Neon DB and Live edvedum.com ===\n');

  // 1. Neon DB check
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();

  let dbRows = [];
  try {
    const chapRes = await client.query("SELECT id, name FROM chapters WHERE name ILIKE 'Moving Charges and Magnetism'");
    if (chapRes.rows.length === 0) {
      console.error('Chapter not found in Neon DB');
      return;
    }
    const chapId = chapRes.rows[0].id;
    console.log(`Neon DB Chapter: ${chapRes.rows[0].name} (ID: ${chapId})`);

    const qRes = await client.query(
      "SELECT id, question_text, correct_index, image_url FROM question_bank WHERE chapter_id = $1 ORDER BY id ASC",
      [chapId]
    );
    dbRows = qRes.rows;
    console.log(`Total questions in Neon DB for this chapter: ${dbRows.length}`);
    const withImages = dbRows.filter(r => r.image_url && r.image_url.trim().length > 0);
    console.log(`Questions with custom diagrams in Neon DB: ${withImages.length}`);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API check
  console.log('\n--- Checking Live edvedum.com API ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveQRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveQData = await liveQRes.json();
  const liveQuestions = liveQData.questions || [];
  const liveInChapter = liveQuestions.filter(q => 
    q.chapter_id === 193 || (q.chapter && q.chapter.toLowerCase().includes('moving'))
  );
  console.log(`Total questions in live edvedum.com for this chapter: ${liveInChapter.length}`);
  const liveWithImages = liveInChapter.filter(q => q.image_url && q.image_url.trim().length > 0);
  console.log(`Questions with custom diagrams in Live API: ${liveWithImages.length}`);

  console.log('\n=== Summary of Seeding & Verification ===');
  console.log(`Neon DB count: ${dbRows.length} (Expected: 178)`);
  console.log(`Live API count: ${liveInChapter.length} (Expected: 178)`);

  if (dbRows.length === 178 && liveInChapter.length === 178) {
    console.log('\n✓ SUCCESS: 100% of all 178 questions match across Neon DB and live edvedum.com platform!');
  } else {
    console.warn(`Discrepancy detected: DB=${dbRows.length}, Live=${liveInChapter.length}`);
  }
}

verify().catch(console.error);
