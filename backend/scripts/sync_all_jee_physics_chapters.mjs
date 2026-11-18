import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';
import { ALL_MOTION_PYQ_QUESTIONS } from './motion_pyq_questions_data.mjs';
import { ALL_UNITS_PYQ_QUESTIONS } from './units_pyq_questions_data.mjs';
import { SOLIDS_PYQ_QUESTIONS } from './solids_pyq_questions_data.mjs';
import { KTG_PYQ_QUESTIONS } from './ktg_pyq_questions_data.mjs';
import { ALL_MOTION1D_PYQ_QUESTIONS } from './motion1d_pyq_questions_data.mjs';

const CHAPTERS_DATA = [
  {
    name: 'Motion in two dimension',
    aliases: ['motion in two dimension', 'motion in 2d', 'motion in a plane'],
    questions: ALL_MOTION_PYQ_QUESTIONS,
  },
  {
    name: 'Units and dimensions',
    aliases: ['units and dimensions', 'units and measurement', 'units & measurements', 'units & dimensions'],
    questions: ALL_UNITS_PYQ_QUESTIONS,
  },
  {
    name: 'Mechanical Properties of Solids',
    aliases: ['mechanical properties of solids', 'properties of solids', 'elasticity'],
    questions: SOLIDS_PYQ_QUESTIONS,
  },
  {
    name: 'Kinetic Theory of Gases',
    aliases: ['kinetic theory of gases', 'kinetic theory'],
    questions: KTG_PYQ_QUESTIONS,
  },
  {
    name: 'Motion in one Dimension',
    aliases: ['motion in one dimension', 'motion in 1d', 'motion in a straight line', 'motion in straight line', 'rectilinear motion'],
    questions: ALL_MOTION1D_PYQ_QUESTIONS,
  },
];

export async function syncAllJeePhysicsChapters(clientOrPool = pool) {
  console.log('=== STARTING SYNC OF ALL JEE PHYSICS CHAPTERS ===');

  // 1. Resolve Physics subject dynamically
  const subRes = await clientOrPool.query(
    "SELECT id, name FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1"
  );
  if (subRes.rows.length === 0) {
    throw new Error("Subject 'Physics' not found in database!");
  }
  const subjectId = subRes.rows[0].id;
  const subjectName = subRes.rows[0].name;
  console.log(`Resolved Subject: "${subjectName}" (ID: ${subjectId})`);

  let grandTotalInserted = 0;

  for (const chData of CHAPTERS_DATA) {
    console.log(`\n--- Processing Chapter: "${chData.name}" (${chData.questions.length} questions) ---`);

    // 2. Resolve or create Chapter
    const aliasConditions = chData.aliases.map((_, idx) => `LOWER(name) = $${idx + 2}`).join(' OR ');
    const chQuery = `
      SELECT id, name FROM chapters 
      WHERE subject_id = $1 AND (${aliasConditions})
      ORDER BY id ASC
      LIMIT 1
    `;
    const chParams = [subjectId, ...chData.aliases.map(a => a.toLowerCase())];
    let chRes = await clientOrPool.query(chQuery, chParams);

    let chapterId;
    if (chRes.rows.length === 0) {
      console.log(`Creating new chapter "${chData.name}"...`);
      const insCh = await clientOrPool.query(
        "INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id, name",
        [subjectId, chData.name]
      );
      chapterId = insCh.rows[0].id;
      console.log(`Created chapter ID: ${chapterId}`);
    } else {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter: "${chRes.rows[0].name}" (ID: ${chapterId})`);
    }

    // 3. Clean up existing records for this chapter in JEE Physics
    const delRes = await clientOrPool.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND (
          chapter_id = $1 
          OR LOWER(chapter) = $2
          OR (${chData.aliases.map((_, i) => `LOWER(chapter) = $${i + 3}`).join(' OR ')})
        )
    `, [chapterId, chData.name.toLowerCase(), ...chData.aliases.map(a => a.toLowerCase())]);
    console.log(`Removed ${delRes.rowCount} previous question_bank records for "${chData.name}".`);

    // 4. Insert questions in batches
    const batchSize = 40;
    let chapterInserted = 0;

    for (let i = 0; i < chData.questions.length; i += batchSize) {
      const batch = chData.questions.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = q.question_type === 'numerical';
        let optionsJson, correctIndex, correctIndicesJson, numericAnswer, tolerance;

        if (isNum) {
          optionsJson = '[]';
          correctIndex = null;
          correctIndicesJson = '[]';
          numericAnswer = Number(q.numeric_answer ?? 0);
          tolerance = 0;
        } else {
          const formattedOpts = (q.options || []).map((text, idx) => ({
            id: ['A', 'B', 'C', 'D'][idx] || String(idx),
            text: String(text).trim(),
          }));
          optionsJson = JSON.stringify(formattedOpts);
          correctIndex = Number(q.correct_option ?? 0);
          correctIndicesJson = JSON.stringify([correctIndex]);
          numericAnswer = null;
          tolerance = null;
        }

        values.push(
          'Physics',                           // $1: category (strictly 'Physics' in JEE)
          isNum ? 'numerical' : 'mcq',         // $2: question_type
          q.question,                          // $3: question_text
          optionsJson,                         // $4: options
          correctIndex,                        // $5: correct_index
          correctIndicesJson,                  // $6: correct_indices
          numericAnswer,                       // $7: numeric_answer
          tolerance,                           // $8: numerical_tolerance
          null,                                // $9: assertion_text
          null,                                // $10: reason_text
          q.marks || 4,                        // $11: marks
          q.solution || '',                    // $12: solution
          subjectId,                           // $13: subject_id
          chapterId,                           // $14: chapter_id
          q.difficulty || 'medium',            // $15: difficulty
          q.image_url || null,                 // $16: image_url
          null,                                // $17: solution_image_url
          chData.name,                         // $18: chapter
          chData.name,                         // $19: topic
          subjectName,                         // $20: subject
          'available',                         // $21: status
          'JEE'                                // $22: exam_type
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

      await clientOrPool.query(insertSql, values);
      chapterInserted += batch.length;
    }

    grandTotalInserted += chapterInserted;
    console.log(`Successfully inserted ${chapterInserted} questions for "${chData.name}".`);
  }

  // 5. Invalidate question bank cache keys
  try {
    await delCache('cache:qb:*');
    console.log('\n[Cache] Invalidated Redis/memory cache keys matching cache:qb:*');
  } catch (cErr) {
    console.warn('[Cache] Cache invalidation notice:', cErr?.message || cErr);
  }

  // 6. Summary verification
  const summaryRes = await clientOrPool.query(`
    SELECT chapter, COUNT(*)::int as count 
    FROM question_bank 
    WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'
    GROUP BY chapter 
    ORDER BY chapter
  `);
  console.log('\n=== FINAL DATABASE VERIFICATION (JEE Physics) ===');
  console.table(summaryRes.rows);

  const totalRes = await clientOrPool.query(`
    SELECT COUNT(*)::int as total
    FROM question_bank
    WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'
  `);
  console.log(`TOTAL JEE PHYSICS QUESTIONS IN DATABASE: ${totalRes.rows[0].total}`);

  return totalRes.rows[0].total;
}

// Auto-run if executed directly as script
const isMain = process.argv[1] && process.argv[1].endsWith('sync_all_jee_physics_chapters.mjs');
if (isMain) {
  syncAllJeePhysicsChapters()
    .then((count) => {
      console.log(`Sync completed successfully. Total: ${count} questions.`);
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal error during sync:', err);
      process.exit(1);
    });
}
