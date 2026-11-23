import fetch from 'node-fetch';
import { ELECTROSTATICS_JEE_QUESTIONS } from './electrostatics_jee_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics
const LIVE_CHAPTER_ID = 106; // Electrostatics
const CHAPTER_NAME = 'Electrostatics';

console.log(`Loaded ${ELECTROSTATICS_JEE_QUESTIONS.length} total Electrostatics questions.`);

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

  // Check existing JEE Electrostatics questions on live API
  console.log('\nChecking existing JEE Electrostatics questions on live API...');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Electrostatics questions.`);

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
  console.log(`Uploading ${ELECTROSTATICS_JEE_QUESTIONS.length} Electrostatics questions to JEE Physics...`);
  console.log(`Subject: Physics (ID: ${LIVE_SUBJECT_ID}), Chapter: ${CHAPTER_NAME} (ID: ${LIVE_CHAPTER_ID})`);
  console.log(`============================================================`);

  const BATCH_SIZE = 12;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ELECTROSTATICS_JEE_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ELECTROSTATICS_JEE_QUESTIONS.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const isNumeric = q.question_type === 'numerical';

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
        topic: 'Electrostatics',
        question_type: isNumeric ? 'numerical' : 'mcq',
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

        if (res.ok) {
          successCount++;
        } else {
          failCount++;
          const errText = await res.text();
          console.error(`Failed to upload Q${q.q_num}: [${res.status}] ${errText.substring(0, 100)}`);
        }
      } catch (err) {
        failCount++;
        console.error(`Error uploading Q${q.q_num}:`, err.message);
      }
    }));

    const progress = Math.min(i + BATCH_SIZE, ELECTROSTATICS_JEE_QUESTIONS.length);
    if (progress % 36 === 0 || progress === ELECTROSTATICS_JEE_QUESTIONS.length) {
      console.log(`Progress: ${progress} / ${ELECTROSTATICS_JEE_QUESTIONS.length} uploaded (Success: ${successCount}, Failed: ${failCount})`);
    }
  }

  console.log(`\n============================================================`);
  console.log(`Upload complete! Successfully uploaded: ${successCount}, Failed: ${failCount}`);
  console.log(`============================================================`);

  // Verify questions via live API
  console.log('\n=== VERIFYING QUESTIONS VIA LIVE API ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const finalQuestions = verifyData?.questions || [];
  console.log(`Live API verified question count for Electrostatics: ${finalQuestions.length}`);

  const withDiag = finalQuestions.filter(q => q.image_url);
  const withSolDiag = finalQuestions.filter(q => q.solution_image_url);
  const numericals = finalQuestions.filter(q => q.question_type === 'numerical' || q.question_type === 'numeric');
  console.log(`Live API questions with diagram: ${withDiag.length}`);
  console.log(`Live API questions with solution diagram: ${withSolDiag.length}`);
  console.log(`Live API numerical questions: ${numericals.length}`);
}

syncToLive().catch(console.error);
