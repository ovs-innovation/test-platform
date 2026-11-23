import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { BASIC_MATHS_PART1 } from './data/basic_maths_part1.mjs';
import { BASIC_MATHS_PART2 } from './data/basic_maths_part2.mjs';
import { BASIC_MATHS_PART3 } from './data/basic_maths_part3.mjs';
import { BASIC_MATHS_PART4 } from './data/basic_maths_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';
const SUBJECT_ID = 5; // Physics
const CHAPTER_ID = 269; // Basic Maths
const CHAPTER_NAME = 'Basic Maths';

const diagramUrlsFile = path.resolve(__dirname, './basic_maths_diagram_urls.json');
let diagramUrls = {};
if (fs.existsSync(diagramUrlsFile)) {
  diagramUrls = JSON.parse(fs.readFileSync(diagramUrlsFile, 'utf8'));
}

const allQuestions = [
  ...BASIC_MATHS_PART1,
  ...BASIC_MATHS_PART2,
  ...BASIC_MATHS_PART3,
  ...BASIC_MATHS_PART4
];

console.log(`Loaded ${allQuestions.length} total Basic Maths questions from parts 1-4.`);
console.log(`Loaded ${Object.keys(diagramUrls).length} diagram URLs.`);

async function main() {
  console.log('=== AUTHENTICATING WITH EDVEDUM.COM ===');
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

  // Check existing JEE Basic Maths questions
  console.log('\nChecking existing JEE Basic Maths questions on live API...');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const existingQuestions = checkData?.questions || [];
  console.log(`Found ${existingQuestions.length} existing JEE Basic Maths questions.`);

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
  console.log(`Uploading ${allQuestions.length} Basic Maths questions to JEE Physics...`);
  console.log(`Subject: Physics (ID: ${SUBJECT_ID}), Chapter: ${CHAPTER_NAME} (ID: ${CHAPTER_ID})`);
  console.log(`============================================================`);

  const BATCH_SIZE = 10;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allQuestions.length; i += BATCH_SIZE) {
    const batch = allQuestions.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const isAssertionReason = q.question_type === 'assertion_reason';
      const qNumStr = String(q.q_num);
      const imageUrl = diagramUrls[qNumStr] || q.image_url || null;

      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D', 'E'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const payload = {
        category: 'Physics',
        subject: 'Physics',
        subject_id: SUBJECT_ID,
        chapter: CHAPTER_NAME,
        chapter_id: CHAPTER_ID,
        topic: 'Basic Maths',
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
        solution_image_url: null,
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

    if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= allQuestions.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, allQuestions.length)}/${allQuestions.length} uploaded... (Success: ${successCount}, Failed: ${failCount})`);
    }
  }

  console.log(`\nUpload complete! Success: ${successCount}, Failed: ${failCount}`);

  // Verification
  console.log('\n=== VERIFYING ON LIVE API ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveCount = verifyData?.questions?.length || 0;
  console.log(`Live JEE Basic Maths question count: ${liveCount}`);

  const sampleWithDiagram = (verifyData?.questions || []).find(q => q.image_url);
  console.log(`Sample Question with diagram: Q ID ${sampleWithDiagram?.id}, Image URL: ${sampleWithDiagram?.image_url}`);

  const arCount = (verifyData?.questions || []).filter(q => q.question_type === 'assertion_reason').length;
  console.log(`Assertion-Reason questions count: ${arCount}`);

  if (liveCount === allQuestions.length) {
    console.log(`\n>>> SUCCESS: All ${allQuestions.length} questions successfully synced to JEE Physics! <<<`);
  } else {
    console.warn(`\n>>> WARNING: Expected ${allQuestions.length} questions, but live has ${liveCount}. Please check. <<<`);
  }
}

main().catch(console.error);
