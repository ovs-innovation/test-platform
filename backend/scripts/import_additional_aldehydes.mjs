import fs from 'fs';
import path from 'path';
import { ALDEHYDES_ADDITIONAL_29 } from './aldehydes_additional_29.mjs';
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
  console.log('   IMPORTING ADDITIONAL 29 ALDEHYDES QUESTIONS (CODE-BASED)             ');
  console.log('========================================================================\n');

  console.log(`[Data] Loaded ${ALDEHYDES_ADDITIONAL_29.length} additional questions.`);

  let diagramsMap = {};
  const mapPath = path.resolve('additional_diagrams_map.json');
  if (fs.existsSync(mapPath)) {
    try {
      diagramsMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
      console.log(`[Diagrams] Loaded ${Object.keys(diagramsMap).length} diagram URLs.`);
    } catch (e) {
      console.warn('[Diagrams] Error reading additional_diagrams_map.json:', e.message);
    }
  }

  // 1. Auth on live
  console.log('[Auth] Authenticating on live API...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) throw new Error('Live auth failed');
  const { token } = await loginRes.json();
  console.log('[Auth] Authenticated successfully.');

  // 2. Load existing live questions
  const liveRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.questions || liveData || [];
  console.log(`[Live] Found ${liveList.length} existing Chemistry questions.`);

  const liveNormSet = new Set(
    liveList.map(q => normalizeText(q.question_text)).filter(t => t.length > 15)
  );

  const targetChapter = 'Aldehydes, Ketones and Carboxylic Acids';
  const targetChapterId = 33;
  const targetSubjectId = 6;

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const q of ALDEHYDES_ADDITIONAL_29) {
    const qNorm = normalizeText(q.question_text);
    if (liveNormSet.has(qNorm)) {
      skipped++;
      console.log(`[SKIP] Q${q.qNum}: Duplicate detected on live.`);
      continue;
    }

    const imgUrl = diagramsMap[q.qNum] || q.image_url || null;

    const payload = {
      category: 'Chemistry',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      subject_id: targetSubjectId,
      chapter_id: targetChapterId,
      chapter: targetChapter,
      subject: 'Chemistry',
      topic: q.topic || targetChapter,
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
        console.error(`[ERROR] Q${q.qNum} live post error: ${errText.slice(0, 100)}`);
        errors++;
      } else {
        const data = await postRes.json();
        inserted++;
        liveNormSet.add(qNorm);
        console.log(`[LIVE OK] Q${q.qNum} inserted. ID: ${data.id || data.question?.id}`);
      }
    } catch (err) {
      console.error(`[ERROR] Q${q.qNum} exception:`, err.message);
      errors++;
    }

    // Also sync to local/Neon DB
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
            'Chemistry',
            q.question_type || 'mcq',
            q.question_text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify([q.correct_index]),
            q.marks || 4,
            q.difficulty || 'medium',
            q.solution || '',
            targetSubjectId,
            targetChapterId,
            targetChapter,
            'Chemistry',
            q.topic || targetChapter,
            q.assertion_text || null,
            q.reason_text || null,
            imgUrl,
            'normal'
          ]
        );
      }
    } catch (e) {
      console.warn(`[LOCAL DB WARN] Q${q.qNum}:`, e.message);
    }
  }

  await pool.end();

  console.log('\n========================================================================');
  console.log(`[SUMMARY]`);
  console.log(`  Inserted: ${inserted}`);
  console.log(`  Skipped:  ${skipped}`);
  console.log(`  Errors:   ${errors}`);
  console.log('========================================================================\n');

  // Verify total in live
  const verifyRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const verifyData = await verifyRes.json();
  const verifyList = verifyData.questions || verifyData || [];
  const alde = verifyList.filter(q => (q.chapter || '').toLowerCase().includes('aldehyde'));
  console.log(`[FINAL VERIFY] Total Aldehydes questions on live server: ${alde.length}`);
}

main().catch(console.error);
