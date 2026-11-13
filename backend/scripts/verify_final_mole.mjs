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
  console.log('=== VERIFYING FINAL SOME BASIC CONCEPTS OF CHEMISTRY PYQ DATASET ===\n');

  // 1. Local Neon DB
  const client = await pool.connect();
  let localCount = 0;
  try {
    const res = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 127 OR LOWER(chapter) LIKE '%some basic concept%')"
    );
    localCount = res.rows[0].count;
    console.log(`[Neon DB] Questions found: ${localCount} / 84`);

    const sample = await client.query(
      "SELECT id, question_text, options, correct_index, solution FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 127 OR LOWER(chapter) LIKE '%some basic concept%') ORDER BY id ASC LIMIT 3"
    );
    console.log(`[Neon DB] Sample questions:`);
    sample.rows.forEach(r => {
      console.log(`  ID ${r.id}: "${r.question_text.slice(0, 60)}..." (Correct: ${r.correct_index})`);
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
    const moleQs = qs.filter(q =>
      Number(q.chapter_id) === 223 ||
      Number(q.chapter_id) === 95 ||
      Number(q.chapter_id) === 127 ||
      /some basic concept/i.test(q.chapter || '') ||
      /some basic concept/i.test(q.chapter_name || '')
    );
    liveCount = moleQs.length;
    console.log(`\n[Live Platform] Questions found: ${liveCount} / 84`);
    console.log(`[Live Platform] Sample questions:`);
    moleQs.slice(0, 3).forEach(r => {
      console.log(`  ID ${r.id}: "${r.question_text.slice(0, 60)}..." (Correct: ${r.correct_index})`);
    });
  }

  console.log('\n========================================================');
  if (localCount === 84 && liveCount === 84) {
    console.log('✅ ALL 84 QUESTIONS FULLY VERIFIED ON BOTH LOCAL DB & LIVE PLATFORM!');
    console.log('========================================================');
  } else {
    console.warn(`⚠️ Count check: Local=${localCount}/84, Live=${liveCount}/84`);
  }
}

verify().catch(console.error);

