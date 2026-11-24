import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics on live API
const LIVE_CHAPTER_ID = 31; // Wave Optics on live API
const CHAPTER_NAME = 'Wave Optics';

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_jee_final_191.json'), 'utf8'));

console.log(`Loaded ${questionsData.length} clean Wave Optics questions for live API sync.`);

async function run() {
  console.log('\n=== STEP 1: AUTHENTICATE WITH EDVEDUM LIVE API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();
  console.log('Logged in successfully to edvedum.com!');

  console.log('\n=== STEP 2: FETCH & DELETE ANY EXISTING JEE WAVE OPTICS QUESTIONS ===');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Wave Optics questions to remove.`);

  if (existingQuestions.length > 0) {
    const DEL_BATCH = 25;
    for (let i = 0; i < existingQuestions.length; i += DEL_BATCH) {
      const slice = existingQuestions.slice(i, i + DEL_BATCH);
      await Promise.all(slice.map(q =>
        fetch(`${LIVE_API}/question-bank/${q.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.error(`Failed to delete Q ID ${q.id}:`, err.message))
      ));
      const deletedSoFar = Math.min(i + DEL_BATCH, existingQuestions.length);
      console.log(`Deleted ${deletedSoFar} / ${existingQuestions.length} old questions.`);
    }
  }

  console.log('\n=== STEP 3: SEQUENTIALLY UPLOAD 191 CLEAN QUESTIONS (STRICT ORDER 1..191) ===');
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
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
      topic: 'Wave Optics',
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
      solution_image_url: null,
      solution: q.solution || null,
      exam_type: 'JEE',
      status: 'active'
    };

    let uploaded = false;
    let attempts = 0;
    while (!uploaded && attempts < 3) {
      attempts++;
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
          uploaded = true;
          successCount++;
        } else {
          const errText = await res.text();
          console.error(`Attempt ${attempts} failed for Q${i + 1}: [${res.status}] ${errText.substring(0, 80)}`);
          if (attempts < 3) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.error(`Attempt ${attempts} error for Q${i + 1}:`, err.message);
        if (attempts < 3) await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!uploaded) {
      failCount++;
      console.error(`FAILED to upload Q${i + 1} after 3 attempts!`);
    }

    if ((i + 1) % 25 === 0 || i === questionsData.length - 1) {
      console.log(`Upload progress: ${i + 1} / ${questionsData.length} (Success: ${successCount}, Failed: ${failCount})`);
    }
  }

  console.log(`\n=== FINAL RESULT ===`);
  console.log(`Total: ${questionsData.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  // Verification from Live API
  const finalCheckRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalCheckData = await finalCheckRes.json();
  console.log(`Total questions verified on Live API: ${finalCheckData.total}`);
}

run().catch(console.error);
