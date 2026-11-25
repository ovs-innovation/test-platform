import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete answer key from Page 113 of Alternating Current PDF
export const AC_OFFICIAL_KEYS_RAW = {
  1: "B", 2: "B", 3: "A", 4: "C", 5: "A", 6: "C",
  7: "D", 8: "C", 9: "B", 10: "A", 11: "C", 12: "D",
  13: "B", 14: "D", 15: "A", 16: "D", 17: "C", 18: "D",
  19: "C", 20: "B", 21: "D", 22: "D", 23: "D", 24: "B",
  25: "C", 26: "C", 27: "A", 28: "B", 29: "D", 30: "B",
  31: "C", 32: "B", 33: "B", 34: "A", 35: "A", 36: "D",
  37: "D", 38: "D", 39: "D", 40: "C", 41: "D", 42: "A",
  43: "A", 44: "D", 45: "A", 46: "400", 47: "440", 48: "2000",
  49: "900", 50: "10", 51: "D", 52: "A", 53: "B", 54: "D",
  55: "282.84", 56: "D", 57: "4", 58: "C", 59: "C", 60: "B",
  61: "B", 62: "D", 63: "A", 64: "A", 65: "C", 66: "C",
  67: "C", 68: "3", 69: "125", 70: "D", 71: "C", 72: "A",
  73: "A", 74: "500", 75: "A", 76: "D", 77: "B", 78: "D",
  79: "11", 80: "1", 81: "B", 82: "2", 83: "242", 84: "A",
  85: "C", 86: "B", 87: "A", 88: "A", 89: "22", 90: "0",
  91: "D", 92: "100", 93: "15", 94: "0", 95: "C", 96: "5",
  97: "B", 98: "C", 99: "B", 100: "44", 101: "B", 102: "B",
  103: "3", 104: "C", 105: "D", 106: "250", 107: "C", 108: "C",
  109: "10", 110: "D", 111: "10", 112: "100", 113: "A", 114: "8",
  115: "3872", 116: "A", 117: "B", 118: "A", 119: "242", 120: "25",
  121: "A", 122: "40", 123: "C", 124: "240", 125: "A", 126: "9",
  127: "4", 128: "B", 129: "D", 130: "C", 131: "C", 132: "1",
  133: "C", 134: "B", 135: "C", 136: "C", 137: "A", 138: "B",
  139: "45", 140: "D", 141: "C", 142: "D", 143: "B", 144: "8",
  145: "D", 146: "A", 147: "50", 148: "C", 149: "250", 150: "C",
  151: "10", 152: "D", 153: "22", 154: "B", 155: "10", 156: "A",
  157: "4", 158: "C", 159: "2", 160: "B", 161: "B", 162: "A",
  163: "C", 164: "1", 165: "C", 166: "5", 167: "1", 168: "B",
  169: "50", 170: "C", 171: "C", 172: "314", 173: "B", 174: "100",
  175: "C", 176: "200", 177: "A"
};

const keysMap = {};
let mcqCount = 0;
let numCount = 0;

for (let q = 1; q <= 177; q++) {
  const ans = String(AC_OFFICIAL_KEYS_RAW[q]).trim();
  const isNumerical = !['A', 'B', 'C', 'D'].includes(ans);
  if (isNumerical) numCount++; else mcqCount++;
  keysMap[q] = ans;
}

console.log(`Loaded ${Object.keys(keysMap).length} official answers.`);
console.log(`MCQs: ${mcqCount}, Numericals: ${numCount}`);

fs.writeFileSync(
  path.resolve(__dirname, 'ac_jee_official_keys.json'),
  JSON.stringify(keysMap, null, 2)
);
console.log('Saved ac_jee_official_keys.json');
