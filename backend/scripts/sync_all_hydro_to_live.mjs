import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_HYDRO_JEE_QUESTIONS } from './hydro_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

async function getLiveToken() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;
  if (!token) throw new Error('Failed to obtain auth token: ' + JSON.stringify(data));
  return token;
}

async function syncHydroToLive() {
  console.log('=== SYNCING 241 HYDROCARBONS (JEE) QUESTIONS TO LIVE PRODUCTION SERVER ===');
  const token = await getLiveToken();
  console.log('✅ Successfully authenticated with Live server.');

  // Check existing questions on Live
  console.log('Fetching existing Live Chemistry JEE questions...');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingData = await existingRes.json();
  const allLive = existingData.questions || [];
  console.log(`Current total Live Chemistry JEE questions: ${allLive.length}`);

  // Find existing JEE Hydrocarbons questions
  const existingHydro = allLive.filter(q => q.chapter_id === 164 || /hydrocarbon/i.test(q.chapter || ''));
  console.log(`Found ${existingHydro.length} existing Live Hydrocarbons questions.`);

  if (existingHydro.length > 0) {
    console.log(`Deleting ${existingHydro.length} existing Hydrocarbons questions from Live...`);
    for (const q of existingHydro) {
      await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    console.log('Finished deleting previous Hydrocarbons questions.');
  }

  // Upload all 241 questions in batches of 5
  console.log(`Uploading ${ALL_HYDRO_JEE_QUESTIONS.length} questions to Live server...`);
  let createdCount = 0;
  const batchSize = 5;

  for (let i = 0; i < ALL_HYDRO_JEE_QUESTIONS.length; i += batchSize) {
    const chunk = ALL_HYDRO_JEE_QUESTIONS.slice(i, i + batchSize);
    await Promise.all(chunk.map(async (q) => {
      const isNum = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);

      let optionsPayload;
      let correctIndexPayload;
      let correctIndicesPayload;
      let numericAnswerPayload;

      if (isNum) {
        optionsPayload = [];
        correctIndexPayload = null;
        correctIndicesPayload = [];
        numericAnswerPayload = Number(q.numeric_answer);
      } else {
        optionsPayload = (q.options || []).map((t, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx] || String(idx),
          text: String(t).trim()
        }));
        correctIndexPayload = q.correct_option !== undefined && q.correct_option !== null ? Number(q.correct_option) : 0;
        correctIndicesPayload = [correctIndexPayload];
        numericAnswerPayload = null;
      }

      const payload = {
        category: 'Chemistry',
        subject: 'Chemistry',
        subject_id: 6,
        chapter: 'Hydrocarbons',
        chapter_name: 'Hydrocarbons',
        chapter_id: 164,
        topic: 'Hydrocarbons',
        question_type: isNum ? 'numerical' : 'single_choice',
        question_text: q.question,
        options: optionsPayload,
        correct_index: correctIndexPayload,
        correct_indices: correctIndicesPayload,
        numeric_answer: numericAnswerPayload,
        numerical_tolerance: 0,
        marks: q.marks || 4,
        negative_marks: isNum ? 0 : 1,
        difficulty: q.difficulty || 'medium',
        image_url: q.image_url || null,
        solution_image_url: q.solution_image_url || null,
        solution: q.solution || null,
        exam_type: 'JEE',
        status: 'available'
      };

      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!postRes.ok) {
        const errText = await postRes.text();
        console.error(`❌ Failed to create Q${q.qNum}: ${postRes.status} ${errText}`);
      } else {
        createdCount++;
      }
    }));

    if (createdCount % 20 === 0 || createdCount === ALL_HYDRO_JEE_QUESTIONS.length) {
      console.log(`[Live Sync] Uploaded ${createdCount}/${ALL_HYDRO_JEE_QUESTIONS.length} questions...`);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`Successfully uploaded ${createdCount} questions to Live.`);

  // Final verification on Live
  console.log('Verifying final counts on Live server...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  console.log(`Total Live Chemistry JEE questions now: ${verifyQuestions.length}`);

  const byChapter = {};
  for (const q of verifyQuestions) {
    const k = `${q.chapter_id} - ${q.chapter}`;
    byChapter[k] = (byChapter[k] || 0) + 1;
  }
  console.table(byChapter);

  const hydroCount = byChapter['164 - Hydrocarbons'] || 0;
  console.log(`Hydrocarbons (Chapter 164) question count on Live: ${hydroCount}`);

  if (hydroCount === 241 && verifyQuestions.length === 1914) {
    console.log('🎉 100% PERFECT SYNC TO LIVE PRODUCTION SERVER! Total Chemistry JEE count is exactly 1914!');
  } else {
    console.warn(`⚠️ Warning: Expected 241 Hydrocarbons and 1914 total, got ${hydroCount} Hydrocarbons and ${verifyQuestions.length} total.`);
  }
}

syncHydroToLive().catch(err => {
  console.error(err);
  process.exit(1);
});
