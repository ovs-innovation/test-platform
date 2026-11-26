import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';
import { ALL_MOTION_PYQ_QUESTIONS } from './motion_pyq_questions_data.mjs';
import { ALL_UNITS_PYQ_QUESTIONS } from './units_pyq_questions_data.mjs';
import { SOLIDS_PYQ_QUESTIONS } from './solids_pyq_questions_data.mjs';
import { KTG_PYQ_QUESTIONS } from './ktg_pyq_questions_data.mjs';
import { ALL_MOTION1D_PYQ_QUESTIONS } from './motion1d_pyq_questions_data.mjs';
import { ALL_LOM_PYQ_QUESTIONS } from './lom_pyq_questions_data.mjs';
import { ALL_COM_PYQ_QUESTIONS } from './com_pyq_questions_data.mjs';
import { ALL_FLUIDS_PYQ_QUESTIONS } from './fluids_pyq_questions_data.mjs';
import { ALL_ATOMIC_QUESTIONS } from './atomic_jee_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ALL_NUCLEAR_QUESTIONS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'nuclear_jee_final_170.json'), 'utf8')
);
const ALL_SEMICONDUCTOR_QUESTIONS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'semiconductor_jee_final_251.json'), 'utf8')
);

const CHAPTERS_DATA = [
  {
    name: 'Semiconductor',
    aliases: ['semiconductor', 'semiconductors', 'semiconductor electronics', 'semiconductor devices', 'electronic devices'],
    questions: ALL_SEMICONDUCTOR_QUESTIONS,
  },
  {
    name: 'Atomic',
    aliases: ['atomic', 'atomic physics', 'atoms', 'atom'],
    questions: ALL_ATOMIC_QUESTIONS,
  },
  {
    name: 'Nuclear',
    aliases: ['nuclear', 'nuclear physics', 'nuclei', 'nucleus'],
    questions: ALL_NUCLEAR_QUESTIONS,
  },
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
  {
    name: 'Laws of Motion',
    aliases: ['laws of motion', 'newtons laws of motion', 'newton laws of motion', 'nlm', 'law of motion'],
    questions: ALL_LOM_PYQ_QUESTIONS,
  },
  {
    name: 'Center of mass momentum and collision',
    aliases: ['center of mass momentum and collision', 'center of mass and collision', 'center of mass, momentum and collision', 'center of mass', 'com'],
    questions: ALL_COM_PYQ_QUESTIONS,
  },
  {
    name: 'Mechanical properties of fluids',
    aliases: ['mechanical properties of fluids', 'properties of fluids', 'fluids', 'fluid mechanics', 'fluid statics and dynamics'],
    questions: ALL_FLUIDS_PYQ_QUESTIONS,
  },
];

export async function syncAllJeePhysicsChapters(clientOrPool = pool) {
  console.log('=== STARTING SYNC OF ALL JEE PHYSICS CHAPTERS ===');

  // 1. Resolve Physics subject dynamically (or create if missing)
  let subRes = await clientOrPool.query(
    "SELECT id, name FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1"
  );
  let subjectId, subjectName;
  if (subRes.rows.length === 0) {
    console.log("Subject 'Physics' not found in database, creating it...");
    const insSub = await clientOrPool.query(
      "INSERT INTO subjects (name) VALUES ('Physics') RETURNING id, name"
    );
    subjectId = insSub.rows[0].id;
    subjectName = insSub.rows[0].name;
  } else {
    subjectId = subRes.rows[0].id;
    subjectName = subRes.rows[0].name;
  }
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
          numericAnswer = Number(q.numeric_answer ?? (parseFloat(q.correct_answer) || 0));
          tolerance = 0;
        } else {
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
          optionsJson = JSON.stringify(formattedOpts);

          if (q.correct_index !== null && q.correct_index !== undefined) {
            correctIndex = Number(q.correct_index);
          } else if (q.correct_option !== null && q.correct_option !== undefined) {
            correctIndex = Number(q.correct_option);
          } else {
            correctIndex = 0;
          }
          correctIndicesJson = JSON.stringify([correctIndex]);
          numericAnswer = null;
          tolerance = null;
        }

        const questionText = String(q.question_text || q.question || '').trim();
        const imgUrl = q.image_url || null;
        const solImgUrl = q.solution_image_url || null;

        values.push(
          'Physics',                           // $1: category (strictly 'Physics' in JEE)
          isNum ? 'numerical' : 'mcq',         // $2: question_type
          questionText,                        // $3: question_text
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
          imgUrl,                              // $16: image_url
          solImgUrl,                           // $17: solution_image_url
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
syncAllJeePhysicsChapters()
  .then((count) => {
    console.log(`Sync completed successfully. Total: ${count} questions.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during sync:', err);
    process.exit(1);
  });
