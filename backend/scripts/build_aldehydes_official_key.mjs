import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicit mapping from the Page 160 grid
const officialAnswers = {
  1: 'B', 2: 'B', 3: 'B', 4: 'C', 5: 'B', 6: 'C',
  7: 'D', 8: 'B', 9: 'A', 10: 'D', 11: 'B', 12: 'C',
  13: 'C', 14: 'B', 15: 'B', 16: 'C', 17: 'C', 18: 'C',
  19: 'B', 20: 'D', 21: 'C', 22: 'C', 23: 'C', 24: 'A',
  25: 'A', 26: 'A', 27: 'D', 28: 'A', 29: 'D', 30: 'A',
  31: 'A', 32: 'D', 33: 'D', 34: 'C', 35: 'A', 36: 'C',
  37: 'A', 38: 'B', 39: 'B', 40: 'C', 41: 'A', 42: 'A',
  43: 'B', 44: 'D', 45: 'C', 46: 'D', 47: 'B', 48: 'B',
  49: 'D', 50: 'D', 51: 'B', 52: 'A', 53: '66.67', 54: 'A',
  55: 'C', 56: 'A', 57: 'C', 58: 'B', 59: 'C', 60: 'A',
  61: 'C', 62: 'C', 63: 'D', 64: 'A', 65: 'C', 66: 'A',
  67: 'B', 68: 'B', 69: 'A', 70: 'B', 71: 'D', 72: 'A',
  73: 'B', 74: 'C', 75: '2', 76: 'C', 77: '3', 78: 'B',
  79: 'D', 80: 'A', 81: 'D', 82: 'C', 83: 'A', 84: 'A',
  85: 'B', 86: 'B', 87: 'A', 88: 'D', 89: 'D', 90: 'D',
  91: 'C', 92: 'B', 93: 'A', 94: 'C', 95: 'C', 96: 'C',
  97: 'C', 98: '4', 99: 'C', 100: '2', 101: 'A', 102: 'A',
  103: 'D', 104: 'C', 105: 'A', 106: 'B', 107: '3', 108: 'A',
  109: 'B', 110: 'C', 111: 'A', 112: '3', 113: 'C', 114: 'B',
  115: 'C', 116: 'B', 117: '3', 118: '2', 119: 'D', 120: '4',
  121: 'B', 122: '2', 123: 'B', 124: 'B', 125: 'B', 126: '15',
  127: 'C', 128: '60', 129: 'A', 130: '3', 131: 'D', 132: 'A',
  133: '3', 134: 'D', 135: '0', 136: 'C', 137: 'B', 138: '1',
  139: 'A', 140: 'A', 141: '0', 142: '318', 143: 'D', 144: '9',
  145: 'C', 146: 'A', 147: 'A', 148: 'B', 149: 'D', 150: 'A',
  151: 'C', 152: 'D', 153: 'D', 154: 'C', 155: 'D', 156: 'D',
  157: 'C', 158: 'A', 159: '60', 160: 'C', 161: 'B', 162: 'B',
  163: 'B', 164: 'D', 165: 'B', 166: 'B', 167: 'A', 168: 'A',
  169: 'B', 170: 'C', 171: 'C', 172: 'D', 173: 'C', 174: 'C',
  175: 'B', 176: 'D', 177: 'C', 178: 'D', 179: 'B', 180: '16',
  181: 'C'
};

const NUMERICAL_QUESTIONS = new Set([
  53, 75, 77, 98, 100, 107, 112, 117, 118, 120, 122, 126, 128, 130, 133, 135, 138, 141, 142, 144, 159, 180
]);

const officialKey = {};
for (let q = 1; q <= 181; q++) {
  const ans = officialAnswers[q];
  const isNum = NUMERICAL_QUESTIONS.has(q);
  officialKey[q] = {
    qNum: q,
    question_type: isNum ? 'NUMERICAL' : 'SINGLE_CHOICE',
    answer: ans
  };
}

fs.writeFileSync(path.join(__dirname, 'aldehydes_official_key.json'), JSON.stringify(officialKey, null, 2));
console.log(`Generated official key for all 181 questions. Numerical questions: ${NUMERICAL_QUESTIONS.size}`);
