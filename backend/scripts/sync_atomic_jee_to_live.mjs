import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';
import { ALL_ATOMIC_QUESTIONS } from './atomic_jee_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTER_NAME = 'Atomic';
const CATEGORY = 'Physics';
const EXAM_TYPE = 'JEE';

async function main() {
  console.log(`=== SYNCING ${ALL_ATOMIC_QUESTIONS.length} ATOMIC JEE QUESTIONS TO DATABASE ===`);

  // 1. Resolve subject
  const subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1");
  const subjectId = subRes.rows[0]?.id || 11;
  const subjectName = subRes.rows[0]?.name || 'Physics';
  console.log(`Resolved Subject: ${subjectName} (ID: ${subjectId})`);

  // 2. Resolve Chapter
  let chRes = await query("SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'atomic' OR LOWER(name) = 'atoms') LIMIT 1", [subjectId]);
  let chapterId;
  if (chRes.rows.length === 0) {
    const newCh = await query("INSERT INTO chapters (subject_id, name) VALUES ($1, 'Atomic') RETURNING id", [subjectId]);
    chapterId = newCh.rows[0].id;
    console.log(`Created new chapter 'Atomic' (ID: ${chapterId})`);
  } else {
    chapterId = chRes.rows[0].id;
    console.log(`Using existing chapter '${chRes.rows[0].name}' (ID: ${chapterId})`);
    await query("UPDATE chapters SET name = 'Atomic' WHERE id = $1", [chapterId]).catch(() => {});
  }

  // 3. Remove existing records for this chapter in JEE Physics
  console.log(`Cleaning up existing records for chapter '${CHAPTER_NAME}', exam_type '${EXAM_TYPE}'...`);
  const delRes = await query(
    `DELETE FROM question_bank 
     WHERE (LOWER(chapter) = 'atomic' OR LOWER(chapter) = 'atoms' OR chapter_id = $1)
       AND LOWER(category) = 'physics' 
       AND UPPER(COALESCE(exam_type, '')) = 'JEE'`,
    [chapterId]
  );
  console.log(`Removed ${delRes.rowCount || 0} older records.`);

  // 4. Batch insert all 146 questions
  const batchSize = 25;
  let totalInserted = 0;

  for (let i = 0; i < ALL_ATOMIC_QUESTIONS.length; i += batchSize) {
    const batch = ALL_ATOMIC_QUESTIONS.slice(i, i + batchSize);
    const values = [];
    const placeholders = [];
    let paramIdx = 1;

    for (const q of batch) {
      const isNum = q.question_type === 'numerical';
      let optionsJson, correctIndex, correctIndicesJson, numericAnswer, tolerance;

      if (isNum) {
        optionsJson = '[]';
        correctIndex = null;
        correctIndicesJson = '[]';
        numericAnswer = Number(q.numeric_answer ?? (parseFloat(q.correct_answer) || 0));
        tolerance = 0;
      } else {
        const letter = String(q.correct_answer || 'A').toUpperCase().trim();
        const mapLetter = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        correctIndex = mapLetter[letter] !== undefined ? mapLetter[letter] : 0;
        correctIndicesJson = JSON.stringify([correctIndex]);
        numericAnswer = null;
        tolerance = null;

        const formattedOpts = (q.options || []).map((opt, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx] || String(idx),
          key: ['A', 'B', 'C', 'D'][idx] || String(idx),
          text: String(opt.option_text || opt.text || opt).trim(),
        }));
        optionsJson = JSON.stringify(formattedOpts);
      }

      const imgUrl = q.diagram_url || q.image_url || null;

      values.push(
        CATEGORY,                            // $1: category
        isNum ? 'numerical' : 'mcq',          // $2: question_type
        q.question_text,                     // $3: question_text
        optionsJson,                         // $4: options
        correctIndex,                        // $5: correct_index
        correctIndicesJson,                  // $6: correct_indices
        numericAnswer,                       // $7: numeric_answer
        tolerance,                           // $8: numerical_tolerance
        null,                                // $9: assertion_text
        null,                                // $10: reason_text
        q.marks || 4,                        // $11: marks
        q.solution || '',                    // $12: solution
        subjectId,                           // $13: subject_id
        chapterId,                           // $14: chapter_id
        'medium',                            // $15: difficulty
        imgUrl,                              // $16: image_url
        null,                                // $17: solution_image_url
        CHAPTER_NAME,                        // $18: chapter
        CHAPTER_NAME,                        // $19: topic
        subjectName,                         // $20: subject
        'available',                         // $21: status
        EXAM_TYPE                            // $22: exam_type
      );

      placeholders.push(`(
        $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
        $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
        $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
        $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
        $${paramIdx++}, $${paramIdx++}
      )`);
    }

    const insertSql = `
      INSERT INTO question_bank (
        category, question_type, question_text, options, correct_index, correct_indices,
        numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
        subject_id, chapter_id, difficulty, image_url, solution_image_url, chapter, topic,
        subject, status, exam_type
      ) VALUES ${placeholders.join(', ')}
    `;

    await query(insertSql, values);
    totalInserted += batch.length;
    console.log(`Inserted ${totalInserted} / ${ALL_ATOMIC_QUESTIONS.length} questions...`);
  }

  // 5. Invalidate caches
  console.log('Invalidating Redis caches...');
  await delCache('cache:qb:*').catch(() => {});
  await delCache('cache:qb:questions:Physics').catch(() => {});
  await delCache('cache:qb:questions:physics').catch(() => {});
  await delCache('cache:qb:questions:all').catch(() => {});
  await delCache('cache:qb:categories').catch(() => {});

  // 6. Verification
  const verifyRes = await query(
    `SELECT COUNT(*) as total, 
            COUNT(CASE WHEN question_type = 'mcq' THEN 1 END) as mcqs,
            COUNT(CASE WHEN question_type = 'numerical' THEN 1 END) as numericals,
            COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as with_diagrams
     FROM question_bank 
     WHERE chapter = $1 AND category = $2 AND exam_type = $3`,
    [CHAPTER_NAME, CATEGORY, EXAM_TYPE]
  );

  console.log('\n=== DATABASE VERIFICATION RESULT ===');
  console.log(verifyRes.rows[0]);

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
