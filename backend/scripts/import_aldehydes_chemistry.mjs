/**
 * Import 144 Aldehydes, Ketones and Carboxylic Acids Questions to Live Platform & DB
 * Strictly code-based (No Gemini AI calls)
 */

import fs from 'fs';
import path from 'path';
import { ALDEHYDES_PART1 } from './aldehydes_part1.mjs';
import { ALDEHYDES_PART2 } from './aldehydes_part2.mjs';
import { ALDEHYDES_PART3 } from './aldehydes_part3.mjs';
import { ALDEHYDES_PART4 } from './aldehydes_part4.mjs';

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
  console.log('   ALDEHYDES, KETONES & CARBOXYLIC ACIDS QUESTION IMPORT (CODE-BASED)   ');
  console.log('========================================================================\n');

  // 1. Combine all 4 parts
  const allQuestions = [
    ...ALDEHYDES_PART1,
    ...ALDEHYDES_PART2,
    ...ALDEHYDES_PART3,
    ...ALDEHYDES_PART4
  ];
  console.log(`[Data] Loaded ${allQuestions.length} questions from parts 1-4.`);

  // 2. Load diagram map if available
  let diagramsMap = {};
  const mapPath = path.resolve('diagrams_map.json');
  if (fs.existsSync(mapPath)) {
    try {
      diagramsMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
      console.log(`[Diagrams] Loaded ${Object.keys(diagramsMap).length} diagram URLs.`);
    } catch (e) {
      console.warn('[Diagrams] Error reading diagrams_map.json:', e.message);
    }
  }

  // 3. Login to live API
  console.log('[Auth] Logging into Live API (https://edvedum.com/api)...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Failed to login to live API: ${loginRes.status} ${loginRes.statusText}`);
  }
  const { token } = await loginRes.json();
  console.log('[Auth] Successfully authenticated! JWT token obtained.');

  // 4. Check existing questions on live
  console.log('[Live] Fetching existing questions from Live Question Bank...');
  const existingRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const existingData = await existingRes.json();
  const existingList = existingData.questions || existingData || [];
  console.log(`[Live] Found ${existingList.length} total Chemistry questions on live server.`);

  const existingNormSet = new Set(
    existingList.map(q => normalizeText(q.question_text)).filter(t => t.length > 15)
  );

  let insertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  const targetChapter = 'Aldehydes, Ketones and Carboxylic Acids';
  const targetChapterId = 33;
  const targetSubjectId = 6;

  console.log('\n--- Beginning Question Uploads ---');

  for (const q of allQuestions) {
    const qNorm = normalizeText(q.question_text);
    if (existingNormSet.has(qNorm)) {
      skippedCount++;
      console.log(`[SKIP] Q${q.qNum}: Already exists in live database.`);
      continue;
    }

    const imageUrl = diagramsMap[q.qNum] || q.image_url || null;

    const payload = {
      category: 'Chemistry',
      question_type: 'mcq',
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
      image_url: imageUrl,
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
        console.error(`[ERROR] Q${q.qNum} failed (${postRes.status}): ${errText.slice(0, 100)}`);
        errorCount++;
      } else {
        const resData = await postRes.json();
        insertedCount++;
        existingNormSet.add(qNorm);
        if (insertedCount % 10 === 0 || insertedCount === allQuestions.length) {
          console.log(`[PROGRESS] Inserted ${insertedCount}/${allQuestions.length} questions... (Last ID: ${resData.id || resData.question?.id})`);
        }
      }
    } catch (err) {
      console.error(`[ERROR] Q${q.qNum} exception:`, err.message);
      errorCount++;
    }
  }

  console.log('\n========================================================================');
  console.log(`[SUMMARY] Import Complete!`);
  console.log(`  Inserted: ${insertedCount}`);
  console.log(`  Skipped:  ${skippedCount}`);
  console.log(`  Errors:   ${errorCount}`);
  console.log('========================================================================\n');

  // 5. Verify live count
  const verifyRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const verifyData = await verifyRes.json();
  const verifyList = verifyData.questions || verifyData || [];
  const aldeCount = verifyList.filter(q => (q.chapter || '').toLowerCase().includes('aldehyde')).length;
  console.log(`[VERIFY] Live server now has ${aldeCount} questions under Aldehydes, Ketones and Carboxylic Acids.`);
}

main().catch(console.error);

