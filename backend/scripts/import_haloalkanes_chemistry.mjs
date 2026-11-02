import { pool } from '../src/config/db.js';
import { HALOALKANES_QUESTIONS } from './haloalkanes_questions_data.mjs';

function normalizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, ' ') // remove LaTeX commands
    .replace(/[^a-z0-9]/g, ' ')   // remove special chars
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateSimilarity(s1, s2) {
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;

  if (longer.includes(shorter) && shorter.length >= 30) {
    return shorter.length / longer.length;
  }

  const getGrams = (s) => {
    const grams = new Set();
    for (let i = 0; i < s.length - 2; i++) {
      grams.add(s.slice(i, i + 3));
    }
    return grams;
  };

  const g1 = getGrams(s1);
  const g2 = getGrams(s2);
  if (g1.size === 0 || g2.size === 0) return 0;

  let intersection = 0;
  for (const g of g1) {
    if (g2.has(g)) intersection++;
  }
  return (2.0 * intersection) / (g1.size + g2.size);
}

export async function importHaloalkanesQuestions() {
  console.log('========================================================================');
  console.log('   HALOALKANES & HALOARENES CHEMISTRY QUESTION BANK IMPORT (CODE-BASED)  ');
  console.log('========================================================================');

  // 1. Verify Chemistry subject
  const subRes = await pool.query(
    "SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1"
  );
  if (subRes.rows.length === 0) {
    throw new Error("Subject 'Chemistry' not found in database subjects table.");
  }
  const chemistrySubjectId = subRes.rows[0].id;
  console.log(`[Subject] Found Chemistry subject with ID: ${chemistrySubjectId}`);

  // 2. Ensure 'Haloalkanes and Haloarenes' chapter exists
  const chapterName = 'Haloalkanes and Haloarenes';
  let chRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'haloalkanes and haloarenes' OR LOWER(name) = 'haloalkanes and haloarene' OR LOWER(name) LIKE '%haloalkane%') LIMIT 1",
    [chemistrySubjectId]
  );

  let chapterId;
  if (chRes.rows.length === 0) {
    const maxPosRes = await pool.query(
      "SELECT COALESCE(MAX(position), 0) as max_pos FROM chapters WHERE subject_id = $1",
      [chemistrySubjectId]
    );
    const newPos = (maxPosRes.rows[0]?.max_pos || 0) + 1;
    const insertedCh = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, $3) RETURNING id, name",
      [chemistrySubjectId, chapterName, newPos]
    );
    chapterId = insertedCh.rows[0].id;
    console.log(`[Chapter] Created new chapter '${chapterName}' with ID ${chapterId} at position ${newPos}`);
  } else {
    chapterId = chRes.rows[0].id;
    console.log(`[Chapter] Found existing chapter '${chRes.rows[0].name}' with ID ${chapterId}`);
  }

  // 3. Load all existing Chemistry questions for duplicate checking
  const existingQs = await pool.query(
    "SELECT id, question_text, chapter, topic FROM question_bank WHERE category = 'Chemistry' OR subject_id = $1",
    [chemistrySubjectId]
  );
  console.log(`[Database] Loaded ${existingQs.rows.length} existing Chemistry questions for deduplication check.\n`);

  let insertedCount = 0;
  let skippedCount = 0;
  const importResults = [];

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const q = HALOALKANES_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);

    // Code-based duplicate check
    let duplicateMatch = null;

    // Check A: Exact match on question text
    for (const ex of existingQs.rows) {
      if (ex.question_text && ex.question_text.trim() === q.question_text.trim()) {
        duplicateMatch = { id: ex.id, reason: 'Exact text match', chapter: ex.chapter };
        break;
      }
    }

    // Check B: Normalized text match and fuzzy similarity check
    if (!duplicateMatch) {
      for (const ex of existingQs.rows) {
        const exNorm = normalizeText(ex.question_text);
        if (exNorm.length > 20 && qNorm.length > 20) {
          if (exNorm === qNorm) {
            duplicateMatch = { id: ex.id, reason: 'Normalized text match', chapter: ex.chapter };
            break;
          }
          const sim = calculateSimilarity(qNorm, exNorm);
          if (sim > 0.85) {
            duplicateMatch = { id: ex.id, reason: `Fuzzy similarity (${Math.round(sim * 100)}%)`, chapter: ex.chapter };
            break;
          }
        }
      }
    }

    if (duplicateMatch) {
      skippedCount++;
      const preview = q.question_text.replace(/\s+/g, ' ').slice(0, 65);
      console.log(`[SKIP DUPLICATE] Q${i + 1}: Match found in DB ID ${duplicateMatch.id} (${duplicateMatch.reason}) -> "${preview}..."`);
      importResults.push({
        index: i + 1,
        topic: q.topic,
        status: 'SKIPPED',
        detail: `Duplicate of ID ${duplicateMatch.id}`
      });
    } else {
      // Safe insertion with exact parameters
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
      // Register in local existing set to prevent duplicates within the batch
      existingQs.rows.push({ id: newId, question_text: q.question_text, chapter: chapterName });

      const preview = q.question_text.replace(/\s+/g, ' ').slice(0, 65);
      console.log(`[INSERTED] Q${i + 1} -> ID: ${newId} | [${q.topic}] "${preview}..."`);
      importResults.push({
        index: i + 1,
        id: newId,
        topic: q.topic,
        status: 'INSERTED',
        detail: `New ID ${newId}`
      });
    }
  }

  console.log('\n========================================================================');
  console.log('                          IMPORT SUMMARY                                ');
  console.log('========================================================================');
  console.log(`Total questions processed: ${HALOALKANES_QUESTIONS.length}`);
  console.log(`Questions inserted:        ${insertedCount}`);
  console.log(`Questions skipped (dups):  ${skippedCount}`);
  console.log(`Chapter:                   ${chapterName} (ID: ${chapterId})`);
  console.log('========================================================================');

  return { total: HALOALKANES_QUESTIONS.length, insertedCount, skippedCount, chapterId };
}

// Standalone execution
if (process.argv[1]?.endsWith('import_haloalkanes_chemistry.mjs')) {
  importHaloalkanesQuestions()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error('[Error during import]:', err);
      await pool.end();
      process.exit(1);
    });
}
