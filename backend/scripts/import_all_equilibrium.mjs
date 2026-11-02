import { pool } from '../src/config/db.js';
import { batch1Questions } from './batch1_eq_mcq.mjs';
import { batch2Questions } from './batch2_eq_mcq.mjs';
import { batch3Questions } from './batch3_eq_mcq.mjs';
import { batch4Questions } from './batch4_eq_mcq.mjs';
import { batch5Questions } from './batch5_eq_mcq.mjs';
import { batch6Questions } from './batch6_eq_mcq.mjs';
import { batch7Questions } from './batch7_eq_mcq.mjs';

const allQuestions = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions,
  ...batch5Questions,
  ...batch6Questions,
  ...batch7Questions
];

async function main() {
  console.log(`=== Importing ${allQuestions.length} Questions for Equilibrium to Local DB ===`);

  // Verify chapter exists with ID 73
  const chRes = await pool.query(
    "SELECT id, name FROM chapters WHERE id = 73 OR (subject_id = 10 AND name ILIKE 'equilibrium') LIMIT 1"
  );
  if (chRes.rows.length === 0) {
    throw new Error("Chapter 'Equilibrium' not found in local database!");
  }
  const chapterId = chRes.rows[0].id;
  console.log(`Using Local Chapter: ${chRes.rows[0].name} (ID: ${chapterId})`);

  // Delete any existing questions in this chapter to ensure clean state
  await pool.query("DELETE FROM question_bank WHERE chapter_id = $1", [chapterId]);
  console.log(`Cleaned up existing questions in chapter ${chapterId}.`);

  let insertedCount = 0;
  const insertedIds = [];

  for (const q of allQuestions) {
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id,
        chapter_id,
        category,
        chapter,
        topic,
        question_type,
        question_text,
        options,
        correct_index,
        solution,
        image_url,
        marks,
        difficulty,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        10,
        chapterId,
        'Chemistry',
        'Equilibrium',
        q.topic || 'Equilibrium',
        'mcq',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.image_url || null,
        q.marks || 4,
        q.difficulty || 'medium',
        'available'
      ]
    );

    insertedIds.push(res.rows[0].id);
    insertedCount++;
    if (insertedCount % 25 === 0 || insertedCount === allQuestions.length) {
      console.log(`[Import] Inserted ${insertedCount}/${allQuestions.length} (Latest ID: ${res.rows[0].id})`);
    }
  }

  console.log(`Successfully imported all ${insertedCount} questions to Local DB!`);
  console.log(`Local ID range: Min ${Math.min(...insertedIds)}, Max ${Math.max(...insertedIds)}`);

  process.exit(0);
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
