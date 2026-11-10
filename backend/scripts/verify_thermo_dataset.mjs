// Verification script for Heat and Thermodynamics PYQ dataset
import { THERMO_PYQ_QUESTIONS } from './thermo_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'D', 3: 'B', 4: 'A', 5: 'D', 6: 'A', 7: 'D', 8: 'A', 9: 'D', 10: 'A',
  11: 'D', 12: 'B', 13: 'D', 14: 'C', 15: 'A', 16: 'D', 17: 'D', 18: 'D', 19: 'A', 20: 'D',
  21: 'A', 22: 'D', 23: 'B', 24: 'D', 25: 'D', 26: 'B', 27: 'D', 28: 'D', 29: 'A', 30: 'A',
  31: 'A', 32: 'A', 33: 'D', 34: 'A', 35: 'D', 36: 'B', 37: 'C', 38: 'A', 39: 'A', 40: 'C',
  41: 'D', 42: 'C', 43: 'B', 44: 'A', 45: 'B', 46: 'D', 47: 'C', 48: 'A', 49: 'C', 50: 'B',
  51: 'B', 52: 'D', 53: 'B', 54: 'B', 55: 'A', 56: 'B', 57: 'D', 58: 'D', 59: 'D', 60: 'C',
  61: 'D', 62: 'C', 63: 'D', 64: 'A', 65: 'D', 66: 'A', 67: 'C', 68: 'D', 69: 'B', 70: 'A',
  71: 'D', 72: 'D', 73: 'A', 74: 'D', 75: 'D', 76: 'A', 77: 'D', 78: 'B', 79: 'C', 80: 'A',
  81: 'A', 82: 'D', 83: 'A', 84: 'D', 85: 'D', 86: 'D', 87: 'C', 88: 'D', 89: 'B', 90: 'A',
  91: 'C', 92: 'C', 93: 'A', 94: 'D', 95: 'B', 96: 'A', 97: 'A', 98: 'B', 99: 'B', 100: 'C',
  101: 'A', 102: 'D', 103: 'D', 104: 'A', 105: 'B', 106: 'B', 107: 'A', 108: 'A', 109: 'C', 110: 'A',
  111: 'D', 112: 'C', 113: 'C', 114: 'A', 115: 'C', 116: 'B', 117: 'D', 118: 'B', 119: 'A', 120: 'C',
  121: 'D', 122: 'D', 123: 'D', 124: 'B', 125: 'B', 126: 'C', 127: 'B', 128: 'C', 129: 'C', 130: 'C',
  131: 'D', 132: 'C', 133: 'A', 134: 'A', 135: 'C', 136: 'D', 137: 'D', 138: 'C', 139: 'B', 140: 'C',
  141: 'B', 142: 'B', 143: 'B', 144: 'B',
  145: 'D', 146: 'C', 147: 'A', 148: 'A', 149: 'B', 150: 'A', 151: 'C', 152: 'A', 153: 'C', 154: 'C',
  155: 'D', 156: 'D', 157: 'D', 158: 'C', 159: 'A', 160: 'B', 161: 'B', 162: 'A', 163: 'C'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

console.log('--- VERIFYING HEAT AND THERMODYNAMICS PYQ DATASET ---');
console.log(`Total questions loaded: ${THERMO_PYQ_QUESTIONS.length}`);

if (THERMO_PYQ_QUESTIONS.length !== 163) {
  console.error(`ERROR: Expected 163 questions, found ${THERMO_PYQ_QUESTIONS.length}`);
  process.exit(1);
}

let errors = 0;

for (let i = 0; i < THERMO_PYQ_QUESTIONS.length; i++) {
  const q = THERMO_PYQ_QUESTIONS[i];
  const expectedNum = i + 1;

  if (q.qNum !== expectedNum) {
    console.error(`[Q${q.qNum}] Question numbering mismatch. Expected Q${expectedNum}`);
    errors++;
  }

  // Check no year prefix in question text
  if (q.question.match(/^\s*\[.*?(NEET|AIPMT).*?\]/i)) {
    console.error(`[Q${q.qNum}] Question contains exam year prefix: ${q.question.slice(0, 40)}`);
    errors++;
  }

  // Check options length
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`[Q${q.qNum}] Invalid options count: ${q.options ? q.options.length : 0}`);
    errors++;
  }

  // Check correctIndex
  const letter = OPTION_LETTERS[q.correctIndex];
  const expectedLetter = OFFICIAL_KEY[q.qNum];
  if (letter !== expectedLetter) {
    console.error(`[Q${q.qNum}] Answer mismatch! Dataset has ${letter} (index ${q.correctIndex}), Official key has ${expectedLetter}`);
    errors++;
  }

  // Check solution
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`[Q${q.qNum}] Solution is empty!`);
    errors++;
  }
}

if (errors === 0) {
  console.log('✅ ALL 163 QUESTIONS VERIFIED PERFECTLY!');
  console.log(' - Exactly 163 questions');
  console.log(' - Numbers 1 through 163 continuous');
  console.log(' - 0 exam year prefixes in question text');
  console.log(' - All 163 match official answer key on Pages 39 & 40');
  console.log(' - All options and solutions non-empty');
} else {
  console.error(`❌ Found ${errors} errors in dataset!`);
  process.exit(1);
}

