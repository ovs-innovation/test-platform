import { ALL_MOTION_PYQ_QUESTIONS } from './motion_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'A', 3: 'C', 4: 'D', 5: 'B',
  6: 'D', 7: 'C', 8: 'B', 9: 'B', 10: 'D',
  11: 'B', 12: 'C', 13: 'D', 14: 'C', 15: 'C',
  16: 'C', 17: 'C', 18: 'A', 19: 'B', 20: 'B',
  21: 'D', 22: 'A', 23: 'D', 24: 'B', 25: 'D',
  26: 'D', 27: 'C', 28: 'B', 29: 'A', 30: 'A',
  31: 'B', 32: 'D', 33: 'B', 34: 'A', 35: 'D',
  36: 'C', 37: 'D', 38: 'A', 39: 'A', 40: 'C',
  41: 'A', 42: 'A', 43: 'D', 44: 'A', 45: 'B',
  46: 'C', 47: 'B', 48: 'A', 49: 'A', 50: 'D',
  51: 'A', 52: 'C', 53: 'A', 54: 'D', 55: 'C',
  56: 'A', 57: 'A', 58: 'A', 59: 'B', 60: 'B',
  61: 'B', 62: 'C', 63: 'B', 64: 'B', 65: 'C',
  66: 'D'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

console.log(`Verifying ${ALL_MOTION_PYQ_QUESTIONS.length} questions...`);

if (ALL_MOTION_PYQ_QUESTIONS.length !== 66) {
  console.error(`ERROR: Expected 66 questions, got ${ALL_MOTION_PYQ_QUESTIONS.length}`);
  process.exit(1);
}

let mismatches = 0;
let formatErrors = 0;

for (const q of ALL_MOTION_PYQ_QUESTIONS) {
  const expectedLetter = OFFICIAL_KEY[q.qNum];
  const actualLetter = OPTION_LETTERS[q.correct_option];

  if (actualLetter !== expectedLetter) {
    console.error(`Mismatch at Q${q.qNum}: Expected ${expectedLetter}, got ${actualLetter} (index ${q.correct_option})`);
    mismatches++;
  }

  if (q.question.startsWith('[')) {
    console.error(`Format error at Q${q.qNum}: Question starts with bracket (might contain exam tag): ${q.question.substring(0, 30)}`);
    formatErrors++;
  }

  if (!q.options || q.options.length !== 4) {
    console.error(`Format error at Q${q.qNum}: Expected 4 options, got ${q.options?.length}`);
    formatErrors++;
  }

  if ([2, 7, 11, 13, 35, 57, 59].includes(q.qNum) && !q.image_url) {
    console.error(`Diagram missing at Q${q.qNum}!`);
    formatErrors++;
  }
}

if (mismatches === 0 && formatErrors === 0) {
  console.log('SUCCESS: All 66 questions verified perfectly against official Answer Key and formatting constraints!');
} else {
  console.error(`FAILED: ${mismatches} mismatches, ${formatErrors} format errors.`);
  process.exit(1);
}

