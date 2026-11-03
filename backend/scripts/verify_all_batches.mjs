import { reasoningBatch1 } from './data/reasoning_batch1.mjs';
import { reasoningBatch2 } from './data/reasoning_batch2.mjs';
import { reasoningBatch3 } from './data/reasoning_batch3.mjs';
import { reasoningBatch4 } from './data/reasoning_batch4.mjs';
import { reasoningBatch5 } from './data/reasoning_batch5.mjs';

const allQuestions = [
  ...reasoningBatch1,
  ...reasoningBatch2,
  ...reasoningBatch3,
  ...reasoningBatch4,
  ...reasoningBatch5
];

console.log('Total questions loaded:', allQuestions.length);

const ANSWER_KEY = {
  1: 'B', 2: 'D', 3: 'C', 4: 'A', 5: 'A', 6: 'A', 7: 'A', 8: 'B', 9: 'C', 10: 'D',
  11: 'C', 12: 'B', 13: 'A', 14: 'C', 15: 'C', 16: 'B', 17: 'C', 18: 'B', 19: 'C', 20: 'A',
  21: 'A', 22: 'C', 23: 'A', 24: 'A', 25: 'C', 26: 'A', 27: 'A', 28: 'D', 29: 'B', 30: 'C',
  31: 'B', 32: 'B', 33: 'D', 34: 'B', 35: 'C', 36: 'A', 37: 'B', 38: 'C', 39: 'B', 40: 'B',
  41: 'D', 42: 'A', 43: 'C', 44: 'A', 45: 'D', 46: 'B', 47: 'C', 48: 'D', 49: 'C', 50: 'D',
  51: 'A', 52: 'D', 53: 'B', 54: 'C', 55: 'D', 56: 'A', 57: 'B', 58: 'A', 59: 'A', 60: 'B',
  61: 'B', 62: 'D', 63: 'B', 64: 'A', 65: 'D', 66: 'B', 67: 'C', 68: 'B', 69: 'A', 70: 'B',
  71: 'D', 72: 'A', 73: 'A', 74: '4', 75: 'B', 76: 'B', 77: 'B', 78: 'D', 79: 'D', 80: 'C',
  81: 'D', 82: 'A', 83: 'B', 84: 'D', 85: 'A', 86: 'C', 87: 'C', 88: 'C', 89: 'C', 90: 'B',
  91: 'B', 92: 'C', 93: 'C', 94: 'A', 95: 'C', 96: 'D', 97: 'C', 98: 'C', 99: '9', 100: 'C',
  101: 'C', 102: 'D', 103: 'D', 104: 'D', 105: 'D', 106: 'C', 107: 'D', 108: 'B', 109: 'D', 110: 'D',
  111: 'B', 112: 'A', 113: 'C', 114: 'B', 115: 'C', 116: 'C', 117: 'B', 118: 'B', 119: 'A', 120: 'D',
  121: 'B', 122: 'A', 123: 'B', 124: 'D', 125: 'A', 126: 'B', 127: 'B', 128: 'B', 129: 'B', 130: '7',
  131: 'D', 132: 'D', 133: 'D', 134: 'B', 135: 'A'
};

const mapLetterToIndex = { A: 0, B: 1, C: 2, D: 3 };

let errors = 0;
for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const qNum = i + 1;
  if (q.question_number !== qNum) {
    console.error(`Mismatch in question number at index ${i}: expected ${qNum}, got ${q.question_number}`);
    errors++;
  }
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Empty question_text at Q${qNum}`);
    errors++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Invalid options at Q${qNum}: length = ${q.options?.length}`);
    errors++;
  }
  if (q.correct_index === undefined || q.correct_index < 0 || q.correct_index > 3) {
    console.error(`Invalid correct_index at Q${qNum}: ${q.correct_index}`);
    errors++;
  }
  // Check answer key
  const officialKey = ANSWER_KEY[qNum];
  const expectedIdx = mapLetterToIndex[officialKey] !== undefined ? mapLetterToIndex[officialKey] : 3; // For 74, 99, 130 option D holds the answer
  if (q.correct_index !== expectedIdx) {
    console.error(`Answer key mismatch at Q${qNum}: expected ${expectedIdx} (${officialKey}), got ${q.correct_index}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('✅ ALL 135 QUESTIONS VALIDATED PERFECTLY WITH ZERO ERRORS!');
} else {
  console.log(`❌ Found ${errors} validation errors.`);
}

