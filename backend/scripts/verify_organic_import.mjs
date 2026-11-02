import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Organic Chemistry - Some Basic Principles and Techniques';
const LOCAL_CHAPTER_ID = 167;
const LIVE_CHAPTER_ID = 249;

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function verify() {
  console.log(`=== Verifying Import for "${CHAPTER_NAME}" ===\n`);

  // 1. Local Neon DB
  const localRes = await query(
    `SELECT question_type, count(*)::int as count 
     FROM question_bank 
     WHERE chapter_id = $1 OR chapter = $2 
     GROUP BY question_type`,
    [LOCAL_CHAPTER_ID, CHAPTER_NAME]
  );
  console.log('Local Neon DB Question Bank Counts:');
  console.table(localRes.rows);

  // 2. Live API
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.data?.questions || liveData.questions || [];

  const chapterLive = allLive.filter(q =>
    Number(q.chapter_id) === LIVE_CHAPTER_ID ||
    (q.chapter && q.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );

  const liveByType = {};
  for (const q of chapterLive) {
    const t = q.question_type || 'single_choice';
    liveByType[t] = (liveByType[t] || 0) + 1;
  }
  console.log(`Live Production Counts (Total: ${chapterLive.length}):`);
  console.table(liveByType);

  process.exit(0);
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});

