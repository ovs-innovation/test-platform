import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { VECTOR_ALGEBRA_PART1 } from './data/vector_algebra_part1.mjs';
import { VECTOR_ALGEBRA_PART2 } from './data/vector_algebra_part2.mjs';
import { VECTOR_ALGEBRA_PART3 } from './data/vector_algebra_part3.mjs';
import { VECTOR_ALGEBRA_PART4 } from './data/vector_algebra_part4.mjs';
import { VECTOR_ALGEBRA_PART5 } from './data/vector_algebra_part5.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

const ALL_QUESTIONS = [
  ...VECTOR_ALGEBRA_PART1,
  ...VECTOR_ALGEBRA_PART2,
  ...VECTOR_ALGEBRA_PART3,
  ...VECTOR_ALGEBRA_PART4,
  ...VECTOR_ALGEBRA_PART5
];

async function seed() {
  console.log('=== SEEDING MATHEMATICS: VECTOR-ALGEBRA (305 QUESTIONS) ===\n');
  console.log(`Total questions to insert: ${ALL_QUESTIONS.length}`);

  const client = await connectWithRetry();

  try {
    // 1. Resolve Subject: Mathematics
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'mathematics'");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Mathematics' not found in database.");
    }
    const subjectId = subRes.rows[0].id;
    const subjectName = subRes.rows[0].name;
    console.log(`Using Subject: ${subjectName} (ID: ${subjectId})`);

    // 2. Resolve Chapter: "Vector-Algebra"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'vector-algebra'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Vector-Algebra', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Vector-Algebra' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Found existing chapter 'Vector-Algebra' with ID: ${chapterId}`);
    }

    // 3. Clean up any existing questions in this chapter to avoid duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE chapter_id = $1",
      [chapterId]
    );
    console.log(`Removed ${deleteRes.rowCount} previous questions for chapter 'Vector-Algebra'.`);

    // 4. Insert in batches
    console.log(`\nInserting ${ALL_QUESTIONS.length} questions...`);
    let insertedCount = 0;
    const batchSize = 25;

    for (let i = 0; i < ALL_QUESTIONS.length; i += batchSize) {
      const batch = ALL_QUESTIONS.slice(i, i + batchSize);

      for (const q of batch) {
        const isMcq = q.question_type === 'mcq';
        const qType = isMcq ? 'single_choice' : 'numerical';

        // Options array format: [{ key: 'A', text: '...', media: [], image_url: '' }, ...]
        let optionsFormatted = [];
        if (isMcq && Array.isArray(q.options)) {
          const keys = ['A', 'B', 'C', 'D'];
          optionsFormatted = q.options.map((optText, idx) => ({
            key: keys[idx] || String.fromCharCode(65 + idx),
            text: String(optText || '').trim(),
            media: [],
            image_url: ''
          }));
        }

        const numericAnswer = !isMcq && q.numeric_answer !== undefined && q.numeric_answer !== null
          ? Number(q.numeric_answer)
          : null;

        const correctIndex = isMcq && q.correct_index !== undefined && q.correct_index !== null
          ? Number(q.correct_index)
          : null;

        const imageUrl = q.image_url || '';

        await client.query(
          `INSERT INTO question_bank (
            question_type,
            question_text,
            options,
            correct_index,
            numeric_answer,
            numerical_tolerance,
            marks,
            difficulty,
            category,
            status,
            solution,
            subject_id,
            subject,
            chapter_id,
            chapter,
            topic,
            image_url,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())`,
          [
            qType,
            q.question_text,
            JSON.stringify(optionsFormatted),
            correctIndex,
            numericAnswer,
            isMcq ? null : 0,
            4,
            'medium',
            'mathematics',
            'approved',
            q.solution,
            subjectId,
            subjectName,
            chapterId,
            'Vector-Algebra',
            'Vector Algebra',
            imageUrl
          ]
        );

        insertedCount++;
      }

      console.log(`  Inserted ${insertedCount}/${ALL_QUESTIONS.length} questions`);
    }

    console.log(`\nAll ${insertedCount} questions successfully seeded for Mathematics: Vector-Algebra!`);

    // 5. Cache invalidation
    try {
      const Redis = (await import('ioredis')).default;
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      const redis = new Redis(redisUrl, { connectTimeout: 3000, maxRetriesPerRequest: 1 });
      const keys = await redis.keys('cache:qb:*');
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`Invalidated ${keys.length} question bank cache keys in Redis.`);
      }
      await redis.quit();
    } catch (cErr) {
      console.log('Redis cache invalidation skipped (Redis not running or unreachable):', cErr.message);
    }

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});

