import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

import { ELECTROCHEMISTRY_PART1 } from './electrochemistry_data_part1.mjs';
import { ELECTROCHEMISTRY_PART2 } from './electrochemistry_data_part2.mjs';
import { ELECTROCHEMISTRY_PART3 } from './electrochemistry_data_part3.mjs';
import { ELECTROCHEMISTRY_PART4 } from './electrochemistry_data_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[$,\\{}]/g, '').trim();

function getOptionIndex(opt) {
  if (typeof opt === 'number') return opt;
  const upper = String(opt || 'A').toUpperCase().trim();
  if (upper === 'B' || upper === '2') return 1;
  if (upper === 'C' || upper === '3') return 2;
  if (upper === 'D' || upper === '4') return 3;
  return 0; // A or 1
}

export const ALL_ELECTROCHEMISTRY_QUESTIONS = [
  ...ELECTROCHEMISTRY_PART1,
  ...ELECTROCHEMISTRY_PART2,
  ...ELECTROCHEMISTRY_PART3,
  ...ELECTROCHEMISTRY_PART4,
];

export async function importElectrochemistryQuestions() {
  console.log('========================================================================');
  console.log('IMPORTING ELECTROCHEMISTRY QUESTIONS (NEET QUESTION BANK)');
  console.log(`Total questions in dataset: ${ALL_ELECTROCHEMISTRY_QUESTIONS.length}`);
  console.log('========================================================================\n');

  // =========================================================================
  // STEP 1: LOCAL DATABASE IMPORT
  // =========================================================================
  console.log('--- Step 1: Processing Local PostgreSQL Database ---');

  // 1. Ensure Subject 'Chemistry' exists
  let subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
  let chemistrySubjectId;
  if (subRes.rows.length === 0) {
    const insertedSub = await query("INSERT INTO subjects (name, exam_type) VALUES ('Chemistry', 'NEET') RETURNING id");
    chemistrySubjectId = insertedSub.rows[0].id;
    console.log(`Created subject 'Chemistry' with id ${chemistrySubjectId}`);
  } else {
    chemistrySubjectId = subRes.rows[0].id;
    console.log(`Found subject 'Chemistry' with id ${chemistrySubjectId}`);
  }

  // 2. Ensure Chapter 'Electrochemistry' exists for Chemistry
  let chRes = await query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'electrochemistry' LIMIT 1",
    [chemistrySubjectId]
  );
  let electrochemChapterId;
  if (chRes.rows.length === 0) {
    const insertedCh = await query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Electrochemistry', 15) RETURNING id",
      [chemistrySubjectId]
    );
    electrochemChapterId = insertedCh.rows[0].id;
    console.log(`Created new chapter 'Electrochemistry' with id ${electrochemChapterId} under Chemistry`);
  } else {
    electrochemChapterId = chRes.rows[0].id;
    console.log(`Found existing chapter 'Electrochemistry' with id ${electrochemChapterId}`);
  }

  // 3. Build local duplicate check index across all questions
  const localExisting = await query("SELECT id, question_text, chapter, subject FROM question_bank");
  const localSet = new Map();
  for (const r of localExisting.rows) {
    localSet.set(norm(r.question_text), r);
  }
  console.log(`Indexed ${localSet.size} existing local questions for duplicate detection.\n`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < ALL_ELECTROCHEMISTRY_QUESTIONS.length; i++) {
    const raw = ALL_ELECTROCHEMISTRY_QUESTIONS[i];
    const key = norm(raw.question_text);

    if (localSet.has(key)) {
      localSkipped++;
      const existing = localSet.get(key);
      console.log(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [SKIP LOCAL DUPLICATE] ID ${existing.id}: "${raw.question_text.slice(0, 45)}..."`);
      continue;
    }

    const options = [raw.option_a, raw.option_b, raw.option_c, raw.option_d];
    const correctIndex = getOptionIndex(raw.correct_option);

    await query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
         subject_id, chapter_id, difficulty, image_url, chapter, topic, subject
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
      [
        'Chemistry',
        'mcq',
        raw.question_text,
        JSON.stringify(options),
        correctIndex,
        JSON.stringify([]),
        null,
        0,
        null,
        null,
        4,
        raw.explanation || '',
        chemistrySubjectId,
        electrochemChapterId,
        (raw.difficulty || 'medium').toLowerCase(),
        raw.diagram_url || '',
        'Electrochemistry',
        raw.topic || 'Electrochemistry',
        'Chemistry'
      ]
    );
    localSet.set(key, { id: 'new', chapter: 'Electrochemistry' });
    localInserted++;
    console.log(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [INSERTED LOCAL] "${raw.question_text.slice(0, 45)}..."`);
  }

  console.log(`\nLocal DB finished: ${localInserted} inserted, ${localSkipped} skipped as already present.\n`);

  // Clear redis cache if present
  try {
    await delCache('question_bank:*');
    await delCache('chapters:*');
  } catch (err) {
    // Redis optional
  }

  // =========================================================================
  // STEP 2: LIVE EDVEDUM.COM PLATFORM SYNC
  // =========================================================================
  console.log('--- Step 2: Synchronizing to Live edvedum.com ---');
  let liveInserted = 0;
  let liveSkipped = 0;

  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });

    if (!loginRes.ok) {
      console.warn(`Live login failed (${loginRes.status}): ${await loginRes.text()}`);
      return { localInserted, localSkipped, liveInserted: 0, liveSkipped: 0 };
    }

    const token = (await loginRes.json()).token;
    console.log('✓ Successfully authenticated with live edvedum.com');

    // 1. Ensure Subject 'Chemistry' exists on live
    const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const subs = (await subsRes.json()).subjects || [];
    let liveChemSub = subs.find(s => s.name.toLowerCase() === 'chemistry');
    if (!liveChemSub) {
      console.log('Creating subject Chemistry on live...');
      const createSub = await fetch(`${LIVE_API}/admin/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: 'Chemistry', exam_type: 'NEET' })
      });
      liveChemSub = (await createSub.json()).subject;
    }
    const liveChemSubId = liveChemSub.id;
    console.log(`Live Chemistry Subject ID: ${liveChemSubId}`);

    // 2. Ensure Chapter 'Electrochemistry' exists on live
    const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveChemSubId}/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chaps = (await chapsRes.json()).chapters || [];
    let liveElectroChapter = chaps.find(c => c.name.toLowerCase() === 'electrochemistry');
    if (!liveElectroChapter) {
      console.log('Creating chapter "Electrochemistry" under Chemistry on live...');
      const createChap = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveChemSubId, name: 'Electrochemistry', position: 15 })
      });
      liveElectroChapter = (await createChap.json()).chapter;
    }
    const liveElectroChapterId = liveElectroChapter.id;
    console.log(`Live Electrochemistry Chapter ID: ${liveElectroChapterId} ("${liveElectroChapter.name}")`);

    // 3. Fetch existing live questions to build duplicate check set
    const liveQBRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
    });
    const liveQBData = await liveQBRes.json();
    const allLiveChem = liveQBData.questions || [];
    console.log(`Total live Chemistry questions currently: ${allLiveChem.length}`);

    const liveSet = new Set();
    for (const q of allLiveChem) {
      liveSet.add(norm(q.question_text));
    }

    // 4. Upload missing questions to live
    for (let i = 0; i < ALL_ELECTROCHEMISTRY_QUESTIONS.length; i++) {
      const raw = ALL_ELECTROCHEMISTRY_QUESTIONS[i];
      const key = norm(raw.question_text);

      if (liveSet.has(key)) {
        liveSkipped++;
        console.log(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [SKIP LIVE DUPLICATE] "${raw.question_text.slice(0, 45)}..."`);
        continue;
      }

      const formattedOptions = [
        { text: raw.option_a },
        { text: raw.option_b },
        { text: raw.option_c },
        { text: raw.option_d }
      ];

      const payload = {
        category: 'Chemistry',
        subject: 'Chemistry',
        subject_id: liveChemSubId,
        chapter: 'Electrochemistry',
        chapter_id: liveElectroChapterId,
        topic: raw.topic || 'Electrochemistry',
        question_type: 'mcq',
        question_text: raw.question_text,
        options: formattedOptions,
        correct_index: getOptionIndex(raw.correct_option),
        marks: 4,
        difficulty: (raw.difficulty || 'medium').toLowerCase(),
        solution: raw.explanation || '',
        image_url: raw.diagram_url || ''
      };

      try {
        const postRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (postRes.ok) {
          liveInserted++;
          liveSet.add(key);
          console.log(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [INSERTED LIVE] "${raw.question_text.slice(0, 45)}..."`);
        } else {
          const errText = await postRes.text();
          console.error(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [LIVE ERROR ${postRes.status}]: ${errText.slice(0, 100)}`);
        }
      } catch (postErr) {
        console.error(`[Q${i + 1}/${ALL_ELECTROCHEMISTRY_QUESTIONS.length}] [LIVE NETWORK ERROR]: ${postErr.message}`);
      }

      // Small throttle to avoid flooding live server
      await new Promise(r => setTimeout(r, 60));
    }

    console.log(`\nLive sync finished: ${liveInserted} inserted, ${liveSkipped} skipped as duplicates.`);
  } catch (liveErr) {
    console.error('Error during live sync:', liveErr.message);
  }

  return { localInserted, localSkipped, liveInserted, liveSkipped };
}

// Run directly
importElectrochemistryQuestions()
  .then((res) => {
    console.log('\n========================================================================');
    console.log('SUMMARY:');
    console.log(`Local DB: ${res.localInserted} inserted, ${res.localSkipped} skipped.`);
    console.log(`Live DB:  ${res.liveInserted} inserted, ${res.liveSkipped} skipped.`);
    console.log('========================================================================');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during execution:', err);
    process.exit(1);
  });
