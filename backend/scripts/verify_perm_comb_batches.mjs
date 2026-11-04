import { batch1 } from './data/perm_comb_batch1.mjs';
import { batch2 } from './data/perm_comb_batch2.mjs';
import { batch3 } from './data/perm_comb_batch3.mjs';
import { batch4 } from './data/perm_comb_batch4.mjs';
import { batch5 } from './data/perm_comb_batch5.mjs';
import { batch6 } from './data/perm_comb_batch6.mjs';
import { batch7 } from './data/perm_comb_batch7.mjs';
import { batch8 } from './data/perm_comb_batch8.mjs';
import { batch9 } from './data/perm_comb_batch9.mjs';

const allQuestions = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
  ...batch9
];

console.log(`Loaded ${allQuestions.length} total questions.`);

// Exact Official Answer Key directly from Page 81 image (grid 37 rows x 6 cols):
const officialKey = {
  1: 'C', 2: 'D', 3: 'D', 4: 'C', 5: 'A', 6: 'C',
  7: 'C', 8: 'D', 9: 'A', 10: 'C', 11: 'C', 12: 'D',
  13: 'A', 14: 'D', 15: 'C', 16: 'D', 17: 'B', 18: 'D',
  19: 'C', 20: 'A', 21: 'A', 22: 'C', 23: 'B', 24: 'C',
  25: 'B', 26: 'D', 27: 'C', 28: 'D', 29: 'B', 30: 'C',
  31: 'B', 32: 'A', 33: 'C', 34: 'B', 35: 'C', 36: 'A',
  37: 'B', 38: 'B', 39: 'C', 40: 'A', 41: 'C', 42: 'B',
  43: 'B', 44: 'B', 45: 'D', 46: 'D', 47: 'A', 48: 'A',
  49: 'C', 50: 'C', 51: 'C', 52: 'B', 53: 'B', 54: 'C',
  55: 'D', 56: 'C', 57: 'B', 58: 'A', 59: 'A', 60: 'C',
  61: 'D', 62: 'D', 63: '490', 64: 'C', 65: '2454', 66: 'D',
  67: '309', 68: 'A', 69: '54', 70: '135', 71: '240', 72: 'D',
  73: 'B', 74: '120', 75: 'B', 76: '31650', 77: '32', 78: 'B',
  79: '45', 80: 'A', 81: 'A', 82: '1000', 83: 'D', 84: 'C',
  85: 'C', 86: '300', 87: 'A', 88: '777', 89: '96', 90: '1251',
  91: '238', 92: 'C', 93: '924', 94: '52', 95: '7744', 96: '100',
  97: '80', 98: '576', 99: '5143', 100: '77', 101: 'D', 102: '40',
  103: '576', 104: '63', 105: '243', 106: '1120', 107: '150', 108: '56',
  109: 'A', 110: 'D', 111: '18915', 112: '1086', 113: '1492', 114: '180',
  115: '30', 116: '7073', 117: '17', 118: '11', 119: '6', 120: '60',
  121: '546', 122: 'B', 123: '43', 124: '120', 125: 'D', 126: 'B',
  127: '6860', 128: '1436', 129: '32', 130: 'A', 131: '3000', 132: '21',
  133: '240', 134: 'C', 135: '2997', 136: '45', 137: '50400', 138: '81',
  139: '105', 140: '171', 141: 'D', 142: 'D', 143: '432', 144: 'A',
  145: 'B', 146: '31', 147: 'B', 148: '16', 149: '4898', 150: 'C',
  151: '26664', 152: 'C', 153: '44', 154: 'A', 155: '1260', 156: 'B',
  157: '413', 158: '16', 159: 'A', 160: '72', 161: 'C', 162: 'C',
  163: '553', 164: 'D', 165: '11376', 166: '3734', 167: 'D', 168: 'C',
  169: '101', 170: 'C', 171: '5626', 172: '125', 173: 'B', 174: 'D',
  175: 'A', 176: 'C', 177: '36', 178: 'A', 179: '70', 180: 'A',
  181: 'B', 182: 'A', 183: '17280', 184: 'C', 185: 'D', 186: '64',
  187: '1405', 188: 'D', 189: 'C', 190: 'C', 191: 'B', 192: 'D',
  193: '14', 194: 'B', 195: '64', 196: 'B', 197: '13', 198: 'D',
  199: 'D', 200: 'D', 201: '1333', 202: 'A', 203: '660', 204: '1422',
  205: '260', 206: 'A', 207: '42', 208: 'D', 209: 'C', 210: 'D',
  211: '210', 212: 'C', 213: 'C', 214: 'D', 215: 'C', 216: '126',
  217: 'A', 218: 'D', 219: 'C', 220: 'B'
};

let errors = 0;

for (let i = 1; i <= 220; i++) {
  const q = allQuestions.find(x => x.question_number === i);
  if (!q) {
    console.error(`ERROR: Question ${i} is missing!`);
    errors++;
    continue;
  }
  
  const expectedKey = officialKey[i];
  const qType = q.type || q.question_type;
  
  if (qType === 'single_choice' || qType === 'mcq') {
    if (!q.options || q.options.length !== 4) {
      console.error(`ERROR: Q${i} (single_choice) does not have 4 options!`);
      errors++;
    }
    if (q.correct_option !== expectedKey) {
      console.error(`ERROR: Q${i} option mismatch: got ${q.correct_option}, expected ${expectedKey}`);
      errors++;
    }
    if (q.marks !== 4) {
      console.error(`ERROR: Q${i} marks is not 4!`);
      errors++;
    }
  } else if (qType === 'integer' || qType === 'numeric') {
    const val = q.numeric_answer !== undefined && q.numeric_answer !== null ? q.numeric_answer : q.correct_value;
    if (String(val) !== String(expectedKey)) {
      console.error(`ERROR: Q${i} integer mismatch: got ${val}, expected ${expectedKey}`);
      errors++;
    }
    if (q.marks !== 4) {
      console.error(`ERROR: Q${i} marks is not 4!`);
      errors++;
    }
  } else {
    console.error(`ERROR: Q${i} has unknown type ${qType}!`);
    errors++;
  }

  const sol = q.solution_text || q.solution;
  if (!sol || sol.trim().length === 0) {
    console.error(`ERROR: Q${i} has empty solution!`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 220 questions verified perfectly against official answer key with zero errors!');
} else {
  console.error(`FAILED: ${errors} errors found.`);
  process.exit(1);
}
