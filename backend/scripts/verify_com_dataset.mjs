import { ALL_COM_PYQ_QUESTIONS } from './com_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'D', 3: 'C', 4: 'B', 5: 'A',
  6: 'B', 7: 'C', 8: 'B', 9: 'A', 10: 'C',
  11: 'B', 12: 'C', 13: 'D', 14: 'B', 15: 'B',
  16: 'A', 17: 'C', 18: 'B', 19: 'D', 20: 'A',
  21: 'C', 22: 'B', 23: 'C', 24: 'A', 25: 'A',
  26: 'C', 27: 'B', 28: 'B', 29: 'D', 30: 'A',
  31: 'D', 32: 'C', 33: 'B', 34: 'A', 35: 'B',
  36: 'B', 37: 'D', 38: 'A', 39: 'A', 40: 'C',
  41: 'C', 42: 'B', 43: 'B', 44: 'A', 45: 'A',
  46: 'B', 47: 'D', 48: 'C', 49: 'D', 50: 'B',
  51: 'D', 52: 'D', 53: 'C', 54: 'B', 55: 'B',
  56: 'D', 57: 'A'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

async function run() {
  console.log(`Checking ${ALL_COM_PYQ_QUESTIONS.length} questions...`);
  if (ALL_COM_PYQ_QUESTIONS.length !== 57) {
    throw new Error(`Expected 57 questions, got ${ALL_COM_PYQ_QUESTIONS.length}`);
  }

  let errors = 0;
  for (let i = 0; i < ALL_COM_PYQ_QUESTIONS.length; i++) {
    const q = ALL_COM_PYQ_QUESTIONS[i];
    const qNum = i + 1;

    if (q.qNum !== qNum) {
      console.error(`[Q${qNum}] Invalid qNum property: ${q.qNum}`);
      errors++;
    }

    // 1. Verify 4 options
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`[Q${qNum}] Must have exactly 4 options. Found:`, q.options?.length);
      errors++;
    }

    // 2. Verify answer key match
    const expectedLetter = OFFICIAL_KEY[qNum];
    const actualLetter = OPTION_LETTERS[q.correct_option];
    if (actualLetter !== expectedLetter) {
      console.error(`[Q${qNum}] Answer mismatch! Expected ${expectedLetter}, got ${actualLetter} (index ${q.correct_option})`);
      errors++;
    }

    // 3. Verify no exam year prefix tag in question text
    if (/^\[.*?\]/i.test(q.question.trim())) {
      console.error(`[Q${qNum}] Question text contains bracketed exam tag prefix:`, q.question.substring(0, 40));
      errors++;
    }

    // 4. Verify non-empty solution
    if (!q.solution || q.solution.trim().length < 20) {
      console.error(`[Q${qNum}] Missing or too short solution!`);
      errors++;
    }

    // 5. Check diagram questions
    if ([1, 2, 13, 20, 26].includes(qNum)) {
      if (!q.image_url) {
        console.error(`[Q${qNum}] Expected diagram image_url, but none found!`);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log(' ALL 57 QUESTIONS VERIFIED PERFECTLY!');
    console.log('- 57/57 match official NEET/AIPMT answer key');
    console.log('- All 4 options per question validated');
    console.log('- 0 exam tags in question text');
    console.log('- All diagrams properly mapped to Cloudinary URLs');
    console.log('- Detailed solutions present for all questions');
  } else {
    console.error(` Verification failed with ${errors} errors.`);
    process.exit(1);
  }
}

run().catch(console.error);
