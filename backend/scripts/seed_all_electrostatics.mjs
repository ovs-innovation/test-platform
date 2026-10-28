import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { ELECTROSTATICS_PART1 } from './seed_electrostatics_part1.mjs';
import { ELECTROSTATICS_PART2 } from './seed_electrostatics_part2.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ALL_QUESTIONS = [
  ...ELECTROSTATICS_PART1,
  ...ELECTROSTATICS_PART2
];

async function seed() {
  console.log(`=== Seeding ${ALL_QUESTIONS.length} Electric Charges and Fields Questions into Neon DB ===`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Electric Charges and Fields';

    // 1. Get Subject ID for Physics
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;
    console.log(`Physics Subject ID: ${subjectId}`);

    // 2. Get or Create Chapter ID
    let chapRes = await client.query(
      "SELECT id FROM chapters WHERE (name ILIKE $1 OR name ILIKE 'Electric charge and fields') AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter '${chapterName}' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapRes.rows[0].name}' with ID: ${chapterId}`);
    }

    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < ALL_QUESTIONS.length; i++) {
      const q = ALL_QUESTIONS[i];
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`[${i + 1}/${ALL_QUESTIONS.length}] Skipped existing question #${q.q_num}`);
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
        'single_choice',
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
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${i + 1}/${ALL_QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed chapter '${chapterName}': Inserted ${inserted}, Skipped ${skipped}. Total in batch: ${ALL_QUESTIONS.length}`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
