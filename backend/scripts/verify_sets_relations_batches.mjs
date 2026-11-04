import { setsRelationsBatch1 } from './data/sets_relations_batch1.mjs';
import { setsRelationsBatch2 } from './data/sets_relations_batch2.mjs';
import { setsRelationsBatch3 } from './data/sets_relations_batch3.mjs';
import { setsRelationsBatch4 } from './data/sets_relations_batch4.mjs';
import { setsRelationsBatch5 } from './data/sets_relations_batch5.mjs';

const officialAnswers = {
  1: 'C', 2: 'A', 3: 'B', 4: 'D', 5: 'C', 6: 'D', 7: 'B', 8: 'B', 9: 'B', 10: 'B',
  11: 'A', 12: 'D', 13: 'D', 14: 'B', 15: 'D', 16: 'B', 17: 'C', 18: 'A', 19: 'A', 20: 'B',
  21: 'C', 22: 'D', 23: 'D', 24: 29, 25: 'B', 26: 'D', 27: 'C', 28: 'D', 29: 'D', 30: 'B',
  31: 28, 32: 5, 33: 'B', 34: 'D', 35: 'D', 36: 'C', 37: 'B', 38: 832, 39: 'A', 40: 256,
  41: 'A', 42: 'D', 43: 1633, 44: 'B', 45: 5264, 46: 702, 47: 8, 48: 'B', 49: 'D', 50: 107,
  51: 112, 52: 'D', 53: 'D', 54: 'D', 55: 'B', 56: 'D', 57: 13, 58: 'D', 59: 'B', 60: 'A',
  61: 'D', 62: 'A', 63: 'A', 64: 18, 65: 'D', 66: 'A', 67: 19, 68: 'C', 69: 'B', 70: 6,
  71: 'A', 72: 'B', 73: 'A', 74: 4, 75: 7, 76: 6, 77: 15, 78: 'D', 79: 'A', 80: 'A',
  81: 'A', 82: 10, 83: 960, 84: 16, 85: 66, 86: 46, 87: 169, 88: 'B', 89: 45, 90: 'D',
  91: 'A', 92: 'D', 93: 'A', 94: 'B', 95: 25, 96: 'B', 97: 'B', 98: 3, 99: 'B', 100: 'B',
  101: 'D', 102: 5120, 103: 'B', 104: 'B', 105: 'B', 106: 'D', 107: 'B', 108: 'C', 109: 'D', 110: 'A',
  111: 'B', 112: 5, 113: 'C', 114: 'C', 115: 'D', 116: 'B', 117: 'C', 118: 1979, 119: 'A', 120: 'C',
  121: 'A', 122: 'D', 123: 120, 124: 18, 125: 15, 126: 'A'
};

const allQuestions = [
  ...setsRelationsBatch1,
  ...setsRelationsBatch2,
  ...setsRelationsBatch3,
  ...setsRelationsBatch4,
  ...setsRelationsBatch5
];

console.log(`Total questions loaded: ${allQuestions.length}`);

const letterMap = ['A', 'B', 'C', 'D'];
let errors = 0;
let seen = new Set();

for (let i = 1; i <= 126; i++) {
  const q = allQuestions.find(item => item.question_number === i);
  if (!q) {
    console.error(`ERROR: Question ${i} is missing!`);
    errors++;
    continue;
  }
  if (seen.has(i)) {
    console.error(`ERROR: Question ${i} is duplicated!`);
    errors++;
  }
  seen.add(i);

  const official = officialAnswers[i];
  if (typeof official === 'number') {
    if (q.question_type !== 'integer' && q.numeric_answer === undefined) {
      console.error(`ERROR Q${i}: Expected integer answer ${official}, but question_type is ${q.question_type}`);
      errors++;
    } else if (q.numeric_answer !== official) {
      console.error(`ERROR Q${i}: Numeric answer mismatch: got ${q.numeric_answer}, expected ${official}`);
      errors++;
    }
  } else {
    const calculatedLetter = letterMap[q.correct_index];
    if (calculatedLetter !== official) {
      console.error(`ERROR Q${i}: MCQ answer mismatch: got ${calculatedLetter} (index ${q.correct_index}), expected ${official}`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`ERROR Q${i}: MCQ does not have 4 options`);
      errors++;
    }
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR Q${i}: Empty question_text`);
    errors++;
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`ERROR Q${i}: Empty solution`);
    errors++;
  }
  if (q.marks !== 4) {
    console.error(`ERROR Q${i}: Marks is ${q.marks}, expected 4`);
    errors++;
  }
}

if (errors === 0) {
  console.log('✅ ALL 126 QUESTIONS VERIFIED PERFECTLY! 0 ERRORS.');
} else {
  console.error(`❌ Verification failed with ${errors} errors.`);
  process.exit(1);
}

