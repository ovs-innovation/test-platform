import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALL_ELECTROCHEM_QUESTIONS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'electrochemistry_jee_final_241.json'), 'utf8')
);

async function syncElectrochemistry() {
  console.log('=== SYNCING ELECTROCHEMISTRY JEE QUESTIONS TO NEON DB ===');
  console.log(`Loaded ${ALL_ELECTROCHEM_QUESTIONS.length} questions from electrochemistry_jee_final_241.json`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Resolve Subject Chemistry
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Chemistry' not found!");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Resolved Subject: Chemistry (ID: ${subjectId})`);

    // 2. Resolve chapter in chapters table
    const chRes = await client.query(`
      SELECT id, name FROM chapters 
      WHERE subject_id = $1 AND LOWER(name) = 'electrochemistry'
      LIMIT 1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      console.log('Creating new chapter "Electrochemistry"...');
      const insCh = await client.query(
        "INSERT INTO chapters (subject_id, name) VALUES ($1, 'Electrochemistry') RETURNING id",
        [subjectId]
      );
      chapterId = insCh.rows[0].id;
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter ID ${chapterId} ("${chRes.rows[0].name}").`);
    }
    console.log(`Final Chapter: "Electrochemistry" (ID: ${chapterId})`);

    // 3. Remove old records for Electrochemistry in JEE Chemistry
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) = 'electrochemistry'
          OR LOWER(chapter) = 'redox reactions & electrochemistry'
        )
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous JEE question_bank records for Electrochemistry.`);

    // 4. Batch insert all 241 questions
    const batchSize = 40;
    let totalInserted = 0;

    for (let i = 0; i < ALL_ELECTROCHEM_QUESTIONS.length; i += batchSize) {
      const batch = ALL_ELECTROCHEM_QUESTIONS.slice(i, i + batchSize);
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
          'Chemistry',                       // $1: category
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
          null,                              // $17: solution_image_url
          'Electrochemistry',                // $18: chapter
          'Electrochemistry',                // $19: topic
          'Chemistry',                       // $20: subject
          'available',                       // $21: status
          'JEE'                              // $22: exam_type
        );

        const rowPlaceholders = [];
        for (let p = 0; p < 22; p++) {
          rowPlaceholders.push(`$${paramIdx++}`);
        }
        placeholders.push(`(${rowPlaceholders.join(', ')})`);
      }

      const insertQuery = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text, marks,
          solution, subject_id, chapter_id, difficulty, image_url, solution_image_url,
          chapter, topic, subject, status, exam_type
        ) VALUES ${placeholders.join(', ')}
      `;

      await client.query(insertQuery, values);
      totalInserted += batch.length;
      console.log(`Inserted batch: ${totalInserted}/${ALL_ELECTROCHEM_QUESTIONS.length}`);
    }

    await client.query('COMMIT');
    console.log(`SUCCESSFULLY INSERTED ${totalInserted} QUESTIONS INTO NEON DB!`);

    // Invalidate Redis caches
    try {
      await delCache('cache:qb:*');
      console.log('Redis cache cleared for question bank.');
    } catch (cErr) {
      console.warn('Redis cache clear warning:', cErr.message);
    }

    // Verify count in DB
    const countCheck = await client.query(`
      SELECT COUNT(*) as total,
             COUNT(*) FILTER (WHERE question_type = 'mcq') as mcq_count,
             COUNT(*) FILTER (WHERE question_type = 'numerical') as num_count,
             COUNT(*) FILTER (WHERE image_url IS NOT NULL) as img_count
      FROM question_bank
      WHERE chapter = 'Electrochemistry' AND exam_type = 'JEE'
    `);
    console.log('VERIFIED IN DB:', countCheck.rows[0]);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('TRANSACTION ERROR:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

syncElectrochemistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
