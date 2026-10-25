import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadUnitsMeasurementsQuestions(clientOrPool = pool) {
  console.log('[Units & Measurements] Starting import of Physics questions...');

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
    console.log(`[Units & Measurements] Created Subject 'Physics' (id=${physicsSubjectId})`);
  } else {
    console.log(`[Units & Measurements] Found Subject 'Physics' (id=${physicsSubjectId})`);
  }

  // 2. Resolve or verify Chapter 'Units and Measurements'
  const chapRes = await clientOrPool.query(
    "SELECT id FROM chapters WHERE subject_id = $1 AND (lower(name) = 'units and measurements' OR lower(name) = 'units & measurements') LIMIT 1",
    [physicsSubjectId]
  );
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const newChap = await clientOrPool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Units and Measurements', 1) RETURNING id",
      [physicsSubjectId]
    );
    chapterId = newChap.rows[0].id;
    console.log(`[Units & Measurements] Created Chapter 'Units and Measurements' (id=${chapterId})`);
  } else {
    console.log(`[Units & Measurements] Found Chapter 'Units and Measurements' (id=${chapterId})`);
  }

  // 3. Load Diagrams
  let diagrams = {};
  const diagPath = path.resolve(__dirname, 'physics_diagrams.json');
  if (fs.existsSync(diagPath)) {
    try {
      diagrams = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
      console.log('[Units & Measurements] Loaded diagrams:', diagrams);
    } catch (e) {
      console.warn('[Units & Measurements] Warning loading diagrams:', e.message);
    }
  }

  // 4. Load all question files
  const files = [
    'page1_extracted.json',
    'part_11_23.json',
    'part_24_41.json',
    'part_42_57.json',
    'part_58_71.json',
    'part_86_101.json',
    'part_102_117.json',
    'part_118_121.json',
  ];

  let allQuestions = [];
  for (const f of files) {
    const fPath = path.resolve(__dirname, 'units_measurements', f);
    if (fs.existsSync(fPath)) {
      const qs = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      allQuestions = allQuestions.concat(qs);
    } else {
      console.warn(`[Units & Measurements] Missing question file: ${f}`);
    }
  }

  console.log(`[Units & Measurements] Total raw questions loaded: ${allQuestions.length}`);

  // Sort questions by question_number
  allQuestions.sort((a, b) => a.question_number - b.question_number);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const q of allQuestions) {
    const qNum = q.question_number;
    let imageUrl = q.image_url || diagrams[qNum] || diagrams[String(qNum)] || null;

    // Special customization for diagram questions
    let options = Array.isArray(q.options) ? [...q.options] : [];
    if (qNum === 52) {
      imageUrl = diagrams[52] || diagrams['52'] || imageUrl;
      options = ['Graph (1)', 'Graph (2)', 'Graph (3)', 'Graph (4)'];
    }
    if (qNum === 9) {
      imageUrl = diagrams[9] || diagrams['9'] || imageUrl;
    }

    const questionType = q.question_type === 'assertion_reason' ? 'assertion_reason' : 'mcq';
    const topic = q.topic || 'Units & Measurements';
    const marks = q.marks || 4;
    const difficulty = q.difficulty || 'medium';
    const solution = q.solution || '';
    const assertionText = q.assertion_text || null;
    const reasonText = q.reason_text || null;
    const correctIndex = typeof q.correct_index === 'number' ? q.correct_index : 0;

    // Look for existing question with same subject, chapter, and matching text or assertion
    const trimmedText = q.question_text.trim();
    const existRes = await clientOrPool.query(
      `SELECT id FROM question_bank 
       WHERE subject_id = $1 
         AND chapter_id = $2 
         AND (question_text = $3 OR (assertion_text IS NOT NULL AND $4::text IS NOT NULL AND assertion_text = $4))
       LIMIT 1`,
      [physicsSubjectId, chapterId, trimmedText, assertionText]
    );

    if (existRes.rows.length > 0) {
      const qId = existRes.rows[0].id;
      await clientOrPool.query(
        `UPDATE question_bank SET
           category = $1,
           question_type = $2,
           question_text = $3,
           options = $4,
           correct_index = $5,
           marks = $6,
           difficulty = $7,
           solution = $8,
           image_url = $9,
           assertion_text = $10,
           reason_text = $11,
           chapter = $12,
           topic = $13,
           subject = $14
         WHERE id = $15`,
        [
          'Physics',
          questionType,
          q.question_text,
          JSON.stringify(options),
          correctIndex,
          marks,
          difficulty,
          solution,
          imageUrl,
          assertionText,
          reasonText,
          'Units and Measurements',
          topic,
          'Physics',
          qId,
        ]
      );
      updatedCount++;
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
          q.question_text,
          JSON.stringify(options),
          correctIndex,
          JSON.stringify([]),
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
          'Units and Measurements',
          topic,
          'Physics',
        ]
      );
      insertedCount++;
    }
  }

  console.log(
    `[Units & Measurements] Import finished: ${insertedCount} inserted, ${updatedCount} updated. Total: ${allQuestions.length}`
  );
  return { insertedCount, updatedCount, total: allQuestions.length };
}

// Standalone execution
if (process.argv[1]?.endsWith('import_units_measurements_physics.mjs')) {
  uploadUnitsMeasurementsQuestions()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error('[Units & Measurements] Error:', e);
      await pool.end();
      process.exit(1);
    });
}
