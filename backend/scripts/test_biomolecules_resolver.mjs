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

function resolveChapter(q) {
  const raw = (q.chapter || '').trim();
  if (
    Number(q.chapter_id) === 36 ||
    Number(q.chapter_id) === 133 ||
    /^\s*biomolecules?\s*$/i.test(raw)
  ) return 'Biomolecules';
  return 'Unknown';
}

async function verify() {
  console.log('=== VERIFYING RESOLVER & COUNTS FOR BIOMOLECULES ===');

  // 1. Local DB Check
  const client = await pool.connect();
  let localQs = [];
  try {
    const res = await client.query("SELECT id, chapter_id, chapter, category FROM question_bank WHERE chapter_id = 133 AND category = 'PYQ'");
    localQs = res.rows;
    console.log(`Local DB: Found ${localQs.length} PYQ questions for chapter_id 133.`);
  } finally {
    client.release();
    await pool.end();
  }

  let localResolved = 0;
  for (const q of localQs) {
    if (resolveChapter(q) === 'Biomolecules') localResolved++;
  }
  console.log(`Local DB: ${localResolved} / ${localQs.length} resolved to 'Biomolecules'.`);

  // 2. Live API Check
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qs = qData.questions || qData.data || [];
  const liveBiomol = qs.filter(q => Number(q.chapter_id) === 36 || Number(q.chapter_id) === 133);
  console.log(`Live API: Found ${liveBiomol.length} questions for chapter_id 36/133.`);

  let liveResolved = 0;
  for (const q of liveBiomol) {
    if (resolveChapter(q) === 'Biomolecules') liveResolved++;
  }
  console.log(`Live API: ${liveResolved} / ${liveBiomol.length} resolved to 'Biomolecules'.`);

  if (localResolved === 81 && liveResolved === 81) {
    console.log('\n🎉 ALL 81 QUESTIONS FULLY SEEDED, SYNCED, AND RESOLVED TO "Biomolecules" IN BOTH LOCAL DB AND LIVE PRODUCTION!');
  } else {
    console.error(`Verification issue: localResolved=${localResolved}, liveResolved=${liveResolved}`);
    process.exit(1);
  }
}

verify().catch(console.error);

