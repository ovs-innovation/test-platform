import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SOLIDS_PYQ_QUESTIONS } from './solids_pyq_questions_data.mjs';

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
  console.log('--- STARTING SEED & SYNC: Mechanical Properties of Solids (JEE Physics) ---');
  console.log(`Total questions to process: ${SOLIDS_PYQ_QUESTIONS.length}`);

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
      WHERE (id = 136 OR LOWER(name) = 'mechanical properties of solids') AND subject_id = $1
      LIMIT 1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      const insCh = await client.query(`
        INSERT INTO chapters (name, subject_id)
        VALUES ('Mechanical Properties of Solids', $1)
        RETURNING id, name
      `, [subjectId]);
      chapterId = insCh.rows[0].id;
      console.log(`Created new chapter: "${insCh.rows[0].name}" (ID: ${chapterId})`);
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter: "${chRes.rows[0].name}" (ID: ${chapterId})`);
    }

    // 3. Clean up existing JEE questions for Mechanical Properties of Solids
    const delRes = await client.query(`
      DELETE FROM question_bank
      WHERE exam_type = 'JEE' 
        AND (chapter_id = $1 OR LOWER(chapter) = 'mechanical properties of solids')
    `, [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous JEE questions for chapter ID ${chapterId}.`);

    // 4. Insert all 113 questions
    let mcqCount = 0;
    let numCount = 0;

    for (let i = 0; i < SOLIDS_PYQ_QUESTIONS.length; i++) {
      const q = SOLIDS_PYQ_QUESTIONS[i];
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
        'Physics',                               // category (strictly 'Physics' in JEE, NOT 'PYQ')
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
        subjectId,                               // subject_id (11)
        chapterId,                               // chapter_id (136)
        q.difficulty || 'medium',                // difficulty
        q.image_url || null,                     // image_url
        null,                                    // solution_image_url
        'Mechanical Properties of Solids',       // chapter
        'Mechanical Properties of Solids',       // topic
        subjectName,                             // subject ('Physics')
        'available',                             // status
        'JEE'                                    // exam_type
      ]);

      if ((i + 1) % 25 === 0 || i === SOLIDS_PYQ_QUESTIONS.length - 1) {
        console.log(`Inserted ${i + 1}/${SOLIDS_PYQ_QUESTIONS.length} questions...`);
      }
    }

    // 5. Verification count
    const verifyRes = await client.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN question_type = 'mcq' THEN 1 END) as mcq_count,
        COUNT(CASE WHEN question_type = 'numerical' THEN 1 END) as num_count
      FROM question_bank
      WHERE exam_type = 'JEE' 
        AND category = 'Physics' 
        AND chapter_id = $1
    `, [chapterId]);

    console.log('\n=== VERIFICATION SUMMARY ===');
    console.log(`Chapter: Mechanical Properties of Solids (ID: ${chapterId})`);
    console.log(`Exam Type: JEE`);
    console.log(`Category: Physics`);
    console.log(`Total questions in DB: ${verifyRes.rows[0].total}`);
    console.log(`MCQs in DB: ${verifyRes.rows[0].mcq_count}`);
    console.log(`Numericals in DB: ${verifyRes.rows[0].num_count}`);

    // Total in JEE Physics across all chapters
    const totalJeePhys = await client.query(`
      SELECT COUNT(*) as total FROM question_bank WHERE exam_type = 'JEE' AND category = 'Physics'
    `);
    console.log(`Total questions across all JEE Physics chapters: ${totalJeePhys.rows[0].total}`);

    // 6. Redis cache invalidation
    try {
      const redisUrl = process.env.REDIS_URL;
      if (redisUrl) {
        const { createClient } = await import('redis');
        const redisClient = createClient({ url: redisUrl });
        await redisClient.connect();
        const keys = await redisClient.keys('cache:qb:*');
        if (keys.length > 0) {
          await redisClient.del(keys);
          console.log(`Flushed ${keys.length} cached keys matching cache:qb:*`);
        } else {
          console.log('No cache:qb:* keys found to flush.');
        }
        await redisClient.disconnect();
      }
    } catch (cacheErr) {
      console.warn(`[Redis cache clear warning]: ${cacheErr.message}`);
    }

  } catch (err) {
    console.error('Error during seeding:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
