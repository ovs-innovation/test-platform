import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function syncAminesJEE() {
  console.log('=== SYNCING AMINES JEE QUESTIONS TO NEON DB ===');

  const jsonPath = path.join(__dirname, 'amines_jee_final_222.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('amines_jee_final_222.json does not exist yet!');
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${questions.length} questions from amines_jee_final_222.json.`);

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

    // 2. Resolve Chapter ID 118
    const chRes = await client.query("SELECT id, name FROM chapters WHERE id = 118 LIMIT 1");
    let chapterId = 118;
    let chapterName = 'Organic Compounds Containing Nitrogen';
    if (chRes.rows.length > 0) {
      chapterName = chRes.rows[0].name;
      console.log(`Found existing chapter ID ${chapterId} ("${chapterName}").`);
    }

    // 3. Check NEET count to preserve
    const neetRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE (chapter_id = $1 OR LOWER(chapter) LIKE '%amine%' OR LOWER(chapter) LIKE '%nitrogen%') AND (exam_type = 'NEET')",
      [chapterId]
    );
    const neetCount = parseInt(neetRes.rows[0].count, 10);
    console.log(`Found ${neetCount} NEET questions for chapter ${chapterId}. Preserving all of them.`);

    // 4. Delete existing JEE questions for this chapter
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) = 'amines'
          OR LOWER(chapter) LIKE '%amine%'
          OR LOWER(chapter) LIKE '%nitrogen%'
        )
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous JEE question_bank records for Amines.`);

    // 5. Batch insert all 222 questions
    const batchSize = 40;
    let totalInserted = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = q.question_type === 'numerical';
        const optionsJson = JSON.stringify(q.options || []);

        let correctIndex = null;
        let correctIndices = [];
        if (!isNum) {
          const letter = String(q.correct_option).trim().toUpperCase();
          if (letter === 'A') correctIndex = 0;
          else if (letter === 'B') correctIndex = 1;
          else if (letter === 'C') correctIndex = 2;
          else if (letter === 'D') correctIndex = 3;
          if (correctIndex !== null) correctIndices = [correctIndex];
        }

        const correctIndicesJson = isNum ? '[]' : JSON.stringify(correctIndices);
        const numericAnswer = isNum ? (Number(q.correct_option) || 0) : null;
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
          q.solution_image_url || null,      // $17: solution_image_url
          'Amines',                          // $18: chapter
          'Amines',                          // $19: topic
          'JEE',                             // $20: exam_type
          'normal'                           // $21: status
        );

        const rowPlaceholders = [];
        for (let p = 0; p < 21; p++) {
          rowPlaceholders.push(`$${paramIdx++}`);
        }
        placeholders.push(`(${rowPlaceholders.join(', ')})`);
      }

      const insertQuery = `
        INSERT INTO question_bank (
          category,
          question_type,
          question_text,
          options,
          correct_index,
          correct_indices,
          numeric_answer,
          numerical_tolerance,
          assertion_text,
          reason_text,
          marks,
          solution,
          subject_id,
          chapter_id,
          difficulty,
          image_url,
          solution_image_url,
          chapter,
          topic,
          exam_type,
          status
        ) VALUES ${placeholders.join(', ')}
      `;

      await client.query(insertQuery, values);
      totalInserted += batch.length;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} (${totalInserted}/${questions.length})`);
    }

    await client.query('COMMIT');
    console.log(`Successfully committed all ${totalInserted} Amines JEE questions to database!`);

    // Invalidate Redis cache if available
    try {
      const { createClient } = await import('redis');
      if (process.env.REDIS_URL) {
        const redisClient = createClient({ url: process.env.REDIS_URL });
        await redisClient.connect();
        const keys = await redisClient.keys('*qb*');
        if (keys.length > 0) {
          await redisClient.del(keys);
          console.log(`Cleared ${keys.length} Redis QB cache keys.`);
        }
        await redisClient.disconnect();
      }
    } catch (cacheErr) {
      console.warn('Redis cache clear note:', cacheErr.message);
    }

    console.log('=== SYNC COMPLETED SUCCESSFULLY ===');
    process.exit(0);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during sync:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

syncAminesJEE().catch(err => {
  console.error(err);
  process.exit(1);
});
