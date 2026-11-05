import { batch1 } from './data/hyperbola_batch1.mjs';
import { batch2 } from './data/hyperbola_batch2.mjs';
import { batch3 } from './data/hyperbola_batch3.mjs';
import { batch4 } from './data/hyperbola_batch4.mjs';

const officialAnswers = {
  1: "D", 2: "D", 3: "A", 4: "D", 5: "B", 6: "D",
  7: "A", 8: "A", 9: "A", 10: "A", 11: "C", 12: "A",
  13: "D", 14: "B", 15: "C", 16: "D", 17: "C", 18: "C",
  19: "A", 20: "C", 21: "C", 22: "C", 23: "A", 24: "A",
  25: "D", 26: "D", 27: "B", 28: "A", 29: "A", 30: "B",
  31: "B", 32: "A", 33: "A", 34: "D", 35: "A", 36: "A",
  37: "C", 38: "2", 39: "A", 40: "D", 41: "80", 42: "C",
  43: "D", 44: "A", 45: "A", 46: "D", 47: "2", 48: "D",
  49: "42", 50: "85", 51: "12", 52: "D", 53: "88", 54: "D",
  55: "C", 56: "20", 57: "3", 58: "B", 59: "B", 60: "216",
  61: "B", 62: "C", 63: "C", 64: "306", 65: "C", 66: "116",
  67: "8", 68: "12", 69: "182", 70: "C", 71: "51", 72: "A",
  73: "C", 74: "C", 75: "233", 76: "B", 77: "B", 78: "40",
  79: "D", 80: "D", 81: "C", 82: "19", 83: "55", 84: "C",
  85: "C", 86: "120", 87: "141", 88: "C", 89: "1944", 90: "189",
  91: "B", 92: "D", 93: "D", 94: "D", 95: "A", 96: "D",
  97: "8", 98: "C", 99: "B", 100: "C", 101: "A"
};

const allQuestions = [...batch1, ...batch2, ...batch3, ...batch4];

console.log(`Total questions loaded: ${allQuestions.length}`);

let errors = 0;

if (allQuestions.length !== 101) {
  console.error(`ERROR: Expected 101 questions, got ${allQuestions.length}`);
  errors++;
}

for (let i = 1; i <= 101; i++) {
  const q = allQuestions.find(item => item.question_number === i);
  if (!q) {
    console.error(`ERROR: Missing question number ${i}`);
    errors++;
    continue;
  }

  const expectedAns = officialAnswers[i];
  if (!expectedAns) {
    console.error(`ERROR: No official answer mapped for Q${i}`);
    errors++;
    continue;
  }

  if (q.type === 'single_choice') {
    if (q.correct_option !== expectedAns) {
      console.error(`ERROR in Q${i}: correct_option '${q.correct_option}' !== official '${expectedAns}'`);
      errors++;
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR in Q${i}: options count is ${q.options ? q.options.length : 0}, expected 4`);
      errors++;
    }
    if (q.numeric_answer !== null && q.numeric_answer !== undefined) {
      console.error(`ERROR in Q${i}: single_choice question should have null numeric_answer`);
      errors++;
    }
  } else if (q.type === 'integer') {
    if (String(q.numeric_answer) !== expectedAns) {
      console.error(`ERROR in Q${i}: numeric_answer '${q.numeric_answer}' !== official '${expectedAns}'`);
      errors++;
    }
    if (q.correct_option !== null && q.correct_option !== undefined) {
      console.error(`ERROR in Q${i}: integer question should have null correct_option`);
      errors++;
    }
  } else {
    console.error(`ERROR in Q${i}: Unknown type '${q.type}'`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR in Q${i}: Empty question_text`);
    errors++;
  }
  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`ERROR in Q${i}: Empty solution_text`);
    errors++;
  }
  if (q.marks !== 4) {
    console.error(`ERROR in Q${i}: marks = ${q.marks}, expected 4`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 101 questions verified against official Page 92 answer key with ZERO errors!');
} else {
  console.error(`Verification FAILED with ${errors} errors.`);
  process.exit(1);
}
