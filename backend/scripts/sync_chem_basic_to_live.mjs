// Sync Chemistry - Some Basic Concepts of Chemistry questions to live API (edvedum.com)
// 14 MCQs + 13 Assertion-Reason questions
// Code-based approach - no AI/Gemini model used

import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const ADMIN_EMAIL    = 'admin@edvedum.com';
const ADMIN_PASSWORD = 'Admin@12345';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const token = data.token || data.data?.token || data.accessToken;
  if (!token) throw new Error('No token found in response: ' + JSON.stringify(data));
  console.log('✅ Authenticated successfully to live API');
  return token;
}

async function getLiveChemistryQuestions(token) {
  console.log('Fetching live Chemistry questions to avoid duplicate insertion...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    console.warn(`Could not fetch live questions: ${res.status}`);
    return new Map();
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.questions || data.data || []);
  const map = new Map();
  for (const q of list) {
    if (q.question_text) {
      map.set(q.question_text.trim(), q.id);
    }
  }
  console.log(`Found ${list.length} existing Chemistry questions on live`);
  return map;
}

async function main() {
  console.log('🚀 Starting sync of "Some Basic Concepts of Chemistry" to Live API...');

  const token = await getToken();
  const liveMap = await getLiveChemistryQuestions(token);

  const localRes = await query(
    `SELECT * FROM question_bank WHERE chapter = 'Some Basic Concepts of Chemistry' ORDER BY id ASC`
  );
  console.log(`\nFound ${localRes.rows.length} local questions to sync (MCQ + AR)`);

  let insertedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;
  const liveCreatedIds = [];

  for (const q of localRes.rows) {
    const existingLiveId = liveMap.get(q.question_text.trim());
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Chemistry',
      chapter: 'Some Basic Concepts of Chemistry',
      chapter_id: 127,
      subject_id: 10,
      question_type: q.question_type,
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      topic: q.topic,
      difficulty: q.difficulty || 'medium',
      marks: q.marks || (isAR ? 4 : 1),
      status: 'available'
    };

    if (isAR) {
      payload.assertion_text = q.assertion_text;
      payload.reason_text = q.reason_text;
    }

    try {
      if (existingLiveId) {
        console.log(`Updating Live ID ${existingLiveId} [${q.question_type}]: "${q.question_text.substring(0, 45)}..."`);
        const putRes = await fetch(`${LIVE_API}/question-bank/${existingLiveId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!putRes.ok) throw new Error(`PUT ${putRes.status}: ${await putRes.text()}`);
        updatedCount++;
        liveCreatedIds.push(existingLiveId);
      } else {
        console.log(`Inserting New Live [${q.question_type}]: "${q.question_text.substring(0, 45)}..."`);
        const postRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!postRes.ok) throw new Error(`POST ${postRes.status}: ${await postRes.text()}`);
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id || resData.data?.id;
        console.log(`  -> Successfully created on Live with ID: ${newId}`);
        insertedCount++;
        if (newId) liveCreatedIds.push(newId);
      }
    } catch (err) {
      console.error(`  ❌ Error syncing question: ${err.message}`);
      errorCount++;
    }

    await sleep(150);
  }

  console.log(`\n========================================`);
  console.log(`Sync Summary:`);
  console.log(`  - Inserted: ${insertedCount}`);
  console.log(`  - Updated:  ${updatedCount}`);
  console.log(`  - Errors:   ${errorCount}`);
  console.log(`  - Live IDs: ${JSON.stringify(liveCreatedIds)}`);
  console.log(`========================================\n`);

  // Verify on Live
  console.log('Verifying on Live...');
  const vRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (vRes.ok) {
    const allLive = await vRes.json();
    const list = Array.isArray(allLive) ? allLive : (allLive.questions || allLive.data || []);
    const matching = list.filter(q => (q.chapter_name || q.chapter || '').toLowerCase().includes('basic concepts'));
    const arMatching = matching.filter(q => {
      const t = (q.question_type || '').toLowerCase();
      return t === 'assertion_reason' || t === 'assertion-reason' || Boolean(q.assertion_text && q.reason_text);
    });
    console.log(`✅ Live Verification Results:`);
    console.log(`   - Total in "Some Basic Concepts of Chemistry": ${matching.length}`);
    console.log(`   - Total Assertion-Reason questions: ${arMatching.length}`);
    console.log(`   - Total MCQs: ${matching.length - arMatching.length}`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
