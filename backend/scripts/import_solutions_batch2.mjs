import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

import { SOLUTIONS_PART5 } from './solutions_data_part5.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[$,\\{}]/g, '').trim();

function getQuestionKey(q) {
  if (q.assertion_text && q.reason_text) {
    return `AR:${norm(q.assertion_text)}||${norm(q.reason_text)}`;
  }
  return `SC:${norm(q.question_text)}`;
}

export async function importSolutionsBatch2() {
  console.log('========================================================================');
  console.log('IMPORTING SOLUTIONS CHEMISTRY (BATCH 2: Q155-Q159 & SECTION B AR Q1-Q12)');
  console.log(`Total questions in dataset: ${SOLUTIONS_PART5.length}`);
  console.log('========================================================================\n');

  // =========================================================================
  // STEP 1: LOCAL DATABASE IMPORT
  // =========================================================================
  console.log('--- Step 1: Processing Local PostgreSQL Database ---');

  // 1. Ensure Subject 'Chemistry' exists
  let subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
  const chemistrySubjectId = subRes.rows[0].id;

  // 2. Ensure Chapter 'Solutions' exists
  let chRes = await query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'solutions' LIMIT 1",
    [chemistrySubjectId]
  );
  const solutionsChapterId = chRes.rows[0].id;
  console.log(`Using Subject Chemistry (ID: ${chemistrySubjectId}) and Chapter Solutions (ID: ${solutionsChapterId})\n`);

  // 3. Build local duplicate check index
  const localExisting = await query("SELECT id, question_text, assertion_text, reason_text FROM question_bank");
  const localSet = new Map();
  for (const r of localExisting.rows) {
    localSet.set(getQuestionKey(r), r);
  }
  console.log(`Indexed ${localSet.size} existing local questions for duplicate detection.\n`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < SOLUTIONS_PART5.length; i++) {
    const q = SOLUTIONS_PART5[i];
    const key = getQuestionKey(q);

    if (localSet.has(key)) {
      localSkipped++;
      const existing = localSet.get(key);
      console.log(`[Q${i + 1}/${SOLUTIONS_PART5.length}] [SKIP LOCAL DUPLICATE] ID ${existing.id}: "${(q.assertion_text || q.question_text).slice(0, 50)}..."`);
      continue;
    }

    await query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
         subject_id, chapter_id, difficulty, image_url, chapter, topic, subject
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
      [
        'Chemistry',
        q.question_type || 'mcq',
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        JSON.stringify([]),
        null,
        0,
        q.assertion_text || null,
        q.reason_text || null,
        q.marks || 4,
        q.solution || '',
        chemistrySubjectId,
        solutionsChapterId,
        q.difficulty || 'medium',
        q.image_url || '',
        'Solutions',
        q.topic || 'Solutions',
        'Chemistry'
      ]
    );
    localSet.set(key, { id: 'new', chapter: 'Solutions' });
    localInserted++;
    console.log(`[Q${i + 1}/${SOLUTIONS_PART5.length}] [INSERTED LOCAL] "${(q.assertion_text || q.question_text).slice(0, 50)}..."`);
  }

  console.log(`\nLocal DB finished: ${localInserted} inserted, ${localSkipped} skipped as already present.\n`);

  // Clear redis cache if present
  try {
    await delCache('question_bank:*');
    await delCache('chapters:*');
  } catch (err) {}

  // =========================================================================
  // STEP 2: LIVE EDVEDUM.COM PLATFORM SYNC
  // =========================================================================
  console.log('--- Step 2: Synchronizing to Live edvedum.com ---');
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

    // Fetch live subject and chapter
    const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const subs = (await subsRes.json()).subjects || [];
    let liveChemSub = subs.find(s => s.name.toLowerCase() === 'chemistry');
    const liveChemSubId = liveChemSub.id;

    const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveChemSubId}/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chaps = (await chapsRes.json()).chapters || [];
    let liveSolutionsChapter = chaps.find(c => c.name.toLowerCase() === 'solutions');
    const liveSolutionsChapterId = liveSolutionsChapter.id;

    // Fetch live questions to build duplicate check set
    const liveQBRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&chapter=Solutions&_t=${Date.now()}`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
    });
    const liveQBData = await liveQBRes.json();
    const allLiveSolutions = liveQBData.questions || [];
    console.log(`Total live Solutions questions currently: ${allLiveSolutions.length}`);

    const liveSet = new Set();
    for (const q of allLiveSolutions) {
      liveSet.add(getQuestionKey(q));
    }

    // Upload missing questions
    let liveInserted = 0;
    let liveSkipped = 0;

    for (let i = 0; i < SOLUTIONS_PART5.length; i++) {
      const q = SOLUTIONS_PART5[i];
      const key = getQuestionKey(q);

      if (liveSet.has(key)) {
        liveSkipped++;
        console.log(`[Q${i + 1}/${SOLUTIONS_PART5.length}] [SKIP LIVE DUPLICATE] "${(q.assertion_text || q.question_text).slice(0, 45)}..."`);
        continue;
      }

      const formattedOptions = (q.options || []).map(opt => ({
        text: typeof opt === 'string' ? opt : (opt.text || '')
      }));

      const payload = {
        category: 'Chemistry',
        subject: 'Chemistry',
        subject_id: liveChemSubId,
        chapter: 'Solutions',
        chapter_id: liveSolutionsChapterId,
        topic: q.topic || 'Solutions',
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: formattedOptions,
        correct_index: q.correct_index,
        marks: q.marks || 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        image_url: q.image_url || '',
        assertion_text: q.assertion_text || null,
        reason_text: q.reason_text || null,
      };

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
        console.log(`[Q${i + 1}/${SOLUTIONS_PART5.length}] [UPLOADED LIVE] "${(q.assertion_text || q.question_text).slice(0, 45)}..."`);
      } else {
        const errText = await postRes.text();
        console.warn(`[Q${i + 1}/${SOLUTIONS_PART5.length}] [FAILED LIVE ${postRes.status}] ${errText.slice(0, 100)}`);
      }
    }

    console.log(`\nLive sync finished: ${liveInserted} uploaded, ${liveSkipped} skipped as already present.`);
    return { localInserted, localSkipped, liveInserted, liveSkipped };
  } catch (liveErr) {
    console.error('Error during live sync:', liveErr);
    return { localInserted, localSkipped, liveInserted: 0, liveSkipped: 0, error: liveErr.message };
  }
}

// Standalone execution
if (process.argv[1]?.endsWith('import_solutions_batch2.mjs')) {
  importSolutionsBatch2()
    .then(async (res) => {
      console.log('\nFinal Batch 2 Import Summary:', res);
      await pool.end();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error('Import failed with error:', e);
      await pool.end();
      process.exit(1);
    });
}
