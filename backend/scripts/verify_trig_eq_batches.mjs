import { trigEqBatch1 } from './data/trig_eq_batch1.mjs';
import { trigEqBatch2 } from './data/trig_eq_batch2.mjs';
import { trigEqBatch3 } from './data/trig_eq_batch3.mjs';

const allQuestions = [...trigEqBatch1, ...trigEqBatch2, ...trigEqBatch3];

console.log('Total questions loaded:', allQuestions.length);

const officialKey = {
  1: 'B', 2: 'C', 3: 'A', 4: 'B', 5: 'B', 6: 'A',
  7: 'B', 8: 'A', 9: 'D', 10: 'A', 11: 'C', 12: 'C',
  13: 'B', 14: 'D', 15: 'A', 16: 'C', 17: 'A', 18: 'D',
  19: 'C', 20: 'A', 21: 'B', 22: 'C', 23: 'D', 24: '1',
  25: 'B', 26: 'D', 27: 'C', 28: 'D', 29: 'B', 30: '56',
  31: 'C', 32: 'B', 33: 'D', 34: 'D', 35: '4', 36: '1',
  37: '4', 38: 'C', 39: 'C', 40: '3', 41: '16', 42: 'A',
  43: 'A', 44: '25', 45: 'B', 46: 'D', 47: 'D', 48: 'D',
  49: '48', 50: 'D', 51: 'C', 52: 'C', 53: 'B', 54: 'D',
  55: '4', 56: 'C', 57: '2', 58: 'C', 59: 'C', 60: 'A',
  61: 'B', 62: 'D', 63: 'A', 64: 'D', 65: 'A', 66: 'B',
  67: '4', 68: 'D', 69: '19', 70: 'B'
};

const idxToLetter = ['A', 'B', 'C', 'D'];

let errors = 0;

for (let qNum = 1; qNum <= 70; qNum++) {
  const q = allQuestions.find(x => x.question_number === qNum);
  if (!q) {
    console.error(`Missing Question #${qNum}`);
    errors++;
    continue;
  }

  const expected = officialKey[qNum];
  const isNumerical = !['A', 'B', 'C', 'D'].includes(expected);

  if (isNumerical) {
    if (q.options && q.options.length > 0) {
      console.error(`Q#${qNum} should be numerical without options, found ${q.options.length} options`);
      errors++;
    }
    if (q.correct_index !== null) {
      console.error(`Q#${qNum} is numerical but correct_index is ${q.correct_index} (expected null)`);
      errors++;
    }
    if (q.numeric_answer !== Number(expected)) {
      console.error(`Q#${qNum} numeric_answer is ${q.numeric_answer}, expected ${expected}`);
      errors++;
    }
    if (q.question_type !== 'integer') {
      console.error(`Q#${qNum} question_type is ${q.question_type}, expected 'integer'`);
      errors++;
    }
    // Check solution text mentions expected value
    if (!q.solution.includes(expected)) {
      console.warn(`Q#${qNum} solution might not explicitly mention expected numerical answer ${expected}`);
    }
  } else {
    if (!q.options || q.options.length !== 4) {
      console.error(`Q#${qNum} expected 4 options, found ${q.options ? q.options.length : 0}`);
      errors++;
    }
    const actualLetter = idxToLetter[q.correct_index];
    if (actualLetter !== expected) {
      console.error(`Q#${qNum} answer mismatch: expected ${expected}, got ${actualLetter} (index ${q.correct_index})`);
      errors++;
    }
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q#${qNum} missing question_text`);
    errors++;
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`Q#${qNum} missing solution`);
    errors++;
  }
}

if (errors === 0) {
  console.log('✅ ALL 70 QUESTIONS PERFECTLY VALIDATED AGAINST OFFICIAL ANSWER KEY!');
} else {
  console.error(`❌ Validation failed with ${errors} errors.`);
  process.exit(1);
}
