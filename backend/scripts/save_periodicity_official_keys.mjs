import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete official answer key for all 193 questions from Page 59 of PDF
const OFFICIAL_KEYS = {
  1: "C", 2: "B", 3: "B", 4: "D", 5: "C", 6: "C",
  7: "B", 8: "C", 9: "B", 10: "D", 11: "D", 12: "D",
  13: "C", 14: "B", 15: "D", 16: "D", 17: "D", 18: "C",
  19: "B", 20: "A", 21: "A", 22: "C", 23: "D", 24: "A",
  25: "D", 26: "C", 27: "C", 28: "B", 29: "A", 30: "A",
  31: "C", 32: "C", 33: "A", 34: "A", 35: "C", 36: "D",
  37: "A", 38: "B", 39: "B", 40: "D", 41: "C", 42: "C",
  43: "C", 44: "D", 45: "D", 46: "B", 47: "A", 48: "A",
  49: "B", 50: "B", 51: "D", 52: "D", 53: "A", 54: "D",
  55: "B", 56: "B", 57: "D", 58: "B", 59: "C", 60: "B",
  61: "B", 62: "A", 63: "C", 64: "C", 65: "C", 66: "D",
  67: "D", 68: "B", 69: "A", 70: "C", 71: "C", 72: "B",
  73: "B", 74: "C", 75: "101", 76: "A", 77: "A", 78: "D",
  79: "C", 80: "B", 81: "A", 82: "C", 83: "B", 84: "C",
  85: "B", 86: "D", 87: "B", 88: "C", 89: "B", 90: "B",
  91: "C", 92: "A", 93: "D", 94: "B", 95: "B", 96: "D",
  97: "D", 98: "A", 99: "C", 100: "B", 101: "A", 102: "C",
  103: "A", 104: "D", 105: "B", 106: "D", 107: "B", 108: "C",
  109: "A", 110: "C", 111: "B", 112: "D", 113: "D", 114: "A",
  115: "D", 116: "A", 117: "B", 118: "C", 119: "A", 120: "C",
  121: "D", 122: "D", 123: "D", 124: "D", 125: "B", 126: "C",
  127: "D", 128: "C", 129: "11", 130: "B", 131: "C", 132: "B",
  133: "B", 134: "6", 135: "D", 136: "B", 137: "A", 138: "B",
  139: "D", 140: "C", 141: "C", 142: "D", 143: "D", 144: "B",
  145: "C", 146: "B", 147: "C", 148: "B", 149: "A", 150: "D",
  151: "D", 152: "D", 153: "A", 154: "A", 155: "B", 156: "A",
  157: "C", 158: "D", 159: "C", 160: "B", 161: "C", 162: "B",
  163: "D", 164: "A", 165: "B", 166: "A", 167: "A", 168: "D",
  169: "B", 170: "C", 171: "B", 172: "C", 173: "B", 174: "D",
  175: "C", 176: "D", 177: "A", 178: "D", 179: "D", 180: "A",
  181: "C", 182: "B", 183: "D", 184: "A", 185: "B", 186: "A",
  187: "C", 188: "C", 189: "A", 190: "A", 191: "A", 192: "C",
  193: "A"
};

console.log('Total official keys defined:', Object.keys(OFFICIAL_KEYS).length);

const outPath = path.resolve(__dirname, 'periodicity_official_keys.json');
fs.writeFileSync(outPath, JSON.stringify(OFFICIAL_KEYS, null, 2));
console.log(`Saved official keys to ${outPath}`);
