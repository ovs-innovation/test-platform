import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LIVE_CREDS = {
  email: 'admin@edvedum.com',
  password: 'Admin@12345'
};

const CHAPTER_NAME = 'The p-Block Elements (Gr. 13 & 14)';
const LOCAL_CHAPTER_ID = 166;
const LIVE_CHAPTER_ID = 247;

async function verify() {
  console.log(`=== Verifying "${CHAPTER_NAME}" Import ===\n`);

  // 1. Local Neon DB Check
  console.log('--- 1. Local Neon DB Status ---');
  try {
    const localRes = await query(`
      SELECT 
        question_type,
        marks,
        COUNT(*) as count
      FROM question_bank
      WHERE chapter_id = $1 OR chapter = $2
      GROUP BY question_type, marks
      ORDER BY question_type
    `, [LOCAL_CHAPTER_ID, CHAPTER_NAME]);
    console.table(localRes.rows);

    const totalLocal = await query(`
      SELECT COUNT(*) as total FROM question_bank
      WHERE chapter_id = $1 OR chapter = $2
    `, [LOCAL_CHAPTER_ID, CHAPTER_NAME]);
    console.log(`Total questions in Local DB: ${totalLocal.rows[0].total}`);
  } catch (err) {
    console.error('Local DB check error:', err.message);
  }

  // 2. Live Production Check
  console.log('\n--- 2. Live Production Status ---');
  try {
    const authRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(LIVE_CREDS)
    });
    const authData = await authRes.json();
    const token = authData.token || authData.data?.token || authData.accessToken;
    if (!token) throw new Error('Could not authenticate with Live API');

    const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=4000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveData = await liveRes.json();
    const allLive = liveData.data?.questions || liveData.questions || [];

    const chapterLive = allLive.filter(q => 
      Number(q.chapter_id) === LIVE_CHAPTER_ID || 
      (q.chapter && q.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
    );

    console.log(`Total questions on Live Production for "${CHAPTER_NAME}": ${chapterLive.length}`);

    const typeCounts = {};
    const marksCounts = {};
    for (const q of chapterLive) {
      typeCounts[q.question_type] = (typeCounts[q.question_type] || 0) + 1;
      marksCounts[q.marks] = (marksCounts[q.marks] || 0) + 1;
    }
    console.log('Live question types breakdown:', typeCounts);
    console.log('Live marks breakdown:', marksCounts);

  } catch (err) {
    console.error('Live check error:', err.message);
  }
  process.exit(0);
}

verify();

