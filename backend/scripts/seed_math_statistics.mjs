import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { STATISTICS_PART1 } from './data/statistics_part1.mjs';
import { STATISTICS_PART2 } from './data/statistics_part2.mjs';
import { STATISTICS_PART3 } from './data/statistics_part3.mjs';
import { STATISTICS_PART4 } from './data/statistics_part4.mjs';

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
  ...STATISTICS_PART1,
  ...STATISTICS_PART2,
  ...STATISTICS_PART3,
  ...STATISTICS_PART4
];

async function seed() {
  console.log('=== SEEDING MATHEMATICS: STATISTICS (160 QUESTIONS) ===\n');
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

    // 2. Resolve Chapter: "Statistics"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'statistics'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Statistics', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Statistics' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Found existing chapter 'Statistics' with ID: ${chapterId}`);
    }

    // 3. Clean up any previous questions for Statistics in Mathematics
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR (subject_id = $2 AND LOWER(chapter) = 'statistics')",
      [chapterId, subjectId]
    );
    console.log(`Removed ${deleteRes.rowCount} previous questions for chapter 'Statistics'.`);

    // 4. Insert in batches
    console.log(`\nInserting ${ALL_QUESTIONS.length} questions...`);
    let insertedCount = 0;
    const batchSize = 25;

    for (let i = 0; i < ALL_QUESTIONS.length; i += batchSize) {
      const batch = ALL_QUESTIONS.slice(i, i + batchSize);

      for (const q of batch) {
        const isMcq = q.question_type === 'mcq';
        const qType = isMcq ? 'single_choice' : 'numerical';

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
            q.question_text.trim(),
            JSON.stringify(optionsFormatted),
            correctIndex,
            numericAnswer,
            isMcq ? null : 0,
            4,
            'medium',
            'mathematics',
            'approved',
            q.solution.trim(),
            subjectId,
            subjectName,
            chapterId,
            'Statistics',
            'Statistics',
            imageUrl
          ]
        );
        insertedCount++;
      }
      console.log(`  Inserted ${insertedCount}/${ALL_QUESTIONS.length} questions...`);
    }

    // 5. Verification
    const countRes = await client.query(
      "SELECT COUNT(*) FROM question_bank WHERE subject_id = $1 AND chapter_id = $2",
      [subjectId, chapterId]
    );
    console.log(`\nVerification: question_bank now has ${countRes.rows[0].count} questions for chapter 'Statistics'.`);

    const typeBreakdown = await client.query(
      `SELECT question_type, COUNT(*) 
       FROM question_bank 
       WHERE subject_id = $1 AND chapter_id = $2 
       GROUP BY question_type`,
      [subjectId, chapterId]
    );
    console.log("\nBreakdown by question_type:");
    for (const row of typeBreakdown.rows) {
      console.log(`  ${row.question_type}: ${row.count}`);
    }

    console.log("\n=== SEEDING COMPLETED SUCCESSFULLY! ===");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

