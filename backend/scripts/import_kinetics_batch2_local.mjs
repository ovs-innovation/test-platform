import { pool } from '../src/config/db.js';
import { kineticsBatch2 } from './kinetics_data_batch2.mjs';

function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '') // remove latex commands
    .replace(/[^a-z0-9]/g, '')   // remove punctuation/whitespace
    .slice(0, 60);              // match prefix
}

async function run() {
  console.log('--- Starting Chemical Kinetics Batch 2 Local Import Pipeline ---');

  const chemistrySubjectId = 10;
  const chapterName = 'Chemical Kinetics';
  const chapterId = 21;

  // 1. Fetch all existing questions in Chemistry / Chapter 21 for duplicate prevention
  const existingRes = await pool.query(
    "SELECT id, question_text, chapter_id, chapter, topic FROM question_bank WHERE category = 'Chemistry' OR subject_id = $1 OR chapter_id = $2",
    [chemistrySubjectId, chapterId]
  );
  console.log(`[Deduplication] Loaded ${existingRes.rows.length} existing chemistry questions for duplicate check.`);

  const existingNormalizedMap = new Map();
  existingRes.rows.forEach(r => {
    const norm = normalizeText(r.question_text);
    if (norm) existingNormalizedMap.set(norm, r);
  });

  let insertedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < kineticsBatch2.length; i++) {
    const q = kineticsBatch2[i];
    const qNorm = normalizeText(q.question_text);

    // Duplicate check A: in-memory map
    if (existingNormalizedMap.has(qNorm)) {
      const match = existingNormalizedMap.get(qNorm);
      console.log(`[SKIP DUPLICATE] Q${i + 1}: Already exists (ID: ${match.id}, Chapter: ${match.chapter})`);
      skippedCount++;
      continue;
    }

    // Duplicate check B: DB query
    const dbDupCheck = await pool.query(
      "SELECT id, chapter FROM question_bank WHERE (question_text = $1 OR question_text ILIKE $2) AND subject_id = $3",
      [q.question_text, `%${q.question_text.slice(0, 50)}%`, chemistrySubjectId]
    );

    if (dbDupCheck.rows.length > 0) {
      console.log(`[SKIP DUPLICATE] Q${i + 1}: Found in DB query (ID: ${dbDupCheck.rows[0].id}, Chapter: ${dbDupCheck.rows[0].chapter})`);
      skippedCount++;
      existingNormalizedMap.set(qNorm, dbDupCheck.rows[0]);
      continue;
    }

    // Insert new question safely
    const insertRes = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
         assertion_text, reason_text, image_url, status
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING id`,
      [
        'Chemistry',
        q.question_type || 'mcq',
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

    const preview = q.question_text.replace(/\s+/g, ' ').slice(0, 50);
    const hasImg = q.image_url ? ' [DIAGRAM]' : '';
    console.log(`[INSERTED LOCAL] Q${i + 1} (${q.question_type}) -> ID: ${newId}${hasImg} | "${preview}..."`);
  }

  console.log(`\n========================================`);
  console.log(`Total batch 2 questions processed: ${kineticsBatch2.length}`);
  console.log(`Questions inserted locally: ${insertedCount}`);
  console.log(`Questions skipped (duplicates/already added): ${skippedCount}`);
  console.log(`========================================\n`);

  // Verify final count in local DB
  const finalCount = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log(`Final count in Chapter ${chapterId} ('${chapterName}') in local DB:`, finalCount.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error('Local import failed:', err);
  process.exit(1);
});
