import { trigBatch1 } from './data/trig_batch1.mjs';
import { trigBatch2 } from './data/trig_batch2.mjs';
import { trigBatch3 } from './data/trig_batch3.mjs';

const OFFICIAL_KEY = {
  1: 'B', 2: 'A', 3: 'A', 4: 'D', 5: 'A', 6: 'C',
  7: 'D', 8: 'B', 9: 'C', 10: 'B', 11: 'B', 12: 'D',
  13: 'B', 14: 'D', 15: 'D', 16: 'C', 17: 'B', 18: 'A',
  19: 'A', 20: 'D', 21: 'A', 22: 'B', 23: 'D', 24: 1,
  25: 'B', 26: 'B', 27: 'D', 28: 11, 29: 'D', 30: 'B',
  31: 'C', 32: 'A', 33: 'B', 34: 'A', 35: 'D', 36: 80,
  37: 'B', 38: 'B', 39: 'A', 40: 'A', 41: 'A', 42: 'C',
  43: 'A', 44: 4, 45: 'D', 46: 'A', 47: 'A', 48: 'A',
  49: 'B', 50: 'B', 51: 'C', 52: 'B', 53: 'D', 54: 'D',
  55: 'D', 56: 4, 57: 20, 58: 'C', 59: 'D', 60: 'C',
  61: 'C', 62: 'D', 63: 'C', 64: 'A', 65: 'A', 66: 2
};

const letters = ['A', 'B', 'C', 'D'];

const all = [...trigBatch1, ...trigBatch2, ...trigBatch3];

console.log(`Total questions loaded: ${all.length}`);

let errors = 0;

if (all.length !== 66) {
  console.error(`ERROR: Expected 66 questions, but got ${all.length}`);
  errors++;
}

all.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.question_number !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected qNum ${expectedNum}, got ${q.question_number}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length < 5) {
    console.error(`ERROR at Q${q.question_number}: empty or too short question_text`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length < 5) {
    console.error(`ERROR at Q${q.question_number}: empty or too short solution`);
    errors++;
  }

  const expectedKey = OFFICIAL_KEY[q.question_number];

  if (q.question_type === 'integer') {
    if (q.correct_index !== expectedKey) {
      console.error(`ERROR at Q${q.question_number}: expected answer ${expectedKey}, got ${q.correct_index}`);
      errors++;
    }
    if (q.options && q.options.length > 0) {
      console.error(`ERROR at Q${q.question_number}: integer question should have empty options`);
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
  console.log("All 66 questions passed validation with ZERO errors!");
} else {
  console.error(`Validation finished with ${errors} error(s).`);
  process.exit(1);
}
