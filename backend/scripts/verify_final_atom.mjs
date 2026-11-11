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

async function verify() {
  console.log('=== VERIFYING FINAL STRUCTURE OF ATOM PYQ DATASET ===\n');

  // 1. Local Neon DB
  const client = await pool.connect();
  let localCount = 0;
  try {
    const res = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 77 OR LOWER(chapter) LIKE '%structure of atom%')"
    );
    localCount = res.rows[0].count;
    console.log(`[Neon DB] Questions found: ${localCount} / 90`);

    const sample = await client.query(
      "SELECT id, question_text, options, correct_index, image_url FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 77 OR LOWER(chapter) LIKE '%structure of atom%') ORDER BY id ASC LIMIT 3"
    );
    console.log(`[Neon DB] Sample questions:`);
    sample.rows.forEach(r => {
      console.log(`  ID ${r.id}: "${r.question_text.slice(0, 60)}..." (Correct: ${r.correct_index}, Image: ${r.image_url || 'none'})`);
    });
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live API
  let liveCount = 0;
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveRes.ok) {
    const liveData = await liveRes.json();
    const qs = liveData.questions || liveData.data || [];
    const atomQs = qs.filter(q =>
      Number(q.chapter_id) === 96 ||
      Number(q.chapter_id) === 16 ||
      Number(q.chapter_id) === 77 ||
      /structure of atom/i.test(q.chapter || '') ||
      /structure of atom/i.test(q.chapter_name || '')
    );
    liveCount = atomQs.length;
    console.log(`\n[Live Platform] Questions found: ${liveCount} / 90`);
    console.log(`[Live Platform] Sample questions:`);
    atomQs.slice(0, 3).forEach(r => {
      console.log(`  ID ${r.id}: "${r.question_text.slice(0, 60)}..." (Correct: ${r.correct_index}, Image: ${r.image_url || 'none'})`);
    });
  }

  console.log('\n========================================================');
  if (localCount === 90 && liveCount === 90) {
    console.log('✅ ALL 90 QUESTIONS FULLY VERIFIED ON BOTH LOCAL DB & LIVE PLATFORM!');
    console.log('========================================================');
  } else {
    console.warn(`⚠️ Count check: Local=${localCount}/90, Live=${liveCount}/90`);
  }
}

verify().catch(console.error);
