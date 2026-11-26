import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALL_SEMICONDUCTOR_QUESTIONS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'semiconductor_jee_final_251.json'), 'utf8')
);

async function syncSemiconductor() {
  console.log('=== SYNCING SEMICONDUCTOR JEE QUESTIONS TO NEON DB ===');
  console.log(`Loaded ${ALL_SEMICONDUCTOR_QUESTIONS.length} questions from semiconductor_jee_final_251.json`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Resolve Subject Physics
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found!");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Resolved Subject: Physics (ID: ${subjectId})`);

    // 2. Resolve or rename chapter in chapters table
    const chRes = await client.query(`
      SELECT id, name FROM chapters 
      WHERE subject_id = $1 AND (
        LOWER(name) = 'semiconductor' OR 
        LOWER(name) = 'semiconductors' OR 
        LOWER(name) = 'semiconductor electronics' OR
        LOWER(name) = 'semiconductor devices'
      )
      LIMIT 1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      console.log('Creating new chapter "Semiconductor"...');
      const insCh = await client.query(
        "INSERT INTO chapters (subject_id, name) VALUES ($1, 'Semiconductor') RETURNING id",
        [subjectId]
      );
      chapterId = insCh.rows[0].id;
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter ID ${chapterId} ("${chRes.rows[0].name}"). Renaming to "Semiconductor"...`);
      await client.query("UPDATE chapters SET name = 'Semiconductor' WHERE id = $1", [chapterId]);
    }
    console.log(`Final Chapter: "Semiconductor" (ID: ${chapterId})`);

    // 3. Remove old records for Semiconductor in JEE Physics
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) = 'semiconductor'
          OR LOWER(chapter) = 'semiconductors'
          OR LOWER(chapter) = 'semiconductor electronics'
          OR LOWER(chapter) = 'semiconductor devices'
        )
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous question_bank records for Semiconductor.`);

    // 4. Batch insert all 251 questions
    const batchSize = 40;
    let totalInserted = 0;

    for (let i = 0; i < ALL_SEMICONDUCTOR_QUESTIONS.length; i += batchSize) {
      const batch = ALL_SEMICONDUCTOR_QUESTIONS.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = q.question_type === 'numerical';
        const optionsJson = JSON.stringify(q.options || []);
        const correctIndex = isNum ? null : q.correct_index;
        const correctIndicesJson = isNum ? '[]' : JSON.stringify(q.correct_indices || [q.correct_index]);
        const numericAnswer = isNum ? Number(q.numeric_answer) : null;
        const tolerance = isNum ? 0 : null;

        values.push(
          'Physics',                         // $1: category
          isNum ? 'numerical' : 'mcq',       // $2: question_type
          q.question_text,                   // $3: question_text
          optionsJson,                       // $4: options
          correctIndex,                      // $5: correct_index
          correctIndicesJson,                // $6: correct_indices
          numericAnswer,                     // $7: numeric_answer
          tolerance,                         // $8: numerical_tolerance
          null,                              // $9: assertion_text
          null,                              // $10: reason_text
          q.marks || 4,                      // $11: marks
          q.solution || '',                  // $12: solution
          subjectId,                         // $13: subject_id
          chapterId,                         // $14: chapter_id
          'medium',                          // $15: difficulty
          q.image_url || null,               // $16: image_url
          q.solution_image_url || null,      // $17: solution_image_url
          'Semiconductor',                   // $18: chapter
          'Semiconductor',                   // $19: topic
          'Physics',                         // $20: subject
          'available',                       // $21: status
          'JEE'                              // $22: exam_type
        );

        placeholders.push(`(
          $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
          $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
          $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
          $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++},
          $${paramIdx++}, $${paramIdx++}
        )`);
      }

      const insertSql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
          subject_id, chapter_id, difficulty, image_url, solution_image_url, chapter, topic, subject, status, exam_type
        ) VALUES ${placeholders.join(', ')}
      `;

      await client.query(insertSql, values);
      totalInserted += batch.length;
      console.log(`Inserted batch ${Math.min(totalInserted, ALL_SEMICONDUCTOR_QUESTIONS.length)} / ${ALL_SEMICONDUCTOR_QUESTIONS.length}`);
    }

    await client.query('COMMIT');
    console.log(`Successfully committed all ${totalInserted} questions!`);

    // 5. Invalidate caches
    try {
      await delCache('cache:qb:*');
      await delCache('cache:qb:categories*');
      await delCache('cache:qb:list*');
      console.log('Redis caches successfully invalidated.');
    } catch (cacheErr) {
      console.warn('Cache invalidation notice:', cacheErr.message);
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error syncing questions, rolled back:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

syncSemiconductor()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
