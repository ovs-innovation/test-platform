import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { DIFF_EQ_PART1 } from './data/diff_eq_part1.mjs';
import { DIFF_EQ_PART2 } from './data/diff_eq_part2.mjs';
import { DIFF_EQ_PART3 } from './data/diff_eq_part3.mjs';
import { DIFF_EQ_PART4 } from './data/diff_eq_part4.mjs';
import { DIFF_EQ_PART5 } from './data/diff_eq_part5.mjs';

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
  ...DIFF_EQ_PART1,
  ...DIFF_EQ_PART2,
  ...DIFF_EQ_PART3,
  ...DIFF_EQ_PART4,
  ...DIFF_EQ_PART5
];

async function seed() {
  console.log('=== SEEDING MATHEMATICS: DIFFERENTIAL EQUATIONS (255 QUESTIONS) ===\n');
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

    // 2. Resolve Chapter: "Differential Equations"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'differential equations'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Differential Equations', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Differential Equations' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      if (chapRes.rows[0].name !== 'Differential Equations') {
        await client.query("UPDATE chapters SET name = 'Differential Equations' WHERE id = $1", [chapterId]);
        console.log(`Updated chapter name from '${chapRes.rows[0].name}' to 'Differential Equations' (ID: ${chapterId})`);
      } else {
        console.log(`Found existing chapter 'Differential Equations' with ID: ${chapterId}`);
      }
    }

    // 3. Clean up any previous questions for Differential Equations in Mathematics
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR (subject_id = $2 AND LOWER(chapter) = 'differential equations')",
      [chapterId, subjectId]
    );
    console.log(`Removed ${deleteRes.rowCount} previous questions for chapter 'Differential Equations'.`);

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
            'Differential Equations',
            'Differential Equations',
            imageUrl
          ]
        );
        insertedCount++;
      }
      console.log(`Inserted ${insertedCount} / ${ALL_QUESTIONS.length} questions...`);
    }

    // 5. Verification
    const countRes = await client.query(
      "SELECT count(id) FROM question_bank WHERE chapter_id = $1 AND status = 'available'",
      [chapterId]
    );
    console.log(`\n========================================`);
    console.log(`Verification: Total available questions in DB for 'Differential Equations': ${countRes.rows[0].count}`);
    console.log(`========================================`);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error("Fatal error during seeding:", err);
  process.exit(1);
});
