import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { MAG_MATTER_BATCH2_QUESTIONS } from './seed_mag_matter_part2.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  console.log(`=== Seeding ${MAG_MATTER_BATCH2_QUESTIONS.length} Magnetism and Matter Batch 2 Questions into Neon DB ===`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Magnetism and Matter';

    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    const subjectId = subjRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE name ILIKE $1 AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    const chapterId = chapRes.rows[0].id;
    console.log(`Using chapter '${chapRes.rows[0].name}' with ID: ${chapterId}`);

    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < MAG_MATTER_BATCH2_QUESTIONS.length; i++) {
      const q = MAG_MATTER_BATCH2_QUESTIONS[i];
      const qNum = 21 + i;
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        console.log(`[Q${qNum}] Already exists (ID: ${existing.rows[0].id}), skipping.`);
        skipped++;
        continue;
      }

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15
        ) RETURNING id
      `;

      const values = [
        'Physics',
        q.question_type || 'single_choice',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || 'Magnetism and Matter',
        chapterName
      ];

      const res = await client.query(sql, values);
      console.log(`[Q${qNum}] Inserted with ID: ${res.rows[0].id}`);
      inserted++;
    }

    console.log(`\n=== Batch 2 Seeding Complete ===`);
    console.log(`Total questions processed: ${MAG_MATTER_BATCH2_QUESTIONS.length}`);
    console.log(`Inserted: ${inserted}`);
    console.log(`Skipped: ${skipped}`);
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
