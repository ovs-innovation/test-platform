import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics on live API
const LIVE_CHAPTER_ID = 193; // Moving Charges and Magnetism on live API
const CHAPTER_NAME = 'Moving Charges and Magnetism';

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_final_268.json'), 'utf8'));

console.log(`Loaded ${questionsData.length} clean Moving Charges and Magnetism questions for live API sync.`);

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

  console.log('\n=== STEP 2: FETCH & DELETE ALL EXISTING JEE MOVING CHARGES AND MAGNETISM QUESTIONS ===');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Moving Charges and Magnetism questions to remove.`);

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

  console.log('\n=== STEP 3: SEQUENTIALLY UPLOAD 268 CLEAN QUESTIONS (STRICT ORDER 1..268) ===');
  let successCount = 0;
  let failCount = 0;
  const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
    const isNumeric = q.question_type === 'numerical';
    const cIdx = isNumeric ? null : (keyMap[q.correct_answer] !== undefined ? keyMap[q.correct_answer] : 0);

    const formattedOptions = (q.options || []).map((opt, optIdx) => ({
      key: opt.option_id || ['A', 'B', 'C', 'D'][optIdx],
      text: String(opt.option_text).trim(),
      image_url: ''
    }));

    const payload = {
      category: 'Physics',
      subject: 'Physics',
      subject_id: LIVE_SUBJECT_ID,
      chapter: CHAPTER_NAME,
      chapter_id: LIVE_CHAPTER_ID,
      topic: 'Moving Charges and Magnetism',
      question_type: isNumeric ? 'numerical' : 'mcq',
      question_text: q.question_text,
      options: formattedOptions,
      correct_index: cIdx,
      correct_indices: isNumeric ? [] : [cIdx],
      numeric_answer: isNumeric ? Number(q.numeric_answer) : null,
      numerical_tolerance: 0,
      marks: 4,
      negative_marks: isNumeric ? 0 : 1,
      difficulty: 'medium',
      image_url: q.diagram_url || null,
      solution_image_url: null,
      solution: q.solution_text || null,
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
          console.error(`Attempt ${attempts} failed for Q${q.question_number}: ${errText}`);
          if (attempts < 3) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.error(`Network attempt ${attempts} error for Q${q.question_number}:`, err.message);
        if (attempts < 3) await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!uploaded) {
      failCount++;
      console.error(`FAILED to upload Q${q.question_number} after 3 attempts.`);
    }

    if ((i + 1) % 25 === 0 || i === questionsData.length - 1) {
      console.log(`Progress: ${i + 1} / ${questionsData.length} questions processed (${successCount} OK, ${failCount} failed).`);
    }
  }

  console.log(`\nUpload complete! Success: ${successCount}, Failed: ${failCount}`);

  console.log('\n=== STEP 4: VERIFY POST-UPLOAD LIVE QUESTIONS ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveQuestions = verifyData?.questions || [];
  console.log(`Live verification: ${liveQuestions.length} questions returned from live API!`);

  // Verify first and last question
  if (liveQuestions.length > 0) {
    console.log('Sample first question:', {
      id: liveQuestions[0].id,
      text: liveQuestions[0].question_text?.substring(0, 60),
      type: liveQuestions[0].question_type,
      optionsCount: liveQuestions[0].options?.length,
      image_url: liveQuestions[0].image_url
    });
    const lastQ = liveQuestions[liveQuestions.length - 1];
    console.log('Sample last question:', {
      id: lastQ.id,
      text: lastQ.question_text?.substring(0, 60),
      type: lastQ.question_type,
      optionsCount: lastQ.options?.length,
      image_url: lastQ.image_url
    });
  }
}

run().catch(err => {
  console.error('Fatal live sync error:', err);
  process.exit(1);
});
