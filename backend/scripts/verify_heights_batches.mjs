import { heightsBatch1 } from './data/heights_batch1.mjs';
import { heightsBatch2 } from './data/heights_batch2.mjs';

const OFFICIAL_KEY = {
  1: 'A',
  2: 'A',
  3: 'A',
  4: 'C',
  5: 'B',
  6: 'A',
  7: 'C',
  8: 'B',
  9: 'A',
  10: 'B',
  11: 'B',
  12: 'B',
  13: 'D',
  14: 'C',
  15: 'B',
  16: 'D',
  17: 'D',
  18: 'D',
  19: 'D',
  20: 'B',
  21: 'A',
  22: 'A',
  23: 'C',
  24: 'B',
  25: 'A',
  26: 'D',
  27: 'C',
  28: 80,
  29: 'C',
  30: 'D',
  31: 'A',
  32: 'D',
  33: 'B',
  34: 'B',
  35: 'C',
  36: 'C',
  37: 'C',
  38: 'D',
  39: 'A',
  40: 'C',
  41: 'A',
  42: 'B',
  43: 'A',
  44: 'C',
  45: 'B'
};

const letters = ['A', 'B', 'C', 'D'];

const all = [...heightsBatch1, ...heightsBatch2];

console.log(`Total questions loaded: ${all.length}`);

let errors = 0;

if (all.length !== 45) {
  console.error(`ERROR: Expected 45 questions, but got ${all.length}`);
  errors++;
}

all.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.question_number !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected qNum ${expectedNum}, got ${q.question_number}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length < 10) {
    console.error(`ERROR at Q${q.question_number}: empty or too short question_text`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length < 10) {
    console.error(`ERROR at Q${q.question_number}: empty or too short solution`);
    errors++;
  }

  const expectedKey = OFFICIAL_KEY[q.question_number];

  if (q.question_type === 'integer') {
    if (q.correct_index !== expectedKey) {
      console.error(`ERROR at Q${q.question_number}: expected answer ${expectedKey}, got ${q.correct_index}`);
      errors++;
    }
  } else {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR at Q${q.question_number}: expected 4 options, got ${q.options?.length}`);
      errors++;
    }
    const myLetter = letters[q.correct_index];
    if (myLetter !== expectedKey) {
      console.error(`ERROR at Q${q.question_number}: expected letter ${expectedKey}, got ${myLetter} (index ${q.correct_index})`);
      errors++;
    }
  }
});

if (errors === 0) {
  console.log("All 45 questions passed validation with ZERO errors!");
} else {
  console.error(`Validation finished with ${errors} error(s).`);
  process.exit(1);
}

