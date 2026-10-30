import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadMotionInPlaneQuestions(clientOrPool = pool) {
  console.log('[motion in a plane] Starting import of Physics questions...');

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
    console.log(`[motion in a plane] Created Subject 'Physics' (id=${physicsSubjectId})`);
  } else {
    console.log(`[motion in a plane] Found Subject 'Physics' (id=${physicsSubjectId})`);
  }

  // 2. Resolve or verify Chapter 'motion in a plane'
  const chapRes = await clientOrPool.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND (lower(name) = 'motion in a plane' OR lower(name) = 'motion in plane') LIMIT 1",
    [physicsSubjectId]
  );
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const newChap = await clientOrPool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'motion in a plane', 3) RETURNING id",
      [physicsSubjectId]
    );
    chapterId = newChap.rows[0].id;
    console.log(`[motion in a plane] Created Chapter 'motion in a plane' (id=${chapterId})`);
  } else {
    // Ensure name in chapters table is exactly 'motion in a plane'
    await clientOrPool.query(
      "UPDATE chapters SET name = 'motion in a plane' WHERE id = $1",
      [chapterId]
    );
    console.log(`[motion in a plane] Found and updated Chapter 'motion in a plane' (id=${chapterId})`);
  }

  // 3. Load Diagrams
  let diagrams = {};
  const diagPath = path.resolve(__dirname, 'plane_diagrams.json');
  if (fs.existsSync(diagPath)) {
    try {
      diagrams = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
      console.log(`[motion in a plane] Loaded ${Object.keys(diagrams).length} diagrams from plane_diagrams.json`);
    } catch (e) {
      console.warn('[motion in a plane] Warning loading diagrams:', e.message);
    }
  }

  // 4. Load all question files
  const qDir = path.resolve(__dirname, 'motion_in_plane');
  const files = fs.readdirSync(qDir).filter(f => f.endsWith('.json')).sort();

  let allQuestions = [];
  for (const f of files) {
    const fPath = path.resolve(qDir, f);
    try {
      const qs = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      allQuestions = allQuestions.concat(qs);
    } catch (e) {
      console.warn(`[motion in a plane] Error parsing ${f}:`, e.message);
    }
  }

  console.log(`[motion in a plane] Total raw questions loaded: ${allQuestions.length}`);

  // Sort questions by question_number
  allQuestions.sort((a, b) => a.question_number - b.question_number);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const q of allQuestions) {
    const qNum = q.question_number;
    const diagInfo = diagrams[qNum] || diagrams[String(qNum)];
    let imageUrl = q.image_url || diagInfo?.cloudinary_url || diagInfo?.local_url || null;

    let options = Array.isArray(q.options) ? [...q.options] : [];

    // Ensure questions with 4 graph options have clear standardized options
    if (qNum === 59 || qNum === 60) {
      options = ['Graph (1)', 'Graph (2)', 'Graph (3)', 'Graph (4)'];
    }

    const questionType = q.question_type === 'assertion_reason' ? 'assertion_reason' : 'mcq';
    const topic = q.topic || 'Motion in a Plane';
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
          'motion in a plane',
          topic,
          'Physics',
        ]
      );
      insertedCount++;
    }
  }

  console.log(
    `[motion in a plane] Import complete: ${insertedCount} inserted, ${updatedCount} updated. Total: ${allQuestions.length}`
  );
  return { insertedCount, updatedCount, total: allQuestions.length, chapterId, physicsSubjectId };
}

// Standalone execution
if (process.argv[1]?.endsWith('import_motion_in_plane_physics.mjs')) {
  uploadMotionInPlaneQuestions()
    .then(async (res) => {
      // Clear Redis cache if redis is running
      try {
        const { redisClient } = await import('../src/config/redis.js');
        if (redisClient && redisClient.isOpen) {
          await redisClient.del('cache:qb:categories');
          await redisClient.del('cache:qb:questions:Physics');
          await redisClient.del('cache:qb:questions:all');
          console.log('[motion in a plane] Redis Question Bank cache invalidated.');
        }
      } catch (cacheErr) {
        console.log('[motion in a plane] Cache invalidation notice:', cacheErr.message);
      }
      await pool.end();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error('[motion in a plane] Error:', e);
      await pool.end();
      process.exit(1);
    });
}
