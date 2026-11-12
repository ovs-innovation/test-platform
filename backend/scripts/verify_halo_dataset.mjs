import { allHaloQuestions } from './halo_pyq_questions_data.mjs';

const officialKey = {
  1: 'B', 2: 'B', 3: 'A', 4: 'D', 5: 'C',
  6: 'D', 7: 'A', 8: 'B', 9: 'D', 10: 'A',
  11: 'B', 12: 'D', 13: 'B', 14: 'D', 15: 'B',
  16: 'A', 17: 'D', 18: 'C', 19: 'A', 20: 'C',
  21: 'C', 22: 'C', 23: 'A', 24: 'C', 25: 'C',
  26: 'C', 27: 'A', 28: 'D', 29: 'B', 30: 'B',
  31: 'D', 32: 'D', 33: 'B', 34: 'B', 35: 'A',
  36: 'A', 37: 'B', 38: 'C', 39: 'A', 40: 'D',
  41: 'B', 42: 'D', 43: 'D', 44: 'B', 45: 'B',
  46: 'B', 47: 'A', 48: 'D', 49: 'C', 50: 'D'
};

console.log(`Total questions loaded: ${allHaloQuestions.length}`);

let mismatch = 0;
for (const q of allHaloQuestions) {
  const expected = officialKey[q.question_number];
  if (q.correct_option !== expected) {
    console.error(`MISMATCH for Q${q.question_number}: got ${q.correct_option}, expected ${expected}`);
    mismatch++;
  }
}

if (mismatch === 0 && allHaloQuestions.length === 50) {
  console.log('✅ ALL 50 QUESTIONS PERFECTLY MATCH OFFICIAL ANSWER KEY!');
} else {
  console.error(`❌ Found ${mismatch} mismatches.`);
}

