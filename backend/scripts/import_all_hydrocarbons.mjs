import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';
import { HYDROCARBON_MCQ_BATCH1 } from './hydrocarbon_mcq_batch1.mjs';
import { HYDROCARBON_MCQ_BATCH2 } from './hydrocarbon_mcq_batch2.mjs';
import { HYDROCARBON_MCQ_BATCH3 } from './hydrocarbon_mcq_batch3.mjs';
import { HYDROCARBON_MCQ_BATCH4 } from './hydrocarbon_mcq_batch4.mjs';
import { HYDROCARBON_AR_BATCH } from './hydrocarbon_ar_batch.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 10;  // Chemistry
const LOCAL_CHAPTER_ID = 168; // Hydrocarbons

const LIVE_SUBJECT_ID = 6;    // Chemistry
const LIVE_CHAPTER_ID = 164;  // Hydrocarbons

const CHAPTER_NAME = 'Hydrocarbons';
const CATEGORY_NAME = 'Chemistry';

const mapFile = path.resolve(__dirname, './hydrocarbons_cloudinary_map.json');
let cloudinaryMap = {};
if (fs.existsSync(mapFile)) {
  try {
    cloudinaryMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  } catch {
    cloudinaryMap = {};
  }
}

const RAW_QUESTIONS = [
  ...HYDROCARBON_MCQ_BATCH1,
  ...HYDROCARBON_MCQ_BATCH2,
  ...HYDROCARBON_MCQ_BATCH3,
  ...HYDROCARBON_MCQ_BATCH4,
  ...HYDROCARBON_AR_BATCH
];

const ALL_QUESTIONS = RAW_QUESTIONS.map(q => {
  const options = (q.options || []).map(o => (typeof o === 'string' ? o : o.text));
  const correct_index = typeof q.correct_index === 'number'
    ? q.correct_index
    : (parseInt(q.correct_answer, 10) - 1);
  const diagramKey = q.diagram_url || q.image_url || null;
  const image_url = (diagramKey && cloudinaryMap[diagramKey]) ? cloudinaryMap[diagramKey] : diagramKey;

  return {
    question_text: q.question_text,
    options,
    correct_index,
    solution: q.solution || q.explanation || '',
    image_url,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    marks: 4,
    difficulty: q.difficulty || 'medium',
    question_type: q.question_type || 'single_choice',
    status: 'available'
  };
});

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

function normalizeText(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log(`=== Starting Import of ${ALL_QUESTIONS.length} Questions for "${CHAPTER_NAME}" ===\n`);

  // -------------------------------------------------------------
  // 1. LOCAL NEON DB IMPORT
  // -------------------------------------------------------------
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  
  const existingLocalRes = await query(
    `SELECT id, question_text FROM question_bank WHERE chapter_id = $1 OR chapter = $2`,
    [LOCAL_CHAPTER_ID, CHAPTER_NAME]
  );
  const existingLocal = existingLocalRes.rows;
  console.log(`Found ${existingLocal.length} existing "${CHAPTER_NAME}" questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of ALL_QUESTIONS) {
    const qNorm = normalizeText(q.question_text);
    const exists = existingLocal.some(row => normalizeText(row.question_text) === qNorm);

    if (exists) {
      localSkipped++;
      continue;
    }

    await query(
      `INSERT INTO question_bank (
        category,
        subject,
        chapter,
        chapter_id,
        subject_id,
        question_text,
        options,
        correct_index,
        solution,
        image_url,
        topic,
        difficulty,
        marks,
        question_type,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        q.category,
        q.subject,
        q.chapter,
        LOCAL_CHAPTER_ID,
        LOCAL_SUBJECT_ID,
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.image_url,
        q.topic,
        q.difficulty,
        q.marks,
        q.question_type,
        q.status
      ]
    );
    localInserted++;
  }

  console.log(`Local Neon DB: Inserted ${localInserted}, Skipped ${localSkipped} duplicates.\n`);

  // -------------------------------------------------------------
  // 2. LIVE PRODUCTION IMPORT
  // -------------------------------------------------------------
  console.log('--- 2. Importing to Live Production (edvedum.com) ---');
  const token = await getToken();
  if (!token) {
    console.error('Failed to obtain live token! Aborting live import.');
    return;
  }
  console.log('Successfully authenticated with Live API.');

  // Fetch existing questions on live to avoid duplication
  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveChemQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveHydrocarbons = allLiveChemQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('hydrocarbon'))
  );
  console.log(`Found ${existingLiveHydrocarbons.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLiveHydrocarbons.some(row => normalizeText(row.question_text) === qNorm);

    if (exists) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: q.category,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      marks: q.marks,
      difficulty: q.difficulty,
      image_url: q.image_url,
      status: q.status,
      subject_id: LIVE_SUBJECT_ID,
      chapter_id: LIVE_CHAPTER_ID
    };

    try {
      const res = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        liveInserted++;
        if ((i + 1) % 20 === 0 || i === ALL_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${ALL_QUESTIONS.length} processed (${liveInserted} inserted)`);
        }
      } else {
        const errText = await res.text();
        console.error(`Live insert failed for Q#${i + 1}: ${res.status} - ${errText}`);
        liveFailed++;
      }
    } catch (e) {
      console.error(`Live insert network error for Q#${i + 1}:`, e.message);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);
  console.log('\n=== Hydrocarbons Import Complete! ===');
}

run().catch(console.error).finally(() => process.exit(0));
