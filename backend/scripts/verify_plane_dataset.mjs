import { MOTION_IN_PLANE_QUESTIONS } from './plane_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'A', 2: 'D', 3: 'A', 4: 'D', 5: 'B', 6: 'B', 7: 'B', 8: 'B', 9: 'A', 10: 'A',
  11: 'D', 12: 'B', 13: 'D', 14: 'C', 15: 'A', 16: 'B', 17: 'C', 18: 'D', 19: 'A', 20: 'A',
  21: 'A', 22: 'C', 23: 'D', 24: 'A', 25: 'D', 26: 'C', 27: 'A', 28: 'B', 29: 'B', 30: 'C',
  31: 'D', 32: 'A', 33: 'D', 34: 'A', 35: 'B', 36: 'B', 37: 'C', 38: 'D', 39: 'B', 40: 'B',
  41: 'B', 42: 'D', 43: 'B', 44: 'A', 45: 'B', 46: 'C', 47: 'C', 48: 'C', 49: 'A', 50: 'B',
  51: 'C', 52: 'C', 53: 'C', 54: 'A', 55: 'C', 56: 'C', 57: 'B', 58: 'B', 59: 'D', 60: 'D',
  61: 'A', 62: 'A', 63: 'B', 64: 'B', 65: 'B', 66: 'C', 67: 'C', 68: 'B', 69: 'B', 70: 'B',
  71: 'C', 72: 'D', 73: 'A', 74: 'A', 75: 'A'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const EXPECTED_DIAGRAM_QUESTIONS = [4, 15, 17, 27, 37, 56];

console.log(`Verifying ${MOTION_IN_PLANE_QUESTIONS.length} questions...`);

let errors = [];

if (MOTION_IN_PLANE_QUESTIONS.length !== 75) {
  errors.push(`Expected 75 questions, but got ${MOTION_IN_PLANE_QUESTIONS.length}`);
}

MOTION_IN_PLANE_QUESTIONS.forEach((q, idx) => {
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
  console.log(`Verification PASSED perfectly! All 75 questions match official key, formatting, and diagram criteria.`);
}
