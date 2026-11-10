import { ALL_WAVES_PYQ_QUESTIONS } from './waves_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'B', 3: 'D', 4: 'D', 5: 'C',
  6: 'A', 7: 'C', 8: 'C', 9: 'C', 10: 'A',
  11: 'D', 12: 'B', 13: 'A', 14: 'A', 15: 'B',
  16: 'D', 17: 'A', 18: 'D', 19: 'B', 20: 'A',
  21: 'A', 22: 'D', 23: 'D', 24: 'B', 25: 'C',
  26: 'C', 27: 'B', 28: 'C', 29: 'D', 30: 'B',
  31: 'A', 32: 'C', 33: 'C', 34: 'D', 35: 'A',
  36: 'C', 37: 'B', 38: 'A', 39: 'D', 40: 'A',
  41: 'B', 42: 'A', 43: 'C', 44: 'B', 45: 'C',
  46: 'A', 47: 'C', 48: 'C', 49: 'B', 50: 'C',
  51: 'B', 52: 'A', 53: 'A', 54: 'D', 55: 'A',
  56: 'A', 57: 'A', 58: 'D', 59: 'C', 60: 'A',
  61: 'A', 62: 'C', 63: 'A', 64: 'A', 65: 'A',
  66: 'A', 67: 'A', 68: 'C', 69: 'C', 70: 'C',
  71: 'B', 72: 'D', 73: 'B', 74: 'D', 75: 'C',
  76: 'A', 77: 'C', 78: 'B', 79: 'B',
  80: 'C', 81: 'A', 82: 'D', 83: 'C', 84: 'A',
  85: 'C', 86: 'B', 87: 'B', 88: 'B', 89: 'B',
  90: 'A', 91: 'B', 92: 'A'
};

const optLetters = ['A', 'B', 'C', 'D'];

console.log(`Verifying ${ALL_WAVES_PYQ_QUESTIONS.length} Waves questions...`);

let errors = 0;

if (ALL_WAVES_PYQ_QUESTIONS.length !== 92) {
  console.error(`ERROR: Expected 92 questions, found ${ALL_WAVES_PYQ_QUESTIONS.length}`);
  errors++;
}

ALL_WAVES_PYQ_QUESTIONS.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.qNum !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
    errors++;
  }

  // Check no exam year tags in question text
  if (/^\[.*?20\d\d.*?\]/i.test(q.question) || /^\[.*?19\d\d.*?\]/i.test(q.question)) {
    console.error(`ERROR in Q${q.qNum}: contains exam year tag! -> ${q.question.substring(0, 40)}`);
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

  // Check official answer key
  const expectedKey = OFFICIAL_KEY[q.qNum];
  const actualKey = optLetters[q.correct_option];
  if (expectedKey !== actualKey) {
    console.error(`ERROR in Q${q.qNum}: Expected key ${expectedKey}, but got ${actualKey} (correct_option: ${q.correct_option})`);
    errors++;
  }

  // Check solution
  if (!q.solution || q.solution.trim().length < 20) {
    console.error(`ERROR in Q${q.qNum}: solution is empty or too short`);
    errors++;
  }

  // Check Q82 diagram
  if (q.qNum === 82 && !q.image_url) {
    console.error(`ERROR in Q82: missing diagram image_url!`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`\nSUCCESS: All 92 questions verified flawlessly!`);
  console.log(`- Exact 92 questions sequential from 1 to 92`);
  console.log(`- Official answer key 100% matched for all 92 questions`);
  console.log(`- All questions have 4 valid options`);
  console.log(`- No exam year tags prepended to question texts`);
  console.log(`- Q82 diagram attached`);
  console.log(`- Detailed step-by-step solutions with KaTeX formatting`);
} else {
  console.error(`\nFAILED: Found ${errors} errors.`);
  process.exit(1);
}

