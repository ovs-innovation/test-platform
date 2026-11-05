import { batch1 as limitsBatch1 } from './data/limits_batch1.mjs';
import { batch2 as limitsBatch2 } from './data/limits_batch2.mjs';
import { batch3 as limitsBatch3 } from './data/limits_batch3.mjs';
import { limitsBatch4 } from './data/limits_batch4.mjs';
import { limitsBatch5 } from './data/limits_batch5.mjs';
import { limitsBatch6 } from './data/limits_batch6.mjs';

const allQuestions = [
  ...limitsBatch1,
  ...limitsBatch2,
  ...limitsBatch3,
  ...limitsBatch4,
  ...limitsBatch5,
  ...limitsBatch6,
];

console.log(`Total questions loaded: ${allQuestions.length}`);

// Page 71 Official Answer Key:
const officialKey = {
  1: 'D', 2: 'A', 3: 'A', 4: 'C', 5: 'A', 6: 'D',
  7: 'B', 8: 'A', 9: 'D', 10: 'D', 11: 'B', 12: 'B',
  13: 'A', 14: 'D', 15: 'D', 16: 'D', 17: 'B', 18: 'B',
  19: 'D', 20: 'B', 21: 'B', 22: 'B', 23: 'C', 24: 'D',
  25: 'D', 26: 'B', 27: 'D', 28: 'A', 29: 'D', 30: 'B',
  31: 'C', 32: 'B', 33: 'A', 34: 'D', 35: 'D', 36: 'A',
  37: 'B', 38: 'C', 39: 'A', 40: 'A', 41: 'D', 42: 'D',
  43: 'B', 44: 'A', 45: 'A', 46: 'B', 47: 'D', 48: 'D',
  49: 'C', 50: 36, 51: 'B', 52: 40, 53: 'D', 54: 'B',
  55: 8, 56: 'D', 57: 'B', 58: 'B', 59: 'D', 60: 5,
  61: 'C', 62: 'C', 63: 4, 64: 'D', 65: 'A', 66: 'A',
  67: 'D', 68: 3, 69: 3, 70: 'D', 71: 'C', 72: 'D',
  73: 'C', 74: 'A', 75: 'C', 76: 'C', 77: 7, 78: 'A',
  79: 'A', 80: 'B', 81: 'B', 82: 'C', 83: 3, 84: 11,
  85: 'D', 86: 'C', 87: 'A', 88: 'C', 89: 'B', 90: 1,
  91: 'C', 92: 'B', 93: 'A', 94: 'C', 95: 'C', 96: 'A',
  97: 'D', 98: 'C', 99: 'B', 100: 'C', 101: 'C', 102: 'C',
  103: 'B', 104: 'C', 105: 'C', 106: 12, 107: 'B', 108: 'D',
  109: 'D', 110: 'B', 111: 81, 112: 18, 113: 'B', 114: 100,
  115: 'A', 116: 24, 117: 170, 118: 'D', 119: 'B', 120: 55,
  121: 6, 122: 32, 123: 'B', 124: 'C', 125: 'D', 126: 'C',
  127: 'D', 128: 1, 129: 24, 130: 64, 131: 'A', 132: 'A',
  133: 32, 134: 'A', 135: 'C', 136: 'D', 137: 'C', 138: 2,
  139: 'D', 140: 'A', 141: 'B', 142: 'C', 143: 'C', 144: 'B',
  145: 'C'
};

const optLetters = ['A', 'B', 'C', 'D'];
const letterToIdx = { A: 0, B: 1, C: 2, D: 3 };
let errors = 0;

if (allQuestions.length !== 145) {
  console.error(`ERROR: Expected 145 questions, but found ${allQuestions.length}`);
  errors++;
}

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const qNum = i + 1;

  if (q.question_number !== qNum) {
    console.error(`ERROR: Question index ${i} has question_number ${q.question_number}, expected ${qNum}`);
    errors++;
  }

  if (q.marks !== 4) {
    console.error(`ERROR: Q${qNum} marks is ${q.marks}, expected 4`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR: Q${qNum} question_text is empty`);
    errors++;
  }

  const solution = q.explanation || q.solution_text || q.solution;
  if (!solution || solution.trim().length === 0) {
    console.error(`ERROR: Q${qNum} explanation/solution is empty`);
    errors++;
  }

  const expected = officialKey[qNum];
  if (expected === undefined) {
    console.error(`ERROR: Q${qNum} not found in officialKey`);
    errors++;
    continue;
  }

  const isNumeric = (typeof expected === 'number');
  const actualType = q.question_type || q.type;

  if (isNumeric) {
    // Numerical question
    if (actualType !== 'numerical' && actualType !== 'integer' && actualType !== 'numeric') {
      console.error(`ERROR: Q${qNum} expected numerical type, got ${actualType}`);
      errors++;
    }
    const actualNum = (q.numeric_answer !== undefined && q.numeric_answer !== null) ? Number(q.numeric_answer) : Number(q.correct_value);
    if (actualNum !== expected) {
      console.error(`ERROR: Q${qNum} numeric_answer is ${actualNum}, expected ${expected}`);
      errors++;
    }
  } else {
    // Single choice question
    if (actualType !== 'single_choice' && actualType !== 'mcq') {
      console.error(`ERROR: Q${qNum} expected single_choice/mcq, got ${actualType}`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`ERROR: Q${qNum} options length is ${q.options ? q.options.length : 0}, expected 4`);
      errors++;
    }
    let actualLetter;
    if (typeof q.correct_option === 'number') {
      actualLetter = optLetters[q.correct_option];
    } else if (typeof q.correct_option === 'string') {
      actualLetter = q.correct_option.trim().toUpperCase();
    } else if (typeof q.correct_index === 'number') {
      actualLetter = optLetters[q.correct_index];
    }
    if (actualLetter !== expected) {
      console.error(`ERROR: Q${qNum} correct_option is ${actualLetter}, expected ${expected}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 145 questions verified perfectly against official key! 0 errors.');
} else {
  console.error(`Total verification errors: ${errors}`);
  process.exit(1);
}
