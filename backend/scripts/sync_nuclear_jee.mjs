import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALL_NUCLEAR_QUESTIONS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'nuclear_jee_final_170.json'), 'utf8')
);

export async function syncNuclear() {
  console.log('=== SYNCING NUCLEAR JEE QUESTIONS TO NEON DB ===');
  console.log(`Loaded ${ALL_NUCLEAR_QUESTIONS.length} questions from nuclear_jee_final_170.json`);

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

    // 2. Resolve chapter 'Nuclear' (ID 147)
    let chapterId = 147;
    const chRes = await client.query("SELECT id, name FROM chapters WHERE id = 147 AND subject_id = $1", [subjectId]);
    if (chRes.rows.length === 0) {
      // Find by name 'Nuclear'
      const chByName = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'nuclear' LIMIT 1", [subjectId]);
      if (chByName.rows.length > 0) {
        chapterId = chByName.rows[0].id;
      } else {
        const insCh = await client.query("INSERT INTO chapters (id, subject_id, name) VALUES (147, $1, 'Nuclear') RETURNING id", [subjectId]);
        chapterId = insCh.rows[0].id;
      }
    }
    console.log(`Unified Chapter for Nuclear: ID ${chapterId}`);

    // Update any references to old chapter 108 to point to 147
    await client.query("UPDATE questions SET chapter_id = $1 WHERE chapter_id = 108", [chapterId]);
    await client.query("UPDATE question_bank SET chapter_id = $1 WHERE chapter_id = 108", [chapterId]);
    await client.query("DELETE FROM chapters WHERE id = 108");
    console.log(`Migrated chapter 108 into unified chapter ${chapterId} ("Nuclear").`);

    // 3. Remove old records for Nuclear in JEE Physics
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) = 'nuclear'
          OR LOWER(chapter) = 'nuclear physics'
          OR LOWER(chapter) = 'nuclei'
          OR LOWER(chapter) = 'nucleus'
        )
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous question_bank records for Nuclear.`);

    // 4. Batch insert all 170 questions
    const batchSize = 40;
    let totalInserted = 0;

    for (let i = 0; i < ALL_NUCLEAR_QUESTIONS.length; i += batchSize) {
      const batch = ALL_NUCLEAR_QUESTIONS.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = q.question_type === 'numerical';
        const formattedOpts = (q.options || []).map((opt, idx) => {
          const defaultKey = ['A', 'B', 'C', 'D'][idx] || String(idx);
          if (typeof opt === 'object' && opt !== null) {
            return {
              id: opt.id || opt.key || defaultKey,
              key: opt.key || opt.id || defaultKey,
              text: String(opt.text ?? opt.option_text ?? '').trim(),
              image_url: opt.image_url || ''
            };
          }
          return {
            id: defaultKey,
            key: defaultKey,
            text: String(opt ?? '').trim(),
            image_url: ''
          };
        });

        const optionsJson = JSON.stringify(formattedOpts);
        let correctIndex;
        if (q.correct_index !== null && q.correct_index !== undefined) {
          correctIndex = Number(q.correct_index);
        } else if (q.correct_option !== null && q.correct_option !== undefined) {
          correctIndex = Number(q.correct_option);
        } else {
          correctIndex = 0;
        }

        const correctIndicesJson = isNum ? '[]' : JSON.stringify([correctIndex]);
        const numericAnswer = isNum ? Number(q.numeric_answer ?? (parseFloat(q.correct_answer) || 0)) : null;
        const tolerance = isNum ? 0 : null;
        const qText = String(q.question_text || q.question || '').trim();
        const imgUrl = q.image_url || null;
        const solImgUrl = q.solution_image_url || null;

        values.push(
          'Physics',                         // $1: category
          isNum ? 'numerical' : 'mcq',       // $2: question_type
          qText,                             // $3: question_text
          optionsJson,                       // $4: options
          isNum ? null : correctIndex,       // $5: correct_index
          correctIndicesJson,                // $6: correct_indices
          numericAnswer,                     // $7: numeric_answer
          tolerance,                         // $8: numerical_tolerance
          null,                              // $9: assertion_text
          null,                              // $10: reason_text
          q.marks || 4,                      // $11: marks
          q.solution || '',                  // $12: solution
          subjectId,                         // $13: subject_id
          chapterId,                         // $14: chapter_id
          q.difficulty || 'medium',          // $15: difficulty
          imgUrl,                            // $16: image_url
          solImgUrl,                         // $17: solution_image_url
          'Nuclear',                         // $18: chapter
          'Nuclear',                         // $19: topic
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
    }

    await client.query('COMMIT');
    console.log(`Successfully committed ${totalInserted} Nuclear questions to Neon DB.`);

    // 5. Invalidate caches
    try {
      await delCache('cache:qb:*');
      console.log('Successfully invalidated Redis cache keys.');
    } catch (cErr) {
      console.warn('Redis cache notice:', cErr?.message || cErr);
    }

    // 6. Verify total
    const totalRes = await client.query(`
      SELECT count(*) as total 
      FROM question_bank 
      WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'
    `);
    console.log(`TOTAL JEE PHYSICS QUESTIONS IN DB: ${totalRes.rows[0].total}`);

    const nRes = await client.query(`
      SELECT count(*) as n_count 
      FROM question_bank 
      WHERE exam_type = 'JEE' AND LOWER(category) = 'physics' AND chapter = 'Nuclear'
    `);
    console.log(`TOTAL NUCLEAR QUESTIONS IN JEE PHYSICS: ${nRes.rows[0].n_count}`);

    return totalRes.rows[0].total;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error syncing Nuclear questions:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

const isMain = process.argv[1] && process.argv[1].endsWith('sync_nuclear_jee.mjs');
if (isMain) {
  syncNuclear()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
