import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics on live API
const LIVE_CHAPTER_ID = 198; // Ray Optics on live API
const CHAPTER_NAME = 'Ray Optics';

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_final_298.json'), 'utf8'));

console.log(`Loaded ${questionsData.length} clean Ray Optics questions for live API sync.`);

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

  console.log('\n=== STEP 2: FETCH & DELETE ALL EXISTING JEE RAY OPTICS QUESTIONS ===');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Ray Optics questions to remove (preserving NEET).`);

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

  console.log('\n=== STEP 3: SEQUENTIALLY UPLOAD 298 CLEAN QUESTIONS (STRICT ORDER 1..298) ===');
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
      topic: 'Ray Optics',
      question_type: isNumeric ? 'numerical' : 'mcq',
      question_text: q.question_text,
      options: formattedOptions,
      correct_index: cIdx,
      correct_indices: isNumeric ? [] : [cIdx],
      numeric_answer: isNumeric ? Number(q.numeric_answer) : null,
      numerical_tolerance: 0,
      marks: 4,
      difficulty: 'medium',
      solution: q.solution_text || '',
      image_url: q.diagram_url || '',
      exam_type: 'JEE',
      status: 'active'
    };

    try {
      const uploadRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error(`Failed to upload Q${q.question_number}: ${uploadRes.status} - ${errText}`);
        failCount++;
      } else {
        successCount++;
        if (successCount % 30 === 0 || successCount === questionsData.length) {
          console.log(`Uploaded ${successCount}/${questionsData.length} questions to live API (${Math.round(successCount / questionsData.length * 100)}%)`);
        }
      }
    } catch (err) {
      console.error(`Network error on Q${q.question_number}:`, err.message);
      failCount++;
    }
  }

  console.log(`\n=== UPLOAD FINISHED: Success: ${successCount}, Failures: ${failCount} ===`);

  console.log('\n=== STEP 4: VERIFY ON LIVE PRODUCTION API ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=350`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveCount = verifyData?.questions?.length || 0;
  console.log(`Live GET returned ${liveCount} questions for Chapter: "${CHAPTER_NAME}", Exam Type: JEE.`);

  // Also check NEET questions count
  const verifyNeet = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=NEET&refresh=true&limit=350`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const neetData = await verifyNeet.json();
  console.log(`Live NEET count preserved: ${neetData?.questions?.length || 0} questions.`);
}

run().catch(console.error);
