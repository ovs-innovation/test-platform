import { allAlcoholsQuestions } from './alcohols_pyq_questions_data.mjs';

const officialKey = {
  1: 'A', 2: 'D', 3: 'B', 4: 'B', 5: 'A', 6: 'D', 7: 'D', 8: 'A', 9: 'D', 10: 'B',
  11: 'A', 12: 'D', 13: 'D', 14: 'C', 15: 'C', 16: 'B', 17: 'B', 18: 'D', 19: 'D', 20: 'B',
  21: 'B', 22: 'D', 23: 'D', 24: 'C', 25: 'D', 26: 'B', 27: 'C', 28: 'C', 29: 'C', 30: 'D',
  31: 'C', 32: 'B', 33: 'C', 34: 'B', 35: 'B', 36: 'A', 37: 'B', 38: 'D', 39: 'B', 40: 'A',
  41: 'A', 42: 'C', 43: 'C', 44: 'A', 45: 'B', 46: 'B', 47: 'C', 48: 'C', 49: 'C', 50: 'A',
  51: 'A', 52: 'A', 53: 'C', 54: 'C', 55: 'C', 56: 'B', 57: 'C', 58: 'C', 59: 'D', 60: 'C',
  61: 'C', 62: 'A', 63: 'A', 64: 'D', 65: 'A', 66: 'D', 67: 'B', 68: 'A', 69: 'D', 70: 'B',
  71: 'D', 72: 'D', 73: 'C', 74: 'C', 75: 'B', 76: 'A', 77: 'B', 78: 'A'
};

console.log(`Total questions in dataset: ${allAlcoholsQuestions.length}`);

let mismatches = 0;
for (const q of allAlcoholsQuestions) {
  const expected = officialKey[q.question_number];
  if (!expected) {
    console.error(`Unknown question number: ${q.question_number}`);
    mismatches++;
    continue;
  }
  if (q.correct_option.trim().toUpperCase() !== expected) {
    console.error(`Mismatch for Q${q.question_number}: dataset has ${q.correct_option}, official key is ${expected}`);
    mismatches++;
  }
}

if (mismatches === 0 && allAlcoholsQuestions.length === 78) {
  console.log('SUCCESS: All 78 questions match the official answer key 100%!');
} else {
  console.error(`Verification failed with ${mismatches} mismatches.`);
  process.exit(1);
}

