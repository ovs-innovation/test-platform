import fs from 'fs';
import path from 'path';
import { MOTION_PART1_OBJ } from './motion_part1_obj.mjs';
import { MOTION_PART2_AR } from './motion_part2_ar.mjs';
import { pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

function normalizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  console.log('========================================================================');
  console.log('   IMPORTING 57 MOTION IN A STRAIGHT LINE QUESTIONS (PHYSICS)          ');
  console.log('   Code-based approach with exact LaTeX and Cloudinary diagrams         ');
  console.log('========================================================================\n');

  const allQuestions = [...MOTION_PART1_OBJ, ...MOTION_PART2_AR];
  console.log(`[Data] Loaded ${MOTION_PART1_OBJ.length} Objective + ${MOTION_PART2_AR.length} Assertion-Reason = ${allQuestions.length} total questions.`);

  let diagramsMap = {};
  const mapPath = path.resolve('motion_diagrams_map.json');
  if (fs.existsSync(mapPath)) {
    try {
      diagramsMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
      console.log(`[Diagrams] Loaded ${Object.keys(diagramsMap).length} diagram URLs from motion_diagrams_map.json.`);
    } catch (e) {
      console.warn('[Diagrams] Error reading motion_diagrams_map.json:', e.message);
    }
  }

  // 1. Auth on live API
  console.log('\n[Auth] Authenticating on live API...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) {
    const errBody = await loginRes.text();
    throw new Error('Live auth failed: ' + errBody);
  }
  const { token } = await loginRes.json();
  console.log('[Auth] Authenticated successfully.');

  // 2. Fetch existing Physics questions on live API
  const liveRes = await fetch(LIVE_API + '/question-bank?category=Physics', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.questions || liveData || [];
  const existingMotion = liveList.filter(q => (q.chapter || '').toLowerCase().includes('straight line'));
  console.log(`[Live] Found ${existingMotion.length} existing questions in 'Motion in straight line'.`);

  const liveNormSet = new Set(
    existingMotion.map(q => normalizeText(q.question_text)).filter(t => t.length > 15)
  );

  const LIVE_SUBJECT_ID = 5;
  const LIVE_CHAPTER_ID = 187;
  const NEON_SUBJECT_ID = 11;
  const NEON_CHAPTER_ID = 134;
  const CHAPTER_NAME = 'Motion in straight line';

  let insertedLive = 0;
  let skippedLive = 0;
  let errorsLive = 0;
  let insertedLocal = 0;

  for (const q of allQuestions) {
    const isAR = q.question_type === 'assertion_reason';
    const qNorm = normalizeText(q.question_text);
    const imgUrl = diagramsMap[String(q.qNum)] || q.image_url || null;

    // Check duplicate on live
    if (liveNormSet.has(qNorm)) {
      skippedLive++;
      console.log(`[SKIP] Q${q.qNum} (${isAR ? 'AR' : 'MCQ'}): Duplicate detected on live.`);
    } else {
      const payload = {
        category: 'Physics',
        question_type: isAR ? 'assertion_reason' : 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: [q.correct_index],
        marks: q.marks || 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        subject_id: LIVE_SUBJECT_ID,
        chapter_id: LIVE_CHAPTER_ID,
        chapter: CHAPTER_NAME,
        subject: 'Physics',
        topic: q.topic || CHAPTER_NAME,
        assertion_text: q.assertion_text || null,
        reason_text: q.reason_text || null,
        image_url: imgUrl,
        status: 'normal'
      };

      try {
        const postRes = await fetch(LIVE_API + '/question-bank', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(payload)
        });

        if (!postRes.ok) {
          const errText = await postRes.text();
          console.error(`[ERROR] Q${q.qNum} (${isAR ? 'AR' : 'MCQ'}) live post error: ${errText.slice(0, 120)}`);
          errorsLive++;
        } else {
          const resData = await postRes.json();
          insertedLive++;
          liveNormSet.add(qNorm);
          console.log(`[LIVE OK] Q${q.qNum} (${isAR ? 'AR' : 'MCQ'}) inserted. ID: ${resData.id || resData.question?.id} ${imgUrl ? '[+Diagram]' : ''}`);
        }
      } catch (err) {
        console.error(`[ERROR] Q${q.qNum} live exception:`, err.message);
        errorsLive++;
      }
    }

    // 3. Sync to local / Neon DB
    try {
      const checkLocal = await pool.query(
        "SELECT id FROM question_bank WHERE question_text = $1 LIMIT 1",
        [q.question_text]
      );
      if (checkLocal.rows.length === 0) {
        await pool.query(
          `INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index, correct_indices,
            marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
            assertion_text, reason_text, image_url, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
          [
            'Physics',
            isAR ? 'assertion_reason' : 'mcq',
            q.question_text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify([q.correct_index]),
            q.marks || 4,
            q.difficulty || 'medium',
            q.solution || '',
            NEON_SUBJECT_ID,
            NEON_CHAPTER_ID,
            CHAPTER_NAME,
            'Physics',
            q.topic || CHAPTER_NAME,
            q.assertion_text || null,
            q.reason_text || null,
            imgUrl,
            'normal'
          ]
        );
        insertedLocal++;
      }
    } catch (e) {
      console.warn(`[LOCAL DB WARN] Q${q.qNum}:`, e.message);
    }
  }

  await pool.end();

  console.log('\n========================================================================');
  console.log('[SUMMARY]');
  console.log(`  Live Inserted: ${insertedLive}`);
  console.log(`  Live Skipped:  ${skippedLive}`);
  console.log(`  Live Errors:   ${errorsLive}`);
  console.log(`  Neon Inserted: ${insertedLocal}`);
  console.log('========================================================================\n');

  // Verify total live questions in Motion in straight line
  const finalRes = await fetch(LIVE_API + '/question-bank?category=Physics', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const finalData = await finalRes.json();
  const finalList = finalData.questions || finalData || [];
  const finalMotion = finalList.filter(q => (q.chapter || '').toLowerCase().includes('straight line'));
  console.log(`[FINAL VERIFY] Total 'Motion in straight line' questions on live server: ${finalMotion.length} (was ${existingMotion.length})`);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

