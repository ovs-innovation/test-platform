import { ITF_QUESTIONS_PART1 } from './itf_questions_part1_data.mjs';
import { ITF_QUESTIONS_PART2 } from './itf_questions_part2_data.mjs';

const ANSWER_KEY = {
  1: 'A', 2: 'C', 3: 'C', 4: 'B', 5: 'A', 6: 'D', 7: 'A', 8: 'A', 9: 'C', 10: 'B',
  11: 'A', 12: 'B', 13: 'B', 14: 'C', 15: 'A', 16: 'A', 17: 'D', 18: 'B', 19: 'A', 20: 'B',
  21: 'D', 22: 'C', 23: 'D', 24: 'D', 25: 91, 26: 'C', 27: 'A', 28: 1, 29: 'D', 30: 'A',
  31: 'A', 32: 'C', 33: 'C', 34: 'A', 35: 'A', 36: 'B', 37: 'D', 38: 'B', 39: 'C', 40: 'B',
  41: 'C', 42: 'A', 43: 'B', 44: 'B', 45: 'C', 46: 'A', 47: 'C', 48: 'C', 49: 29, 50: 130,
  51: 'B', 52: 'B', 53: 12, 54: 'A', 55: 'C', 56: 2, 57: 'A', 58: 'A', 59: 'A', 60: 'D',
  61: 'A', 62: 'C', 63: 4, 64: 2, 65: 'B', 66: 'D', 67: 'A', 68: 'B', 69: 'A', 70: 47,
  71: 0, 72: 'B', 73: 'C', 74: 14, 75: 'A', 76: 'B', 77: 5, 78: 3, 79: 'B', 80: 'D',
  81: 'A', 82: 'A', 83: 65, 84: 'D', 85: 'C', 86: 1, 87: 'D', 88: 'C', 89: 2048, 90: 'B',
  91: 'B', 92: 'A', 93: 'A'
};

const letters = ['A', 'B', 'C', 'D'];
const allQuestions = [...ITF_QUESTIONS_PART1, ...ITF_QUESTIONS_PART2];

console.log(`Total questions loaded: ${allQuestions.length}`);

let mismatches = 0;
for (const q of allQuestions) {
  const expected = ANSWER_KEY[q.question_number];
  if (q.question_type === 'integer') {
    if (q.correct_index !== expected) {
      console.error(`Mismatch for Q${q.question_number}: expected ${expected}, got ${q.correct_index}`);
      mismatches++;
    }
  } else {
    const actualLetter = letters[q.correct_index];
    if (actualLetter !== expected) {
      console.error(`Mismatch for Q${q.question_number}: expected ${expected}, got ${actualLetter} (index ${q.correct_index})`);
      mismatches++;
    }
    if (q.options.length !== 4) {
      console.error(`Options count error for Q${q.question_number}: got ${q.options.length}`);
      mismatches++;
    }
  }
}

if (mismatches === 0) {
  console.log('All 93 questions strictly match Page 55 Answer Key and option structure!');
} else {
  console.log(`Found ${mismatches} mismatches.`);
}

