import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { BASIC_MATHS_PART1 } from './data/basic_maths_part1.mjs';
import { BASIC_MATHS_PART2 } from './data/basic_maths_part2.mjs';
import { BASIC_MATHS_PART3 } from './data/basic_maths_part3.mjs';
import { BASIC_MATHS_PART4 } from './data/basic_maths_part4.mjs';

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

async function seed() {
  console.log('=== STARTING SEEDING FOR PHYSICS: BASIC MATHS ===\n');
  const client = await connectWithRetry();

  try {
    // 1. Resolve Subject: Physics
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found in database.");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Using Subject: Physics (ID: ${subjectId})`);

    // 2. Resolve or Create Chapter: "Basic Maths"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'basic maths'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id, name",
        ['Basic Maths', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new Chapter: "Basic Maths" with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing Chapter: "Basic Maths" (ID: ${chapterId})`);
    }

    // 3. Clean up existing questions for Basic Maths in this chapter to allow clean idempotent re-run
    const delRes = await client.query("DELETE FROM question_bank WHERE chapter_id = $1", [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous question(s).`);

    // 4. Combine all 321 questions
    const allQuestions = [
      ...BASIC_MATHS_PART1,
      ...BASIC_MATHS_PART2,
      ...BASIC_MATHS_PART3,
      ...BASIC_MATHS_PART4
    ];

    console.log(`Total questions loaded to seed: ${allQuestions.length}`);

    // Load diagram Cloudinary URLs map
    let diagramUrls = {};
    const urlMapFile = path.resolve(__dirname, './basic_maths_diagram_urls.json');
    if (fs.existsSync(urlMapFile)) {
      diagramUrls = JSON.parse(fs.readFileSync(urlMapFile, 'utf8'));
    }

    console.log(`\nInserting ${allQuestions.length} Questions...`);

    for (let i = 0; i < allQuestions.length; i++) {
      const q = allQuestions[i];
      const imageUrl = diagramUrls[q.q_num] || q.image_url || '';

      const formattedOptions = q.options.map((optText, optIdx) => ({
        key: String.fromCharCode(65 + optIdx),
        text: optText,
        media: [],
        image_url: ''
      }));

      const isAssertionReason = q.question_type === 'assertion_reason';

      if (isAssertionReason) {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, assertion_text, reason_text,
            subject, topic, chapter, status
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14,
            $15, $16, $17, $18
          )
        `, [
          'Physics',
          'assertion_reason',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          imageUrl,
          q.assertion_text || '',
          q.reason_text || '',
          'Physics',
          'Basic Maths',
          'Basic Maths',
          'approved'
        ]);
      } else {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, subject, topic, chapter, status
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16
          )
        `, [
          'Physics',
          'mcq',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          imageUrl,
          'Physics',
          'Basic Maths',
          'Basic Maths',
          'approved'
        ]);
      }

      if ((i + 1) % 50 === 0 || i + 1 === allQuestions.length) {
        console.log(`  Inserted ${i + 1}/${allQuestions.length} questions`);
      }
    }

    // 5. Invalidate Redis Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('\n Redis Question Bank cache invalidated.');
    } catch (cacheErr) {
      console.warn('\n Cache invalidation note:', cacheErr.message);
    }

    console.log(`\n=== SUCCESS: ${allQuestions.length} QUESTIONS SEEDED FOR PHYSICS -> "Basic Maths" ===`);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

