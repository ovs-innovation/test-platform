import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_MOTION_PYQ_QUESTIONS } from './motion_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await pool.connect();
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET') && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

async function seed() {
  console.log('--- STARTING SEED & SYNC: Motion in two dimension (JEE PYQ) ---');
  console.log(`Total questions to process: ${ALL_MOTION_PYQ_QUESTIONS.length}`);

  const client = await connectWithRetry();
  try {
    // 1. Verify subject
    const subjRes = await client.query(`SELECT id, name FROM subjects WHERE id = 11 OR LOWER(name) = 'physics' LIMIT 1`);
    const subjectId = subjRes.rows[0]?.id || 11;
    const subjectName = subjRes.rows[0]?.name || 'Physics';
    console.log(`Target Subject: ${subjectName} (ID: ${subjectId})`);

    // 2. Verify or create chapter
    let chRes = await client.query(`
      SELECT id, name FROM chapters 
      WHERE LOWER(name) = 'motion in two dimension' AND subject_id = $1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      const insCh = await client.query(`
        INSERT INTO chapters (name, subject_id)
        VALUES ('Motion in two dimension', $1)
        RETURNING id, name
      `, [subjectId]);
      chapterId = insCh.rows[0].id;
      console.log(`Created new chapter: "${insCh.rows[0].name}" (ID: ${chapterId})`);
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter: "${chRes.rows[0].name}" (ID: ${chapterId})`);
    }

    // 3. Clean up existing JEE questions for Motion in two dimension
    const delRes = await client.query(`
      DELETE FROM question_bank
      WHERE exam_type = 'JEE' 
        AND (chapter_id = $1 OR LOWER(chapter) = 'motion in two dimension')
    `, [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous JEE questions for chapter ID ${chapterId}.`);

    // 4. Insert all questions
    let mcqCount = 0;
    let numCount = 0;

    for (let i = 0; i < ALL_MOTION_PYQ_QUESTIONS.length; i++) {
      const q = ALL_MOTION_PYQ_QUESTIONS[i];
      const isNum = q.question_type === 'numerical' || q.question_type === 'integer';

      let optionsJson;
      let correctIndex;
      let correctIndicesJson;
      let numericAnswer;
      let tolerance = 0;

      if (isNum) {
        numCount++;
        optionsJson = JSON.stringify([]);
        correctIndex = null;
        correctIndicesJson = JSON.stringify([]);
        numericAnswer = Number(q.numeric_answer);
        tolerance = 0.01;
      } else {
        mcqCount++;
        const formattedOpts = (q.options || []).map((opt, idx) => ({
          key: String.fromCharCode(65 + idx),
          text: opt,
          image_url: ''
        }));
        optionsJson = JSON.stringify(formattedOpts);
        correctIndex = Number(q.correct_option ?? 0);
        correctIndicesJson = JSON.stringify([correctIndex]);
        numericAnswer = null;
      }

      await client.query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
          subject_id, chapter_id, difficulty, image_url, solution_image_url, chapter, topic, subject, status, exam_type
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        )
      `, [
        'Physics',                               // category
        isNum ? 'numerical' : 'mcq',             // question_type
        q.question,                              // question_text
        optionsJson,                             // options
        correctIndex,                            // correct_index
        correctIndicesJson,                      // correct_indices
        numericAnswer,                           // numeric_answer
        tolerance,                               // numerical_tolerance
        null,                                    // assertion_text
        null,                                    // reason_text
        q.marks || 4,                            // marks
        q.solution || '',                        // solution
        subjectId,                               // subject_id
        chapterId,                               // chapter_id
        q.difficulty || 'medium',                // difficulty
        q.image_url || '',                       // image_url
        '',                                      // solution_image_url
        'Motion in two dimension',               // chapter
        'Motion in two dimension',               // topic
        'Physics',                               // subject
        'available',                             // status
        'JEE'                                    // exam_type
      ]);

      if ((i + 1) % 20 === 0 || i + 1 === ALL_MOTION_PYQ_QUESTIONS.length) {
        console.log(`  Inserted ${i + 1}/${ALL_MOTION_PYQ_QUESTIONS.length} questions...`);
      }
    }

    console.log(`\nSuccessfully inserted:`);
    console.log(`  - MCQs: ${mcqCount}`);
    console.log(`  - Numerical/Integer: ${numCount}`);
    console.log(`  - Total: ${mcqCount + numCount}`);

    // 5. Verification query
    const verifyRes = await client.query(`
      SELECT 
        question_type,
        COUNT(*)::int AS count
      FROM question_bank
      WHERE exam_type = 'JEE' 
        AND category = 'PYQ' 
        AND chapter = 'Motion in two dimension'
      GROUP BY question_type
    `);
    console.log('\nVerification from DB:');
    console.log(verifyRes.rows);

    const totalVerify = await client.query(`
      SELECT COUNT(*)::int AS total
      FROM question_bank
      WHERE exam_type = 'JEE' 
        AND category = 'PYQ' 
        AND chapter = 'Motion in two dimension'
    `);
    console.log(`Grand Total in DB: ${totalVerify.rows[0].total}`);

    // 6. Invalidate Redis Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('Question Bank Redis cache invalidated.');
    } catch (cacheErr) {
      console.warn('Cache invalidation note:', cacheErr.message);
    }

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
