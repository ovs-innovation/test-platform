import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rebuild final dataset with all diagram URLs
const draft = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'alcohols_jee_full_draft.json'), 'utf8'));
const urlCacheFile = path.resolve(__dirname, 'alcohols_jee_diagram_urls.json');
let urlCache = {};
if (fs.existsSync(urlCacheFile)) {
  try {
    urlCache = JSON.parse(fs.readFileSync(urlCacheFile, 'utf8'));
  } catch (_) {}
}

const ALL_QUESTIONS = draft.map((q) => {
  const qNum = q.question_number;
  const diagramKey = `alcohols_jee_q${qNum}`;
  const diagramUrl = urlCache[diagramKey] || null;

  let formattedOptions = [];
  if (q.question_type !== 'numerical') {
    formattedOptions = q.options.map((optText, idx) => {
      const key = String.fromCharCode(65 + idx);
      let text = optText;
      if (!text || text === `(${key})` || text.trim() === '') {
        text = `Structure (${key})`;
      }
      return {
        key,
        text,
        image_url: ''
      };
    });
  }

  return {
    ...q,
    options: formattedOptions,
    image_url: diagramUrl,
    solution_image_url: null,
    difficulty: 'medium',
    status: 'available',
    is_approved: true
  };
});

// Save final 190 questions
fs.writeFileSync(path.resolve(__dirname, 'alcohols_jee_final_190.json'), JSON.stringify(ALL_QUESTIONS, null, 2));
console.log(`Saved final 190 questions to alcohols_jee_final_190.json`);

async function syncAlcoholsJEE() {
  console.log('=== SYNCING ALCOHOLS, PHENOLS AND ETHERS JEE QUESTIONS (190) TO NEON DB ===');
  console.log(`Loaded ${ALL_QUESTIONS.length} questions.`);

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

    // 2. Resolve Chapter in chapters table
    const chRes = await client.query(`
      SELECT id, name FROM chapters 
      WHERE subject_id = $1 AND (LOWER(name) LIKE '%alcohol%' OR LOWER(name) LIKE '%phenol%')
      ORDER BY id ASC
      LIMIT 1
    `, [subjectId]);

    let chapterId;
    if (chRes.rows.length === 0) {
      console.log('Creating new chapter "Alcohols, Phenols and Ethers"...');
      const insCh = await client.query(
        "INSERT INTO chapters (subject_id, name) VALUES ($1, 'Alcohols, Phenols and Ethers') RETURNING id",
        [subjectId]
      );
      chapterId = insCh.rows[0].id;
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter ID ${chapterId} ("${chRes.rows[0].name}").`);
    }
    console.log(`Final Chapter: "Alcohols, Phenols and Ethers" (ID: ${chapterId})`);

    // 3. Remove old records for JEE Alcohols, Phenols and Ethers (keep NEET intact!)
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) LIKE '%alcohol%'
          OR LOWER(chapter) LIKE '%phenol%'
        )
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous JEE question_bank records for Alcohols, Phenols and Ethers.`);

    // 4. Batch insert all 190 questions
    const batchSize = 40;
    let totalInserted = 0;

    for (let i = 0; i < ALL_QUESTIONS.length; i += batchSize) {
      const batch = ALL_QUESTIONS.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = (q.question_type === 'numerical');
        const optionsJson = JSON.stringify(q.options || []);
        const correctIndex = isNum ? null : q.correct_index;
        const correctIndicesJson = isNum ? '[]' : JSON.stringify(q.correct_indices || [q.correct_index]);
        const numericAnswer = isNum ? (q.numeric_answer !== null ? Number(q.numeric_answer) : null) : null;
        const tolerance = isNum ? 0 : null;

        values.push(
          'Chemistry',                               // $1: category
          isNum ? 'numerical' : 'mcq',               // $2: question_type
          q.question_text,                           // $3: question_text
          optionsJson,                               // $4: options
          correctIndex,                              // $5: correct_index
          correctIndicesJson,                        // $6: correct_indices
          numericAnswer,                             // $7: numeric_answer
          tolerance,                                 // $8: numerical_tolerance
          null,                                      // $9: assertion_text
          null,                                      // $10: reason_text
          q.marks || 4,                              // $11: marks
          q.solution || '',                          // $12: solution
          subjectId,                                 // $13: subject_id
          chapterId,                                 // $14: chapter_id
          'medium',                                  // $15: difficulty
          q.image_url || null,                       // $16: image_url
          q.solution_image_url || null,              // $17: solution_image_url
          'Alcohols, Phenols and Ethers',             // $18: chapter
          'Alcohols, Phenols and Ethers',             // $19: topic
          'JEE',                                     // $20: exam_type
          'available'                                // $21: status
        );

        const rowPlaceholders = [];
        for (let p = 0; p < 21; p++) {
          rowPlaceholders.push(`$${paramIdx++}`);
        }
        placeholders.push(`(${rowPlaceholders.join(', ')})`);
      }

      const insertQuery = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, numeric_answer, numerical_tolerance,
          assertion_text, reason_text, marks, solution, subject_id,
          chapter_id, difficulty, image_url, solution_image_url,
          chapter, topic, exam_type, status
        ) VALUES ${placeholders.join(', ')}
      `;

      await client.query(insertQuery, values);
      totalInserted += batch.length;
      console.log(`Inserted batch: ${totalInserted}/${ALL_QUESTIONS.length} questions...`);
    }

    await client.query('COMMIT');
    console.log(`\nSUCCESS: Successfully committed ${totalInserted} Alcohols JEE questions into question_bank!`);

    // Invalidate Redis caches
    try {
      console.log('Invalidating Redis caches...');
      await delCache('cache:qb:*');
      await delCache('qb*');
      await delCache('*chemistry*');
      await delCache('*alcohol*');
      await delCache('*phenol*');
      console.log('Redis caches successfully invalidated.');
    } catch (cacheErr) {
      console.warn('Cache invalidation notice:', cacheErr.message);
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('FAILED to sync Alcohols:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

syncAlcoholsJEE().then(() => {
  console.log('Sync finished.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
