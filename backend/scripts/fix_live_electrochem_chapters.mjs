import fetch from 'node-fetch';
import { ELECTROCHEMISTRY_PART1 } from './electrochemistry_data_part1.mjs';
import { ELECTROCHEMISTRY_PART2 } from './electrochemistry_data_part2.mjs';
import { ELECTROCHEMISTRY_PART3 } from './electrochemistry_data_part3.mjs';
import { ELECTROCHEMISTRY_PART4 } from './electrochemistry_data_part4.mjs';

const LIVE_API = 'https://edvedum.com/api';
const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[$,\\{}]/g, '').trim();

const ALL_QUESTIONS = [
  ...ELECTROCHEMISTRY_PART1,
  ...ELECTROCHEMISTRY_PART2,
  ...ELECTROCHEMISTRY_PART3,
  ...ELECTROCHEMISTRY_PART4,
];

function getOptionIndex(opt) {
  if (typeof opt === 'number') return opt;
  const upper = String(opt || 'A').toUpperCase().trim();
  if (upper === 'B' || upper === '2') return 1;
  if (upper === 'C' || upper === '3') return 2;
  if (upper === 'D' || upper === '4') return 3;
  return 0;
}

async function fixLiveChapters() {
  console.log('=== FIXING ELECTROCHEMISTRY CHAPTER ON LIVE PLATFORM (edvedum.com) ===\n');

  // 1. Authenticate
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status}`);
  }
  const { token } = await loginRes.json();
  console.log('✓ Successfully authenticated with live edvedum.com\n');

  // 2. Fetch all Chemistry questions from live
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const data = await res.json();
  const liveQuestions = data.questions || [];
  console.log(`Fetched ${liveQuestions.length} Chemistry questions from live platform.`);

  // 3. Build lookup maps
  const bookletMap = new Map();
  ALL_QUESTIONS.forEach((bq, i) => {
    bookletMap.set(norm(bq.question_text), { ...bq, bookletIndex: i + 1 });
  });

  let updatedCount = 0;
  let alreadyCorrect = 0;

  for (const lq of liveQuestions) {
    const key = norm(lq.question_text);
    if (!bookletMap.has(key)) continue;

    const bq = bookletMap.get(key);

    const needsUpdate = lq.chapter !== 'Electrochemistry' || lq.chapter_id !== 15;

    if (!needsUpdate) {
      alreadyCorrect++;
      continue;
    }

    console.log(`Updating Live ID ${lq.id} (was Chapter: "${lq.chapter}") -> Chapter: "Electrochemistry"...`);

    // Ensure options format
    const formattedOptions = (lq.options && Array.isArray(lq.options) && lq.options.length > 0)
      ? lq.options.map(opt => ({ text: typeof opt === 'string' ? opt : (opt.text || '') }))
      : [
          { text: bq.option_a },
          { text: bq.option_b },
          { text: bq.option_c },
          { text: bq.option_d }
        ];

    const updatePayload = {
      ...lq,
      category: 'Chemistry',
      subject: 'Chemistry',
      subject_id: 6,
      chapter: 'Electrochemistry',
      chapter_id: 15,
      topic: bq.topic || 'Electrochemistry',
      options: formattedOptions,
      correct_index: lq.correct_index !== undefined ? lq.correct_index : getOptionIndex(bq.correct_option),
      solution: lq.solution || bq.explanation || '',
      image_url: lq.image_url || bq.diagram_url || ''
    };

    try {
      const putRes = await fetch(`${LIVE_API}/question-bank/${lq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      if (putRes.ok) {
        updatedCount++;
        const putData = await putRes.json();
        console.log(`  ✓ Updated ID ${lq.id}: chapter is now "${putData.question?.chapter}"`);
      } else {
        const errText = await putRes.text();
        console.error(`  ✗ Error updating ID ${lq.id} (${putRes.status}): ${errText.slice(0, 100)}`);
      }
    } catch (putErr) {
      console.error(`  ✗ Network error on ID ${lq.id}: ${putErr.message}`);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`\nUpdate run complete: ${updatedCount} questions updated, ${alreadyCorrect} already had chapter 'Electrochemistry'.\n`);

  // 4. Verify live chapter distribution for all 133 questions
  const res2 = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const data2 = await res2.json();
  const liveMap2 = new Map();
  for (const q of (data2.questions || [])) {
    liveMap2.set(norm(q.question_text), q);
  }

  const finalDistribution = {};
  ALL_QUESTIONS.forEach(bq => {
    const key = norm(bq.question_text);
    if (liveMap2.has(key)) {
      const q = liveMap2.get(key);
      finalDistribution[q.chapter] = (finalDistribution[q.chapter] || 0) + 1;
    }
  });

  console.log('Final Chapter distribution for all 133 questions on live (edvedum.com):');
  console.table(finalDistribution);
}

fixLiveChapters().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
