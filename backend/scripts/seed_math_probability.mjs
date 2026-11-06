import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { PARABOLA_PART1 } from './data/parabola_part1.mjs';
import { PARABOLA_PART2 } from './data/parabola_part2.mjs';
import { PARABOLA_PART3 } from './data/parabola_part3.mjs';

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
  ...PARABOLA_PART1,
  ...PARABOLA_PART2,
  ...PARABOLA_PART3
];

async function seed() {
  console.log('=== SEEDING MATHEMATICS: PROBABILITY (143 QUESTIONS) ===\n');
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

    // 2. Resolve Chapter: "Probability"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'probability'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Probability', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Probability' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      if (chapRes.rows[0].name !== 'Probability') {
        await client.query("UPDATE chapters SET name = 'Probability' WHERE id = $1", [chapterId]);
        console.log(`Updated chapter name from '${chapRes.rows[0].name}' to 'Probability' (ID: ${chapterId})`);
      } else {
        console.log(`Found existing chapter 'Probability' with ID: ${chapterId}`);
      }
    }

    // 3. Clean up any previous questions for Probability in Mathematics
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE chapter_id = $1 OR (subject_id = $2 AND LOWER(chapter) = 'probability')",
      [chapterId, subjectId]
    );
    console.log(`Removed ${deleteRes.rowCount} previous questions for chapter 'Probability'.`);

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

        const rawNumeric = q.numeric_answer ?? q.correct_answer;
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
            'Probability',
            'Probability',
            imageUrl
          ]
        );
        insertedCount++;
      }
      console.log(`Inserted ${insertedCount} / ${ALL_QUESTIONS.length} questions...`);
    }

    // 5. Verification
    const countRes = await client.query(
      "SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1 AND status = 'available'",
      [chapterId]
    );
    console.log(`\n========================================`);
    console.log(`Verification: Total available questions in DB for 'Probability': ${countRes.rows[0].count}`);
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
