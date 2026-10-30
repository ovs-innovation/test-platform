import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadMotionStraightLineQuestions(clientOrPool = pool) {
  console.log('[Motion in straight line] Starting import of Physics questions...');

  // 1. Resolve or verify Subject 'Physics'
  const subRes = await clientOrPool.query(
    "SELECT id FROM subjects WHERE lower(name) = 'physics' LIMIT 1"
  );
  let physicsSubjectId = subRes.rows[0]?.id;
  if (!physicsSubjectId) {
    const newSub = await clientOrPool.query(
      "INSERT INTO subjects (name, slug, exam_type, active) VALUES ('Physics', 'physics', 'NEET', true) RETURNING id"
    );
    physicsSubjectId = newSub.rows[0].id;
    console.log(`[Motion in straight line] Created Subject 'Physics' (id=${physicsSubjectId})`);
  } else {
    console.log(`[Motion in straight line] Found Subject 'Physics' (id=${physicsSubjectId})`);
  }

  // 2. Resolve or verify Chapter 'Motion in straight line'
  const chapRes = await clientOrPool.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND (lower(name) = 'motion in straight line' OR lower(name) = 'motion in a straight line') LIMIT 1",
    [physicsSubjectId]
  );
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const newChap = await clientOrPool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Motion in straight line', 2) RETURNING id",
      [physicsSubjectId]
    );
    chapterId = newChap.rows[0].id;
    console.log(`[Motion in straight line] Created Chapter 'Motion in straight line' (id=${chapterId})`);
  } else {
    // Ensure name in chapters table is exactly 'Motion in straight line'
    await clientOrPool.query(
      "UPDATE chapters SET name = 'Motion in straight line' WHERE id = $1",
      [chapterId]
    );
    console.log(`[Motion in straight line] Found and updated Chapter 'Motion in straight line' (id=${chapterId})`);
  }

  // 3. Load Diagrams
  let diagrams = {};
  const diagPath = path.resolve(__dirname, 'motion_diagrams.json');
  if (fs.existsSync(diagPath)) {
    try {
      diagrams = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
      console.log(`[Motion in straight line] Loaded ${Object.keys(diagrams).length} diagrams from motion_diagrams.json`);
    } catch (e) {
      console.warn('[Motion in straight line] Warning loading diagrams:', e.message);
    }
  }

  // 4. Load all question files
  const qDir = path.resolve(__dirname, 'motion_straight_line');
  const files = fs.readdirSync(qDir).filter(f => f.endsWith('.json')).sort();

  let allQuestions = [];
  for (const f of files) {
    const fPath = path.resolve(qDir, f);
    try {
      const qs = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      allQuestions = allQuestions.concat(qs);
    } catch (e) {
      console.warn(`[Motion in straight line] Error parsing ${f}:`, e.message);
    }
  }

  console.log(`[Motion in straight line] Total raw questions loaded: ${allQuestions.length}`);

  // Sort questions by question_number
  allQuestions.sort((a, b) => a.question_number - b.question_number);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const q of allQuestions) {
    const qNum = q.question_number;
    let imageUrl = q.image_url || diagrams[qNum] || diagrams[String(qNum)] || null;

    let options = Array.isArray(q.options) ? [...q.options] : [];

    // Ensure questions with 4 graph options have clear standardized options
    const graphOptionQuestions = [19, 22, 25, 26, 29, 35, 46, 49, 62, 65, 67, 77, 81, 83, 84, 88];
    if (graphOptionQuestions.includes(qNum)) {
      if (options.length === 4 && (options[0].toLowerCase().includes('graph') || options[0].includes('('))) {
        options = ['Graph (1)', 'Graph (2)', 'Graph (3)', 'Graph (4)'];
      }
    }

    const questionType = q.question_type === 'assertion_reason' ? 'assertion_reason' : 'mcq';
    const topic = q.topic || 'Motion in a Straight Line';
    const marks = q.marks || 4;
    const difficulty = q.difficulty || 'medium';
    const solution = q.solution || '';
    const assertionText = q.assertion_text || null;
    const reasonText = q.reason_text || null;
    const correctIndex = typeof q.correct_index === 'number' ? q.correct_index : 0;
    const correctIndices = JSON.stringify([correctIndex]);

    const trimmedText = q.question_text.trim();

    // Check if existing question matches subject_id, chapter_id, and question_text
    const existRes = await clientOrPool.query(
      `SELECT id FROM question_bank 
       WHERE subject_id = $1 
         AND chapter_id = $2 
         AND question_text = $3
       LIMIT 1`,
      [physicsSubjectId, chapterId, trimmedText]
    );

    if (existRes.rows.length > 0) {
      // Question already exists in bank - preserve any admin edits, do not overwrite!
      continue;
    } else {
      await clientOrPool.query(
        `INSERT INTO question_bank (
           category, question_type, question_text, options, correct_index, correct_indices,
           numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
           subject_id, chapter_id, difficulty, image_url, chapter, topic, subject
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
        [
          'Physics',
          questionType,
          trimmedText,
          JSON.stringify(options),
          correctIndex,
          correctIndices,
          null,
          0,
          assertionText,
          reasonText,
          marks,
          solution,
          physicsSubjectId,
          chapterId,
          difficulty,
          imageUrl,
          'Motion in straight line',
          topic,
          'Physics',
        ]
      );
      insertedCount++;
    }
  }

  console.log(
    `[Motion in straight line] Import complete: ${insertedCount} inserted, ${updatedCount} updated. Total: ${allQuestions.length}`
  );
  return { insertedCount, updatedCount, total: allQuestions.length, chapterId, physicsSubjectId };
}

// Standalone execution
if (process.argv[1]?.endsWith('import_motion_straight_line_physics.mjs')) {
  uploadMotionStraightLineQuestions()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error('[Motion in straight line] Error:', e);
      await pool.end();
      process.exit(1);
    });
}
