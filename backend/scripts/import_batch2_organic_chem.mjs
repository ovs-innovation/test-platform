import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';
import { ORGANIC_MCQ_BATCH5 } from './organic_chem_mcq_batch5.mjs';
import { ORGANIC_MCQ_BATCH6 } from './organic_chem_mcq_batch6.mjs';
import { ORGANIC_MCQ_BATCH7 } from './organic_chem_mcq_batch7.mjs';
import { ORGANIC_AR_BATCH2 } from './organic_chem_ar_batch2.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 10;  // Chemistry
const LOCAL_CHAPTER_ID = 167; // Organic Chemistry - Some Basic Principles and Techniques

const LIVE_SUBJECT_ID = 6;    // Chemistry
const LIVE_CHAPTER_ID = 249;  // Organic Chemistry - Some Basic Principles and Techniques

const CHAPTER_NAME = 'Organic Chemistry - Some Basic Principles and Techniques';
const CATEGORY_NAME = 'Chemistry';

const mapFile = path.resolve(__dirname, './organic_cloudinary_map.json');
let cloudinaryMap = {};
if (fs.existsSync(mapFile)) {
  try {
    cloudinaryMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  } catch {
    cloudinaryMap = {};
  }
}

const RAW_QUESTIONS = [
  ...ORGANIC_MCQ_BATCH5,
  ...ORGANIC_MCQ_BATCH6,
  ...ORGANIC_MCQ_BATCH7,
  ...ORGANIC_AR_BATCH2
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
  console.log(`=== Starting Batch 2 Import of ${ALL_QUESTIONS.length} Questions for "${CHAPTER_NAME}" ===\n`);

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
  console.log(`Local DB completed: ${localInserted} inserted, ${localSkipped} skipped (already present).\n`);

  // -------------------------------------------------------------
  // 2. LIVE PRODUCTION IMPORT
  // -------------------------------------------------------------
  console.log('--- 2. Syncing to Live Production (https://edvedum.com) ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained Live auth token.');

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=${CATEGORY_NAME}&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.data?.questions || liveData.questions || [];
  
  const chapterLive = allLive.filter(lq => 
    Number(lq.chapter_id) === LIVE_CHAPTER_ID ||
    (lq.chapter && lq.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );
  console.log(`Found ${chapterLive.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveErrors = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);

    const isDup = chapterLive.some(lq => normalizeText(lq.question_text || '') === qNorm);

    if (isDup) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: q.category,
      subject: q.subject,
      subject_id: LIVE_SUBJECT_ID,
      chapter: q.chapter,
      chapter_id: LIVE_CHAPTER_ID,
      topic: q.topic,
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url,
      marks: q.marks,
      difficulty: q.difficulty,
      question_type: q.question_type,
      status: q.status
    };

    try {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!postRes.ok) {
        const errText = await postRes.text();
        console.error(`Live POST failed for Q${i + 1}: ${postRes.status} ${errText}`);
        liveErrors++;
      } else {
        liveInserted++;
      }
    } catch (err) {
      console.error(`Network error on Q${i + 1}:`, err.message);
      liveErrors++;
    }
  }

  console.log(`\nLive Production completed: ${liveInserted} inserted, ${liveSkipped} skipped, ${liveErrors} errors.\n`);
  console.log('=== All Batch 2 Questions Processed Successfully ===');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

