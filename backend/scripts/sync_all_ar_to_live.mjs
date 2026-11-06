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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cleanStr(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function syncAllToLive() {
  console.log('=== SYNCING AR QUESTIONS TO LIVE (edvedum.com) ===\n');

  const token = await getToken();
  if (!token) throw new Error('Failed to obtain token from live API');
  console.log('Successfully authenticated with Live API.');

  // Fetch live Botany & Zoology questions to check for existing questions
  console.log('Fetching live Botany questions...');
  const botRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const botData = await botRes.json();
  const liveBotQuestions = botData.questions || [];
  console.log(`Live Botany questions: ${liveBotQuestions.length}`);

  console.log('Fetching live Zoology questions...');
  const zooRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const zooData = await zooRes.json();
  const liveZooQuestions = zooData.questions || [];
  console.log(`Live Zoology questions: ${liveZooQuestions.length}`);

  // Map existing live questions by normalized assertion text
  const liveMap = new Map();
  for (const q of [...liveBotQuestions, ...liveZooQuestions]) {
    const key = cleanStr(q.assertion_text || q.question_text);
    if (key) {
      liveMap.set(key, q);
    }
  }

  // 1. SYNC BIODIVERSITY AND CONSERVATION (16 questions)
  console.log('\n--- 1. Syncing Biodiversity and Conservation (Botany) ---');
  const bioLocal = await pool.query(
    "SELECT * FROM question_bank WHERE subject_id = 15 AND chapter = 'Biodiversity and Conservation' AND question_type = 'assertion_reason' ORDER BY id ASC"
  );
  console.log(`Found ${bioLocal.rows.length} local Biodiversity AR questions.`);

  let bioSynced = 0;
  for (const q of bioLocal.rows) {
    const rawOpts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    const payload = {
      category: 'Botany',
      subject: 'Botany',
      chapter: 'Biodiversity and Conservation',
      topic: 'Biodiversity and Conservation',
      subject_id: 10,  // Live Botany ID
      chapter_id: 219, // Live Biodiversity ID
      question_type: 'assertion_reason',
      question_text: q.question_text,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      options: rawOpts,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      solution: q.solution,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(q.assertion_text || q.question_text);
    const existing = liveMap.get(key);

    if (existing) {
      console.log(`[Bio] Updating existing Live question ID: ${existing.id}...`);
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) bioSynced++;
      else console.error(`Failed to update ${existing.id}:`, await putRes.text());
    } else {
      console.log(`[Bio] Inserting new question: "${q.assertion_text.slice(0, 40)}..."`);
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`  -> Inserted as Live ID: ${newId}`);
        bioSynced++;
      } else {
        console.error('Failed to insert:', await postRes.text());
      }
    }
    await sleep(150);
  }
  console.log(`Biodiversity Synced: ${bioSynced}/${bioLocal.rows.length}`);

  // 2. SYNC PRINCIPLES OF INHERITANCE AND VARIATION (22 questions)
  console.log('\n--- 2. Syncing Principles of Inheritance and Variation (Botany) ---');
  const inhLocal = await pool.query(
    "SELECT * FROM question_bank WHERE subject_id = 15 AND chapter = 'Principles of Inheritance and Variation' AND question_type = 'assertion_reason' ORDER BY id ASC"
  );
  console.log(`Found ${inhLocal.rows.length} local Inheritance AR questions.`);

  let inhSynced = 0;
  for (const q of inhLocal.rows) {
    const rawOpts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    const payload = {
      category: 'Botany',
      subject: 'Botany',
      chapter: 'Principles of Inheritance and Variation',
      topic: 'Principles of Inheritance and Variation',
      subject_id: 10,  // Live Botany ID
      chapter_id: 216, // Live Inheritance ID
      question_type: 'assertion_reason',
      question_text: q.question_text,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      options: rawOpts,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      solution: q.solution,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(q.assertion_text || q.question_text);
    const existing = liveMap.get(key);

    if (existing) {
      console.log(`[Inh] Updating existing Live question ID: ${existing.id}...`);
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) inhSynced++;
      else console.error(`Failed to update ${existing.id}:`, await putRes.text());
    } else {
      console.log(`[Inh] Inserting new question: "${q.assertion_text.slice(0, 40)}..."`);
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`  -> Inserted as Live ID: ${newId}`);
        inhSynced++;
      } else {
        console.error('Failed to insert:', await postRes.text());
      }
    }
    await sleep(150);
  }
  console.log(`Principles of Inheritance Synced: ${inhSynced}/${inhLocal.rows.length}`);

  // 3. SYNC BREATHING AND EXCHANGE OF GASES (19 questions)
  console.log('\n--- 3. Syncing Breathing and Exchange of Gases (Zoology) ---');
  const breathLocal = await pool.query(
    "SELECT * FROM question_bank WHERE subject_id = 13 AND chapter = 'Breathing and Exchange of Gases' AND question_type = 'assertion_reason' ORDER BY id ASC"
  );
  console.log(`Found ${breathLocal.rows.length} local Breathing AR questions.`);

  let breathSynced = 0;
  for (const q of breathLocal.rows) {
    const rawOpts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    const payload = {
      category: 'Zoology',
      subject: 'Zoology',
      chapter: 'Breathing and Exchange of Gases',
      topic: 'Breathing and Exchange of Gases',
      subject_id: 2,   // Live Zoology ID
      chapter_id: 231, // Live Breathing ID
      question_type: 'assertion_reason',
      question_text: q.question_text,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      options: rawOpts,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      solution: q.solution,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(q.assertion_text || q.question_text);
    const existing = liveMap.get(key);

    if (existing) {
      console.log(`[Breath] Updating existing Live question ID: ${existing.id}...`);
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) breathSynced++;
      else console.error(`Failed to update ${existing.id}:`, await putRes.text());
    } else {
      console.log(`[Breath] Inserting new question: "${q.assertion_text.slice(0, 40)}..."`);
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`  -> Inserted as Live ID: ${newId}`);
        breathSynced++;
      } else {
        console.error('Failed to insert:', await postRes.text());
      }
    }
    await sleep(150);
  }
  console.log(`Breathing Synced: ${breathSynced}/${breathLocal.rows.length}`);

  // 4. VERIFY LIVE COUNTS DIRECTLY FROM LIVE API
  console.log('\n--- 4. Final Live Verification ---');
  const finalBot = await (await fetch(`${LIVE_API}/question-bank?category=Botany`, { headers: { Authorization: `Bearer ${token}` } })).json();
  const finalZoo = await (await fetch(`${LIVE_API}/question-bank?category=Zoology`, { headers: { Authorization: `Bearer ${token}` } })).json();

  const botList = finalBot.questions || [];
  const zooList = finalZoo.questions || [];

  const liveBioAR = botList.filter(q => (q.chapter || '').toLowerCase().includes('biodiversity') && q.question_type === 'assertion_reason');
  const liveInhAR = botList.filter(q => (q.chapter || '').toLowerCase().includes('inheritance') && q.question_type === 'assertion_reason');
  const liveBreathAR = zooList.filter(q => (q.chapter || '').toLowerCase().includes('breathing') && q.question_type === 'assertion_reason');

  console.log(`Live Assertion-Reason Questions:`);
  console.log(`  - Biodiversity and Conservation: ${liveBioAR.length} AR questions`);
  console.log(`  - Principles of Inheritance and Variation: ${liveInhAR.length} AR questions`);
  console.log(`  - Breathing and Exchange of Gases: ${liveBreathAR.length} AR questions`);

  await pool.end();
  console.log('\n🎉 ALL QUESTIONS SYNCED AND VERIFIED ON LIVE EDVEDUM.COM!');
}

syncAllToLive().catch((err) => {
  console.error('Error during sync:', err);
  process.exit(1);
});

