import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

import { VECTOR_QUESTIONS } from './data/physics_vector_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics
const LIVE_CHAPTER_ID = 267; // Vector
const CHAPTER_NAME = 'Vector';

// Load diagram URLs map
const diagramMapFile = path.resolve(__dirname, 'physics_vector_diagram_urls.json');
let diagramUrls = { question: {}, solution: {} };
if (fs.existsSync(diagramMapFile)) {
  diagramUrls = JSON.parse(fs.readFileSync(diagramMapFile, 'utf8'));
}

console.log(`Loaded ${VECTOR_QUESTIONS.length} total Vector questions.`);
console.log(`Loaded ${Object.keys(diagramUrls.question).length} question diagrams, ${Object.keys(diagramUrls.solution).length} solution diagrams.`);

async function syncToLive() {
  console.log('\n=== STEP 1: AUTHENTICATING WITH EDVEDUM.COM ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();
  console.log('Authentication successful.');

  // Check existing JEE Vector questions
  console.log('\nChecking existing JEE Vector questions on live API...');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Vector questions.`);

  if (existingQuestions.length > 0) {
    console.log(`Cleaning up ${existingQuestions.length} existing questions to avoid duplicates...`);
    const DEL_BATCH = 20;
    for (let i = 0; i < existingQuestions.length; i += DEL_BATCH) {
      const slice = existingQuestions.slice(i, i + DEL_BATCH);
      await Promise.all(slice.map(q =>
        fetch(`${LIVE_API}/question-bank/${q.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.error(`Failed to delete Q ID ${q.id}:`, err.message))
      ));
    }
    console.log('Cleanup finished.');
  }

  console.log(`\n============================================================`);
  console.log(`Uploading ${VECTOR_QUESTIONS.length} Vector questions to JEE Physics...`);
  console.log(`Subject: Physics (ID: ${LIVE_SUBJECT_ID}), Chapter: ${CHAPTER_NAME} (ID: ${LIVE_CHAPTER_ID})`);
  console.log(`============================================================`);

  const BATCH_SIZE = 10;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < VECTOR_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = VECTOR_QUESTIONS.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const isAssertionReason = q.question_type === 'assertion_reason';
      const qNumStr = String(q.q_num);
      const imageUrl = diagramUrls.question[qNumStr] || q.image_url || null;
      const solImageUrl = diagramUrls.solution[qNumStr] || null;

      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D', 'E'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const payload = {
        category: 'Physics',
        subject: 'Physics',
        subject_id: LIVE_SUBJECT_ID,
        chapter: CHAPTER_NAME,
        chapter_id: LIVE_CHAPTER_ID,
        topic: 'Vector',
        question_type: isAssertionReason ? 'assertion_reason' : 'mcq',
        question_text: q.question_text,
        options: formattedOptions,
        correct_index: q.correct_index !== undefined ? Number(q.correct_index) : 0,
        correct_indices: [q.correct_index !== undefined ? Number(q.correct_index) : 0],
        numeric_answer: null,
        numerical_tolerance: 0,
        assertion_text: q.assertion_text || null,
        reason_text: q.reason_text || null,
        marks: 4,
        negative_marks: 1,
        difficulty: q.difficulty || 'medium',
        image_url: imageUrl,
        solution_image_url: solImageUrl,
        solution: q.solution || null,
        exam_type: 'JEE',
        status: 'active'
      };

      try {
        const res = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`HTTP ${res.status}: ${err}`);
        }
        successCount++;
      } catch (err) {
        console.error(`Failed Q${q.q_num}:`, err.message);
        failCount++;
      }
    }));

    if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= VECTOR_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, VECTOR_QUESTIONS.length)}/${VECTOR_QUESTIONS.length} uploaded... (Success: ${successCount}, Failed: ${failCount})`);
    }
  }

  console.log(`\nUpload complete! Success: ${successCount}, Failed: ${failCount}`);

  // Verification on live
  console.log('\n=== VERIFYING ON LIVE API ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveCount = verifyData?.questions?.length || 0;
  console.log(`Live JEE Vector question count: ${liveCount}`);

  const sampleWithDiagram = (verifyData?.questions || []).find(q => q.image_url);
  console.log(`Sample Question with diagram: Q ID ${sampleWithDiagram?.id}, Image URL: ${sampleWithDiagram?.image_url}`);

  const arCount = (verifyData?.questions || []).filter(q => q.question_type === 'assertion_reason').length;
  console.log(`Assertion-Reason questions count: ${arCount}`);

  if (liveCount === VECTOR_QUESTIONS.length) {
    console.log(`\n>>> SUCCESS: All ${VECTOR_QUESTIONS.length} questions successfully synced to JEE Physics! <<<`);
  } else {
    console.warn(`\n>>> WARNING: Expected ${VECTOR_QUESTIONS.length} questions, but live has ${liveCount}. Please check. <<<`);
  }
}

async function syncToNeonDb() {
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL configured; skipping local Neon sync.');
    return;
  }

  console.log('\n=== STEP 2: SYNCING TO NEON DATABASE ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length === 0) {
      console.warn("Physics subject not found in Neon DB.");
      return;
    }
    const subjectId = subRes.rows[0].id;

    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'vector'",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position) VALUES ('Vector', $1, 1) RETURNING id",
        [subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new Chapter: "Vector" with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing Chapter: "Vector" (ID: ${chapterId})`);
    }

    const delRes = await client.query("DELETE FROM question_bank WHERE chapter_id = $1 AND exam_type = 'JEE'", [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous JEE question(s) in Neon DB.`);

    console.log(`Inserting ${VECTOR_QUESTIONS.length} questions into Neon DB for JEE...`);
    const optKeys = ['A', 'B', 'C', 'D', 'E'];

    for (let i = 0; i < VECTOR_QUESTIONS.length; i++) {
      const q = VECTOR_QUESTIONS[i];
      const isAR = q.question_type === 'assertion_reason';
      const qNumStr = String(q.q_num);
      const imageUrl = diagramUrls.question[qNumStr] || q.image_url || '';
      const solImageUrl = diagramUrls.solution[qNumStr] || '';

      const formattedOptions = q.options.map((optText, idx) => ({
        key: optKeys[idx] || String.fromCharCode(65 + idx),
        text: optText,
        media: [],
        image_url: ''
      }));

      if (isAR) {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, solution_image_url, assertion_text, reason_text,
            subject, topic, chapter, status, exam_type
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20
          )
        `, [
          'Physics',
          'assertion_reason',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          imageUrl,
          solImageUrl,
          q.assertion_text || '',
          q.reason_text || '',
          'Physics',
          'Vector',
          'Vector',
          'approved',
          'JEE'
        ]);
      } else {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, solution_image_url, subject, topic, chapter, status, exam_type
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18
          )
        `, [
          'Physics',
          'mcq',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          imageUrl,
          solImageUrl,
          'Physics',
          'Vector',
          'Vector',
          'approved',
          'JEE'
        ]);
      }

      if ((i + 1) % 50 === 0 || i + 1 === VECTOR_QUESTIONS.length) {
        console.log(`  Neon DB: Inserted ${i + 1}/${VECTOR_QUESTIONS.length} questions`);
      }
    }

    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('Redis cache invalidated.');
    } catch (_) {}

    console.log(`Neon DB sync completed successfully!`);
  } finally {
    client.release();
    await pool.end();
  }
}

async function run() {
  await syncToLive();
  await syncToNeonDb();
}

run().catch(console.error);
