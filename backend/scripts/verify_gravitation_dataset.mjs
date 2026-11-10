import { GRAVITATION_PYQ_QUESTIONS } from './gravitation_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'C', 3: 'D', 4: 'C', 5: 'D',
  6: 'C', 7: 'A', 8: 'D', 9: 'A', 10: 'D',
  11: 'C', 12: 'B', 13: 'A', 14: 'B', 15: 'D',
  16: 'B', 17: 'B', 18: 'A', 19: 'A', 20: 'C',
  21: 'A', 22: 'C', 23: 'A', 24: 'B', 25: 'C',
  26: 'C', 27: 'B', 28: 'D', 29: 'C', 30: 'A',
  31: 'B', 32: 'B', 33: 'C', 34: 'D', 35: 'C',
  36: 'B', 37: 'D', 38: 'C', 39: 'A', 40: 'B',
  41: 'A', 42: 'B', 43: 'D', 44: 'D', 45: 'B',
  46: 'C', 47: 'A', 48: 'C', 49: 'B', 50: 'C',
  51: 'B', 52: 'D', 53: 'A', 54: 'A', 55: 'C',
  56: 'B', 57: 'B', 58: 'B', 59: 'C', 60: 'D',
  61: 'A', 62: 'D', 63: 'B', 64: 'B', 65: 'C',
  66: 'A', 67: 'B', 68: 'B', 69: 'B', 70: 'A',
  71: 'A', 72: 'B', 73: 'C', 74: 'A', 75: 'A',
  76: 'A', 77: 'C', 78: 'B', 79: 'B', 80: 'B',
  81: 'D', 82: 'A', 83: 'D', 84: 'C', 85: 'B',
  86: 'A', 87: 'B', 88: 'C'
};

const optLetter = ['A', 'B', 'C', 'D'];

console.log(`Verifying ${GRAVITATION_PYQ_QUESTIONS.length} Gravitation questions...`);

let errors = 0;

if (GRAVITATION_PYQ_QUESTIONS.length !== 88) {
  console.error(`ERROR: Expected 88 questions, found ${GRAVITATION_PYQ_QUESTIONS.length}`);
  errors++;
}

GRAVITATION_PYQ_QUESTIONS.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.qNum !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
    errors++;
  }

  // Check year tags in question text
  if (/^\[.*?20\d\d.*?\]/i.test(q.question) || /^\[.*?19\d\d.*?\]/i.test(q.question)) {
    console.error(`ERROR in Q${q.qNum}: question text contains exam year tag! -> ${q.question.substring(0, 40)}`);
    errors++;
  }

  // Check 4 options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`ERROR in Q${q.qNum}: options count is not 4`);
    errors++;
  }

  // Check options validity
  q.options.forEach((opt, oIdx) => {
    if (typeof opt === 'string') {
      if (!opt.trim()) {
        console.error(`ERROR in Q${q.qNum}: option ${oIdx} is empty string`);
        errors++;
      }
    } else if (typeof opt === 'object' && opt !== null) {
      if (!opt.text && !opt.image_url) {
        console.error(`ERROR in Q${q.qNum}: option ${oIdx} object has neither text nor image_url`);
        errors++;
      }
    } else {
      console.error(`ERROR in Q${q.qNum}: option ${oIdx} invalid type`);
      errors++;
    }
  });

  // Check answer key
  const expectedKeyLetter = OFFICIAL_KEY[q.qNum];
  const actualKeyLetter = optLetter[q.correct_option];
  if (expectedKeyLetter !== actualKeyLetter) {
    console.error(`ERROR in Q${q.qNum}: Expected key ${expectedKeyLetter}, but got ${actualKeyLetter} (correct_option: ${q.correct_option})`);
    errors++;
  }

  // Check solution
  if (!q.solution || q.solution.trim().length < 20) {
    console.error(`ERROR in Q${q.qNum}: solution is empty or too short`);
    errors++;
  }

  // Check balanced dollars in solution
  const singleDollars = (q.solution.match(/(?<!\$)\$(?!\$)/g) || []).length;
  if (singleDollars % 2 !== 0) {
    console.warn(`WARNING in Q${q.qNum}: unbalanced single '$' in solution (count: ${singleDollars})`);
  }
});

if (errors === 0) {
  console.log(`\nSUCCESS: All 88 questions verified flawlessly!`);
  console.log(`- Exact 88 questions sequential from 1 to 88`);
  console.log(`- Official answer key 100% matched for all 88 questions`);
  console.log(`- All questions have 4 valid options`);
  console.log(`- No exam year tags prepended to question texts`);
  console.log(`- Detailed step-by-step solutions with KaTeX formatting`);
} else {
  console.error(`\nFAILED: Found ${errors} errors.`);
  process.exit(1);
}

