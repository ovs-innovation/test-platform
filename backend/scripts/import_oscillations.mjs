import { query } from '../src/config/db.js';
import { batch1 } from './oscillations_batch_1.mjs';
import { batch2 } from './oscillations_batch_2.mjs';
import { delCache } from '../src/config/redis.js';

async function run() {
  const allQuestions = [...batch1, ...batch2];
  console.log(`Starting import of ${allQuestions.length} Oscillations questions...`);

  // Ensure chapter exists in chapters table
  let chapterId = 152;
  const chapCheck = await query(`SELECT id FROM chapters WHERE subject_id = 11 AND name = 'Oscillations'`);
  if (chapCheck.rows.length > 0) {
    chapterId = chapCheck.rows[0].id;
  } else {
    const chapIns = await query(`INSERT INTO chapters (name, subject_id) VALUES ('Oscillations', 11) RETURNING id`);
    chapterId = chapIns.rows[0].id;
  }
  console.log(`Using chapter_id = ${chapterId}`);

  // Check existing questions in question_bank
  const existing = await query(`
    SELECT id, question_text 
    FROM question_bank 
    WHERE category = 'Physics' AND (chapter = 'Oscillations' OR chapter = 'Oscillation')
  `);
  console.log(`Currently existing Oscillations questions in DB: ${existing.rows.length}`);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const q of allQuestions) {
    const existingQ = existing.rows.find(r => 
      r.question_text.trim().toLowerCase().slice(0, 50) === q.question_text.trim().toLowerCase().slice(0, 50)
    );

    if (existingQ) {
      await query(`
        UPDATE question_bank SET
          question_text = $1,
          options = $2::jsonb,
          correct_index = $3,
          correct_indices = $4::jsonb,
          marks = $5,
          difficulty = $6,
          solution = $7,
          image_url = $8,
          chapter = 'Oscillations',
          chapter_id = $9,
          topic = 'Oscillations',
          category = 'Physics',
          subject = 'Physics',
          subject_id = 11,
          question_type = 'mcq'
        WHERE id = $10
      `, [
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        chapterId,
        existingQ.id
      ]);
      updatedCount++;
    } else {
      await query(`
        INSERT INTO question_bank (
          category,
          subject,
          subject_id,
          chapter,
          chapter_id,
          topic,
          question_type,
          question_text,
          options,
          correct_index,
          correct_indices,
          marks,
          difficulty,
          solution,
          image_url,
          status
        ) VALUES (
          'Physics',
          'Physics',
          11,
          'Oscillations',
          $1,
          'Oscillations',
          'mcq',
          $2,
          $3::jsonb,
          $4,
          $5::jsonb,
          4,
          $6,
          $7,
          $8,
          'normal'
        )
      `, [
        chapterId,
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || ''
      ]);
      insertedCount++;
    }
  }

  // Clear cache
  try {
    await delCache('cache:qb:categories');
  } catch {}

  console.log(`\n========================================`);
  console.log(`IMPORT COMPLETED SUCCESSFULLY!`);
  console.log(`Inserted: ${insertedCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Total processed: ${allQuestions.length}`);
  console.log(`========================================\n`);

  // Verify final count in DB
  const verify = await query(`
    SELECT COUNT(*)::int AS count 
    FROM question_bank 
    WHERE category = 'Physics' AND chapter = 'Oscillations'
  `);
  console.log(`Final count in question_bank under Physics / Oscillations: ${verify.rows[0].count}`);

  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
