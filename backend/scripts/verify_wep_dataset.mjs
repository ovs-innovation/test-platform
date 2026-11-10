import { ALL_WEP_PYQ_QUESTIONS } from './wep_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'A', 2: 'C', 3: 'D', 4: 'C', 5: 'D', 6: 'A', 7: 'D', 8: 'C', 9: 'A', 10: 'C',
  11: 'A', 12: 'A', 13: 'C', 14: 'D', 15: 'B', 16: 'C', 17: 'C', 18: 'C', 19: 'B', 20: 'B',
  21: 'C', 22: 'D', 23: 'C', 24: 'C', 25: 'A', 26: 'C', 27: 'D', 28: 'C', 29: 'B', 30: 'B',
  31: 'B', 32: 'B', 33: 'D', 34: 'D', 35: 'D', 36: 'A', 37: 'D', 38: 'D', 39: 'C', 40: 'A',
  41: 'C', 42: 'D', 43: 'D', 44: 'B', 45: 'A', 46: 'C', 47: 'A', 48: 'A', 49: 'D', 50: 'B',
  51: 'A', 52: 'B', 53: 'B', 54: 'C', 55: 'D', 56: 'D', 57: 'B', 58: 'A', 59: 'A', 60: 'A',
  61: 'A', 62: 'B', 63: 'A', 64: 'A', 65: 'C', 66: 'A', 67: 'B', 68: 'A', 69: 'B'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const EXPECTED_DIAGRAM_QUESTIONS = [9, 14, 33, 44, 47];

console.log(`Verifying ${ALL_WEP_PYQ_QUESTIONS.length} questions...`);

let errors = [];

if (ALL_WEP_PYQ_QUESTIONS.length !== 69) {
  errors.push(`Expected 69 questions, but got ${ALL_WEP_PYQ_QUESTIONS.length}`);
}

ALL_WEP_PYQ_QUESTIONS.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.qNum !== expectedNum) {
    errors.push(`Question at index ${idx} has qNum ${q.qNum}, expected ${expectedNum}`);
  }

  // Answer key check
  const expectedLetter = OFFICIAL_KEY[q.qNum];
  const actualLetter = OPTION_LETTERS[q.correct_option];
  if (expectedLetter !== actualLetter) {
    errors.push(`Q${q.qNum}: Expected answer ${expectedLetter}, but got ${actualLetter} (index ${q.correct_option})`);
  }

  // Options check
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Q${q.qNum}: Invalid options count: ${q.options ? q.options.length : 0}`);
  }

  // Question prefix check (no exam year tag in question text)
  if (q.question.trim().startsWith('[')) {
    errors.push(`Q${q.qNum}: Question text starts with '[': ${q.question.substring(0, 30)}...`);
  }

  // Solution check
  if (!q.solution || q.solution.trim().length === 0) {
    errors.push(`Q${q.qNum}: Empty solution`);
  }

  // Diagram check
  if (EXPECTED_DIAGRAM_QUESTIONS.includes(q.qNum)) {
    if (!q.image_url || !q.image_url.includes('cloudinary.com')) {
      errors.push(`Q${q.qNum}: Missing or invalid image_url: ${q.image_url}`);
    }
  }
});

if (errors.length > 0) {
  console.error(`Verification FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(`- ${e}`));
  process.exit(1);
} else {
  console.log(`Verification PASSED perfectly! All 69 questions match official key, formatting, and diagram criteria.`);
}

