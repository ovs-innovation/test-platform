import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINAL_FILE = path.join(__dirname, 'nuclear_jee_final_170.json');
const CHAPTER_NAME = 'Nuclear';
const CATEGORY = 'Physics';
const EXAM_TYPE = 'JEE';

async function main() {
  if (!fs.existsSync(FINAL_FILE)) {
    console.error(`Final file not found: ${FINAL_FILE}`);
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(FINAL_FILE, 'utf8'));
  console.log(`=== SYNCING ${questions.length} NUCLEAR JEE QUESTIONS TO DATABASE ===`);

  // 1. Resolve subject
  const subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1");
  const subjectId = subRes.rows[0]?.id || 11;
  const subjectName = subRes.rows[0]?.name || 'Physics';
  console.log(`Resolved Subject: ${subjectName} (ID: ${subjectId})`);

  // 2. Resolve Chapter
  let chRes = await query("SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'nuclear' OR LOWER(name) = 'nuclei') LIMIT 1", [subjectId]);
  let chapterId;
  if (chRes.rows.length === 0) {
    const newCh = await query("INSERT INTO chapters (subject_id, name) VALUES ($1, 'Nuclear') RETURNING id", [subjectId]);
    chapterId = newCh.rows[0].id;
    console.log(`Created new chapter 'Nuclear' (ID: ${chapterId})`);
  } else {
    chapterId = chRes.rows[0].id;
    console.log(`Using existing chapter '${chRes.rows[0].name}' (ID: ${chapterId})`);
    await query("UPDATE chapters SET name = 'Nuclear' WHERE id = $1", [chapterId]).catch(() => {});
  }

  // 3. Remove existing records for this chapter in JEE Physics
  console.log(`Cleaning up existing records for chapter '${CHAPTER_NAME}', exam_type '${EXAM_TYPE}'...`);
  const delRes = await query(
    `DELETE FROM question_bank 
     WHERE (LOWER(chapter) = 'nuclear' OR LOWER(chapter) = 'nuclei' OR chapter_id = $1)
       AND LOWER(category) = 'physics' 
       AND UPPER(COALESCE(exam_type, '')) = 'JEE'`,
    [chapterId]
  );
  console.log(`Removed ${delRes.rowCount || 0} older records.`);

  // 4. Batch insert all 170 questions
  const batchSize = 25;
  let totalInserted = 0;

  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
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
        numericAnswer = Number(q.numeric_answer);
        tolerance = 0;
      } else {
        correctIndex = q.correct_index !== null && q.correct_index !== undefined ? Number(q.correct_index) : 0;
        correctIndicesJson = JSON.stringify([correctIndex]);
        numericAnswer = null;
        tolerance = null;

        const formattedOpts = (q.options || []).map((opt, idx) => {
          if (typeof opt === 'object' && opt !== null) {
            return {
              id: opt.key || ['A', 'B', 'C', 'D'][idx] || String(idx),
              key: opt.key || ['A', 'B', 'C', 'D'][idx] || String(idx),
              text: String(opt.text || '').trim(),
              image_url: opt.image_url || ''
            };
          }
          return {
            id: ['A', 'B', 'C', 'D'][idx] || String(idx),
            key: ['A', 'B', 'C', 'D'][idx] || String(idx),
            text: String(opt).trim(),
            image_url: ''
          };
        });
        optionsJson = JSON.stringify(formattedOpts);
      }

      const imgUrl = q.image_url || null;
      const solImgUrl = q.solution_image_url || null;

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
        q.difficulty || 'medium',             // $15: difficulty
        imgUrl,                              // $16: image_url
        solImgUrl,                           // $17: solution_image_url
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
    console.log(`Inserted ${totalInserted} / ${questions.length} questions...`);
  }

  // 5. Invalidate caches
  console.log('Invalidating Redis caches...');
  await delCache('cache:qb:*').catch(() => {});
  await delCache('cache:qb:questions:Physics').catch(() => {});
  await delCache('cache:qb:questions:physics').catch(() => {});
  await delCache('cache:qb:questions:all').catch(() => {});
  await delCache('cache:qb:categories').catch(() => {});
  await delCache('cache:qb:list:v5:*').catch(() => {});
  await delCache('cache:qb:categories:v5:*').catch(() => {});

  // 6. Verification
  const verifyRes = await query(
    `SELECT COUNT(*) as total, 
            COUNT(CASE WHEN question_type = 'mcq' THEN 1 END) as mcqs,
            COUNT(CASE WHEN question_type = 'numerical' THEN 1 END) as numericals,
            COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as with_diagrams,
            COUNT(CASE WHEN solution_image_url IS NOT NULL THEN 1 END) as with_solution_diagrams
     FROM question_bank 
     WHERE chapter = $1 AND category = $2 AND exam_type = $3`,
    [CHAPTER_NAME, CATEGORY, EXAM_TYPE]
  );

  console.log('\n=== DATABASE VERIFICATION RESULT ===');
  console.log(verifyRes.rows[0]);

  await pool.end();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
