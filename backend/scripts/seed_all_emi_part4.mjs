import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { EMI_BATCH4_QUESTIONS } from './seed_emi_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  console.log(`=== Seeding ${EMI_BATCH4_QUESTIONS.length} Electromagnetic Induction Batch 4 Questions into Neon DB ===`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Electromagnetic Induction';

    // 1. Get Subject ID for Physics
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;

    // 2. Get Chapter ID
    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE $1 AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    if (chapRes.rows.length === 0) {
      throw new Error(`Chapter '${chapterName}' not found in Neon DB`);
    }
    const chapterId = chapRes.rows[0].id;
    console.log(`Using chapter '${chapRes.rows[0].name}' with ID: ${chapterId}`);

    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < EMI_BATCH4_QUESTIONS.length; i++) {
      const q = EMI_BATCH4_QUESTIONS[i];
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        console.log(`[${i + 1}/${EMI_BATCH4_QUESTIONS.length}] Skipping existing: ${q.question_text.slice(0, 50)}...`);
        skipped++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            subject_id, chapter_id, category, question_type,
            question_text, options, correct_index, correct_indices,
            marks, difficulty, solution, image_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            subjectId,
            chapterId,
            q.category,
            q.question_type,
            q.question_text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify(q.correct_indices),
            q.marks,
            q.difficulty,
            q.solution,
            q.image_url
          ]
        );
        console.log(`[${i + 1}/${EMI_BATCH4_QUESTIONS.length}] Inserted: ${q.question_text.slice(0, 50)}...`);
        inserted++;
      }
    }

    console.log(`\n=== Batch 4 Seeding Finished: ${inserted} inserted, ${skipped} skipped ===`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
