import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function syncToLive() {
  console.log('=== Step 1: Connecting to Neon DB & Loading Batch 2 Questions ===');
  const res = await pool.query(`
    SELECT *
    FROM question_bank
    WHERE id >= 1028 AND id <= 1094
    ORDER BY id ASC
  `);

  console.log(`Loaded ${res.rows.length} Batch 2 questions from Neon DB.`);

  console.log('\n=== Step 2: Authenticating with Live edvedum.com API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed with status ${loginRes.status}: ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Logged in successfully to edvedum.com as admin.');

  const physicsSubjectId = 5;
  const rotChapterId = 189; // System of Particles and Rotational Motion
  console.log(`Target: Physics (ID: ${physicsSubjectId}), Chapter (ID: ${rotChapterId})`);

  console.log('\n=== Step 3: Checking Existing Questions on edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  console.log(`Found ${existingQuestions.length} existing Physics questions on edvedum.com.`);

  const existingTextSet = new Set(
    existingQuestions.map(q => q.question_text.trim().toLowerCase().slice(0, 100))
  );

  console.log('\n=== Step 4: Uploading Batch 2 Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < res.rows.length; i++) {
    const q = res.rows[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 100);
    if (existingTextSet.has(key)) {
      skipped++;
      console.log(`[${i + 1}/${res.rows.length}] Skipped existing: "${q.question_text.slice(0, 40)}..."`);
      continue;
    }

    let parsedOptions = [];
    if (typeof q.options === 'string') {
      try {
        parsedOptions = JSON.parse(q.options);
      } catch {
        parsedOptions = q.options.split('|');
      }
    } else if (Array.isArray(q.options)) {
      parsedOptions = q.options;
    }

    let parsedCorrectIndices = [];
    if (q.correct_indices) {
      if (typeof q.correct_indices === 'string') {
        try {
          parsedCorrectIndices = JSON.parse(q.correct_indices);
        } catch {
          parsedCorrectIndices = [q.correct_index];
        }
      } else if (Array.isArray(q.correct_indices)) {
        parsedCorrectIndices = q.correct_indices;
      }
    } else {
      parsedCorrectIndices = [q.correct_index];
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: rotChapterId,
      chapter: 'System of Particles and Rotational Motion',
      topic: q.topic || 'System of Particles and Rotational Motion',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: parsedOptions,
      correct_index: q.correct_index ?? 0,
      correct_indices: parsedCorrectIndices,
      numeric_answer: q.numeric_answer,
      numerical_tolerance: q.numerical_tolerance,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: q.solution_image_url || ''
    };

    try {
      const uploadRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error(`Failed to upload Q#${i + 1}: ${uploadRes.status} - ${errText}`);
      } else {
        const resData = await uploadRes.json();
        inserted++;
        console.log(`[${i + 1}/${res.rows.length}] Uploaded successfully: "${q.question_text.slice(0, 40)}..." (Live ID: ${resData.id || resData.question?.id || 'OK'})`);
      }
    } catch (postErr) {
      console.error(`Network error on Q#${i + 1}:`, postErr.message);
    }
  }

  console.log(`\n=== Batch 2 Live Sync Finished ===`);
  console.log(`Total questions processed: ${res.rows.length}`);
  console.log(`Successfully uploaded: ${inserted}`);
  console.log(`Skipped (already existed): ${skipped}`);

  console.log('\n=== Step 5: Verifying Total Live Question Bank Count ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter_id=${rotChapterId}&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  if (verifyRes.ok) {
    const vData = await verifyRes.json();
    console.log(`Total Live questions for Chapter "System of Particles and Rotational Motion": ${(vData.questions || []).length} questions.`);
  }
}

syncToLive().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
}).finally(() => {
  pool.end();
});
