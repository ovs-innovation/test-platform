import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';
import { KTG_PYQ_QUESTIONS } from './ktg_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set in environment or backend/.env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 5,
  connectionTimeoutMillis: 10000,
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
  console.log('--- STARTING SEED & SYNC: Kinetic Theory of Gases (JEE Physics) ---');
  console.log(`Total questions to process: ${KTG_PYQ_QUESTIONS.length}`);

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
      WHERE (id = 219 OR LOWER(name) = 'kinetic theory of gases' OR LOWER(name) = 'kinetic theory') AND subject_id = $1
      ORDER BY id DESC
      LIMIT 1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      console.log('Creating chapter: Kinetic Theory of Gases...');
      const insertCh = await client.query(`
        INSERT INTO chapters (subject_id, name, order_index, description)
        VALUES ($1, 'Kinetic Theory of Gases', 15, 'Kinetic Theory of Gases - JEE Physics')
        RETURNING id, name
      `, [subjectId]);
      chapterId = insertCh.rows[0].id;
      console.log(`Created chapter ID: ${chapterId}`);
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter: "${chRes.rows[0].name}" (ID: ${chapterId})`);
    }

    // 3. Delete existing questions for Kinetic Theory of Gases under JEE to allow clean idempotency
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (chapter_id = $1 OR chapter_id = 219 OR chapter_id = 140 OR LOWER(chapter) = 'kinetic theory of gases' OR LOWER(chapter) = 'kinetic theory')
    `, [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous question_bank records for chapter ${chapterId}.`);

    // 4. Insert sequentially or in batches
    for (let i = 0; i < KTG_PYQ_QUESTIONS.length; i++) {
      const q = KTG_PYQ_QUESTIONS[i];
      const isNum = q.question_type === 'numerical';
      let optionsJson, correctIndex, correctIndicesJson, numericAnswer, tolerance;

      if (isNum) {
        optionsJson = '[]';
        correctIndex = null;
        correctIndicesJson = '[]';
        numericAnswer = Number(q.numeric_answer);
        tolerance = 0;
      } else {
        const formattedOpts = (q.options || []).map((text, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx] || String(idx),
          text: String(text).trim(),
        }));
        optionsJson = JSON.stringify(formattedOpts);
        correctIndex = Number(q.correct_option ?? 0);
        correctIndicesJson = JSON.stringify([correctIndex]);
        numericAnswer = null;
        tolerance = null;
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
        chapterId,                               // chapter_id
        q.difficulty || 'medium',                // difficulty
        q.image_url || null,                     // image_url
        null,                                    // solution_image_url
        'Kinetic Theory of Gases',               // chapter
        'Kinetic Theory of Gases',               // topic
        subjectName,                             // subject ('Physics')
        'available',                             // status
        'JEE'                                    // exam_type
      ]);

      if ((i + 1) % 25 === 0 || i === KTG_PYQ_QUESTIONS.length - 1) {
        console.log(`Inserted ${i + 1}/${KTG_PYQ_QUESTIONS.length} questions...`);
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
    console.log(`Chapter: Kinetic Theory of Gases (ID: ${chapterId})`);
    console.log(`Exam Type: JEE`);
    console.log(`Category: Physics`);
    console.log(`Total questions in DB: ${verifyRes.rows[0].total}`);
    console.log(`MCQs in DB: ${verifyRes.rows[0].mcq_count}`);
    console.log(`Numericals in DB: ${verifyRes.rows[0].num_count}`);

    const totalJeePhys = await client.query(`
      SELECT COUNT(*)::int as total
      FROM question_bank
      WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'
    `);
    console.log(`Total questions across all JEE Physics chapters: ${totalJeePhys.rows[0].total}`);

    // 6. Redis cache invalidation
    try {
      const redisUrl = process.env.REDIS_URL;
      if (redisUrl) {
        const { default: Redis } = await import('ioredis');
        const redisClient = new Redis(redisUrl, { connectTimeout: 3000, maxRetriesPerRequest: 1 });
        const keys = await redisClient.keys('cache:qb:*');
        if (keys.length > 0) {
          await redisClient.del(...keys);
          console.log(`Flushed ${keys.length} cached keys matching cache:qb:*`);
        } else {
          console.log('No cache:qb:* keys found to flush.');
        }
        await redisClient.quit();
      }
    } catch (cacheErr) {
      console.warn(`[Redis cache clear notice]: ${cacheErr.message}`);
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
