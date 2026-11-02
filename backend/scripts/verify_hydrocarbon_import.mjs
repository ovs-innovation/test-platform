import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_CHAPTER_ID = 168;
const LIVE_CHAPTER_ID = 164;
const CHAPTER_NAME = 'Hydrocarbons';

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

  // 1. Local Neon DB verification
  const localRes = await query(
    `SELECT question_type, count(*)::int AS count 
     FROM question_bank 
     WHERE chapter_id = $1 OR chapter = $2 
     GROUP BY question_type 
     ORDER BY question_type`,
    [LOCAL_CHAPTER_ID, CHAPTER_NAME]
  );
  console.log('Local Neon DB Question Bank Counts:');
  console.table(localRes.rows);

  const localTotal = localRes.rows.reduce((sum, r) => sum + r.count, 0);
  console.log(`Local Total: ${localTotal}`);

  // 2. Live Production verification
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.questions || liveData.data || [];
  const liveHydrocarbons = allLive.filter(
    q => q.chapter_id === LIVE_CHAPTER_ID || (q.chapter && q.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );

  const liveCounts = {};
  liveHydrocarbons.forEach(q => {
    const type = q.question_type || 'single_choice';
    liveCounts[type] = (liveCounts[type] || 0) + 1;
  });

  console.log(`\nLive Production Counts (Total: ${liveHydrocarbons.length}):`);
  console.table(liveCounts);

  // Check diagrams
  const withImages = liveHydrocarbons.filter(q => !!q.image_url);
  console.log(`Questions with Cloudinary diagrams on live: ${withImages.length}`);
}

verify().catch(console.error).finally(() => process.exit(0));

