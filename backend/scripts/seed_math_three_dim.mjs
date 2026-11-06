import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { THREE_DIM_PART1 } from './data/three_dim_part1.mjs';
import { THREE_DIM_PART2 } from './data/three_dim_part2.mjs';
import { THREE_DIM_PART3 } from './data/three_dim_part3.mjs';
import { THREE_DIM_PART4 } from './data/three_dim_part4.mjs';
import { THREE_DIM_PART5 } from './data/three_dim_part5.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 15) {
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
  ...THREE_DIM_PART1,
  ...THREE_DIM_PART2,
  ...THREE_DIM_PART3,
  ...THREE_DIM_PART4,
  ...THREE_DIM_PART5
];

async function seed() {
  console.log('=== SEEDING MATHEMATICS: THREE DIMENSIONAL GEOMETRY (370 QUESTIONS) ===\n');
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

    // 2. Resolve Chapter 98: "Three Dimensional Geometry"
    let chapterId = 98;
    const chapRes = await client.query("SELECT id, name FROM chapters WHERE id = $1", [chapterId]);
    if (chapRes.rows.length > 0) {
      await client.query("UPDATE chapters SET name = 'Three Dimensional Geometry' WHERE id = $1", [chapterId]);
      console.log(`Updated chapter 98 name to 'Three Dimensional Geometry'`);
    } else {
      const insChap = await client.query(
        "INSERT INTO chapters (id, name, subject_id, position, created_at) VALUES ($1, 'Three Dimensional Geometry', $2, 98, NOW()) RETURNING id, name",
        [chapterId, subjectId]
      );
      console.log(`Inserted chapter: ${insChap.rows[0].name} (ID: ${insChap.rows[0].id})`);
    }

    // 3. Clean up previous questions for Three Dimensional Geometry in Mathematics
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR (subject_id = $2 AND (LOWER(chapter) LIKE '%three%dimen%' OR LOWER(chapter) LIKE '%3d%geo%'))",
      [chapterId, subjectId]
    );
    console.log(`Removed ${deleteRes.rowCount} previous questions for chapter 'Three Dimensional Geometry'.`);

    // 4. Insert in batches of 25
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

        const rawNumeric = q.numeric_answer ?? q.correct_answer ?? (!isMcq ? q.correct_index : null);
        const numericAnswer = !isMcq && rawNumeric !== undefined && rawNumeric !== null && rawNumeric !== ''
          ? Number(rawNumeric)
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
            'Mathematics',
            'available',
            q.solution.trim(),
            subjectId,
            'Mathematics',
            chapterId,
            'Three Dimensional Geometry',
            'Three Dimensional Geometry',
            imageUrl
          ]
        );
        insertedCount++;
      }
      console.log(`Progress: ${insertedCount}/${ALL_QUESTIONS.length} questions inserted...`);
    }

    console.log(`\nSuccessfully inserted all ${insertedCount} questions!`);

    // 5. Verification queries
    const countRes = await client.query(
      "SELECT count(id) as total FROM question_bank WHERE chapter_id = $1 AND status = 'available'",
      [chapterId]
    );
    console.log(`Total questions in DB for chapter 'Three Dimensional Geometry' (ID: ${chapterId}): ${countRes.rows[0].total}`);

    const typeRes = await client.query(
      "SELECT count(id) as count, question_type FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
      [chapterId]
    );
    console.log('\nBreakdown by question_type:', typeRes.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
