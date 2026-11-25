import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

import { CAPACITANCE_JEE_QUESTIONS } from './capacitance_jee_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics
const LIVE_CHAPTER_ID = 311; // Capacitor / Capacitance
const CHAPTER_NAME = 'Capacitance';

console.log(`Loaded ${CAPACITANCE_JEE_QUESTIONS.length} total Capacitance questions.`);

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

  // Update chapter 311 name to 'Capacitance' on Live API if possible
  console.log('\nRenaming Chapter 311 to "Capacitance"...');
  try {
    const renRes = await fetch(`${LIVE_API}/admin/chapters/311`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Capacitance' })
    });
    console.log(`Chapter rename response: ${renRes.status}`);
  } catch (err) {
    console.log('Rename API error:', err.message);
  }

  // Check existing JEE Capacitance / Capacitor questions
  console.log('\nChecking existing JEE Capacitance questions on live API...');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Capacitance questions.`);

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
  console.log(`Uploading ${CAPACITANCE_JEE_QUESTIONS.length} Capacitance questions to JEE Physics...`);
  console.log(`Subject: Physics (ID: ${LIVE_SUBJECT_ID}), Chapter: ${CHAPTER_NAME} (ID: ${LIVE_CHAPTER_ID})`);
  console.log(`============================================================`);

  const BATCH_SIZE = 10;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < CAPACITANCE_JEE_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = CAPACITANCE_JEE_QUESTIONS.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const isNumeric = q.question_type === 'numeric';

      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const payload = {
        category: 'Physics',
        subject: 'Physics',
        subject_id: LIVE_SUBJECT_ID,
        chapter: CHAPTER_NAME,
        chapter_id: LIVE_CHAPTER_ID,
        topic: 'Capacitance',
        question_type: isNumeric ? 'numeric' : 'mcq',
        question_text: q.question_text,
        options: formattedOptions,
        correct_index: isNumeric ? null : (q.correct_index !== null ? Number(q.correct_index) : 0),
        correct_indices: isNumeric ? [] : [q.correct_index !== null ? Number(q.correct_index) : 0],
        numeric_answer: isNumeric ? Number(q.numeric_answer) : null,
        numerical_tolerance: 0,
        marks: 4,
        negative_marks: isNumeric ? 0 : 1,
        difficulty: q.difficulty || 'medium',
        image_url: q.image_url || null,
        solution_image_url: q.solution_image_url || null,
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

    if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= CAPACITANCE_JEE_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, CAPACITANCE_JEE_QUESTIONS.length)}/${CAPACITANCE_JEE_QUESTIONS.length} uploaded... (Success: ${successCount}, Failed: ${failCount})`);
    }
  }

  console.log(`\nUpload complete! Success: ${successCount}, Failed: ${failCount}`);

  // Verification step
  console.log('\n=== VERIFYING SYNCED QUESTIONS ON EDVEDUM.COM ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveCount = verifyData?.questions?.length || 0;
  console.log(`Live JEE Capacitance question count: ${liveCount}`);

  const sampleWithDiagram = (verifyData?.questions || []).find(q => q.image_url);
  console.log(`Sample Question with diagram: Q ID ${sampleWithDiagram?.id}, Image URL: ${sampleWithDiagram?.image_url}`);

  const numericCount = (verifyData?.questions || []).filter(q => q.question_type === 'numeric').length;
  console.log(`Numerical questions count: ${numericCount}`);

  if (liveCount === CAPACITANCE_JEE_QUESTIONS.length) {
    console.log(`\n>>> SUCCESS: All ${CAPACITANCE_JEE_QUESTIONS.length} questions successfully synced to JEE Physics! <<<`);
  } else {
    console.warn(`\n>>> WARNING: Expected ${CAPACITANCE_JEE_QUESTIONS.length} questions, but live has ${liveCount}. Please check. <<<`);
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

  let client;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      client = await pool.connect();
      break;
    } catch (err) {
      console.warn(`Neon DB connect attempt ${attempt} failed: ${err.message}`);
      if (attempt === 3) return;
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  try {
    // Rename chapter 311 or any chapter matching 'capacit' to 'Capacitance'
    await client.query("UPDATE chapters SET name = 'Capacitance' WHERE id = 311 OR (subject_id = 5 AND name ILIKE '%capacit%')");
    console.log('Updated chapter 311 name to "Capacitance" in Neon DB.');

    // Also update any question_bank rows with chapter 'Capacitor' to 'Capacitance'
    await client.query("UPDATE question_bank SET chapter = 'Capacitance' WHERE chapter ILIKE '%capacit%'");
    console.log('Updated question_bank chapter names to "Capacitance".');
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

async function main() {
  await syncToLive();
  await syncToNeonDb();
}

main().catch(console.error);
