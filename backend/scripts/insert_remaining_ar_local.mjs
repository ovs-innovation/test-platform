import { pool } from '../src/config/db.js';
import { kineticsBatch2 } from './kinetics_data_batch2.mjs';

function normalizeText(q) {
  let text = typeof q === 'string' ? q : (q.question_text || '');
  text = text.replace(/^Directions:.*?\.\s*/i, '');
  if (q.assertion_text) {
    text = q.assertion_text + ' ' + (q.reason_text || '');
  }
  return text
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 80);
}

async function run() {
  console.log('--- Inserting Remaining Assertion-Reason Questions into Local DB ---');

  const chemistrySubjectId = 10;
  const chapterName = 'Chemical Kinetics';
  const chapterId = 21;

  // Fetch all existing questions in Chemical Kinetics
  const existingRes = await pool.query(
    "SELECT id, question_text, assertion_text, reason_text, chapter_id, chapter FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log(`Loaded ${existingRes.rows.length} existing Chemical Kinetics questions.`);

  const existingNormalizedMap = new Map();
  existingRes.rows.forEach(r => {
    const norm = normalizeText(r);
    if (norm) existingNormalizedMap.set(norm, r);
  });

  let insertedCount = 0;
  let skippedCount = 0;

  // Process all 14 assertion-reason questions
  for (let i = 0; i < 14; i++) {
    const q = kineticsBatch2[i];
    const qNorm = normalizeText(q);

    if (existingNormalizedMap.has(qNorm)) {
      const match = existingNormalizedMap.get(qNorm);
      console.log(`[SKIP DUPLICATE] AR-${i + 1}: Already exists (ID: ${match.id})`);
      skippedCount++;
      continue;
    }

    const insertRes = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
         assertion_text, reason_text, image_url, status
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING id`,
      [
        'Chemistry',
        q.question_type || 'assertion_reason',
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        q.marks || 4,
        q.difficulty || 'medium',
        q.solution || '',
        chemistrySubjectId,
        chapterId,
        chapterName,
        'Chemistry',
        q.topic || chapterName,
        q.assertion_text || null,
        q.reason_text || null,
        q.image_url || null,
        'normal'
      ]
    );

    const newId = insertRes.rows[0].id;
    insertedCount++;
    existingNormalizedMap.set(qNorm, { id: newId, chapter: chapterName });
    console.log(`[INSERTED LOCAL] AR-${i + 1} -> ID: ${newId} | "${q.assertion_text.slice(0, 50)}..."`);
  }

  console.log(`\nInserted: ${insertedCount}, Skipped: ${skippedCount}`);

  // Final count in DB
  const finalCount = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log(`Final count in Chapter ${chapterId} ('${chapterName}') in local DB:`, finalCount.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
