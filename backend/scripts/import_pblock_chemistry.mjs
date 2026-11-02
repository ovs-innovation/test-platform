import { pool } from '../src/config/db.js';
import { allPBlockQuestions } from './pblock_questions_data.mjs';

function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '') // remove latex commands
    .replace(/[^a-z0-9]/g, '')   // remove punctuation/whitespace
    .slice(0, 100);              // match prefix
}

async function run() {
  console.log('--- Starting Pure Code-Based p-Block Import Pipeline ---');

  const chemistrySubjectId = 10;
  const chapterName = 'The p-Block Elements';

  // 1. Ensure chapter in chapters table
  let chapterRes = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE id = 23"
  );

  let chapterId = 23;
  if (chapterRes.rows.length > 0) {
    if (chapterRes.rows[0].name !== chapterName) {
      await pool.query(
        "UPDATE chapters SET name = $1 WHERE id = 23",
        [chapterName]
      );
      console.log(`[Chapter] Updated chapter id 23 name to '${chapterName}'`);
    } else {
      console.log(`[Chapter] Found chapter id 23 '${chapterName}'`);
    }
  } else {
    const newCh = await pool.query(
      "INSERT INTO chapters (name, subject_id, position) VALUES ($1, $2, 16) RETURNING id",
      [chapterName, chemistrySubjectId]
    );
    chapterId = newCh.rows[0].id;
    console.log(`[Chapter] Created chapter '${chapterName}' with id ${chapterId}`);
  }

  // 2. Fetch all existing questions in Chemistry / Chapter 23 for duplicate prevention
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

  for (let i = 0; i < allPBlockQuestions.length; i++) {
    const q = allPBlockQuestions[i];
    const qNorm = normalizeText(q.question_text);

    // Duplicate check A: against loaded chemistry questions
    if (existingNormalizedMap.has(qNorm)) {
      const match = existingNormalizedMap.get(qNorm);
      console.log(`[SKIP DUPLICATE] Q${i + 1}: Already exists (ID: ${match.id}, Chapter: ${match.chapter})`);
      skippedCount++;
      continue;
    }

    // Duplicate check B: DB check
    const dbDupCheck = await pool.query(
      "SELECT id, chapter FROM question_bank WHERE question_text = $1 OR question_text ILIKE $2",
      [q.question_text, `%${q.question_text.slice(0, 50)}%`]
    );

    if (dbDupCheck.rows.length > 0) {
      console.log(`[SKIP DUPLICATE] Q${i + 1}: Found in DB query (ID: ${dbDupCheck.rows[0].id})`);
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

    const preview = q.question_text.replace(/\s+/g, ' ').slice(0, 60);
    console.log(`[INSERTED] Q${i + 1} -> ID: ${newId} | [${q.topic}] "${preview}..."`);
  }

  console.log(`\n========================================`);
  console.log(`Total questions processed: ${allPBlockQuestions.length}`);
  console.log(`Questions inserted: ${insertedCount}`);
  console.log(`Questions skipped (duplicates/already added): ${skippedCount}`);
  console.log(`========================================\n`);

  // Verify final count in DB
  const finalCount = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log(`Final count in Chapter ${chapterId} ('${chapterName}'):`, finalCount.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
