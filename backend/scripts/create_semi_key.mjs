import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = {
  1: 'C', 2: 'D', 3: 'D', 4: 'D', 5: 'B',
  6: 'D', 7: 'B', 8: 'D', 9: 'B', 10: 'C',
  11: 'C', 12: 'A', 13: 'D', 14: 'B', 15: 'D',
  16: 'D', 17: 'D', 18: 'B', 19: 'A', 20: 'B',
  21: 'D', 22: 'D', 23: 'C', 24: 'C', 25: 'C',
  26: 'D', 27: 'D', 28: 'C', 29: 'B', 30: 'A',
  31: 'D', 32: 'A', 33: 'D', 34: 'C', 35: 'B',
  36: 'B', 37: 'A', 38: 'B', 39: 'D', 40: 'B',
  41: 'D', 42: 'A', 43: 'C', 44: 'B', 45: 'D',
  46: 'C', 47: 'A', 48: 'B', 49: 'A', 50: 'D',
  51: 'A', 52: 'B', 53: 'A', 54: 'A', 55: 'B',
  56: 'D', 57: 'C', 58: 'A', 59: 'A', 60: 'C',
  61: 'A', 62: 'D', 63: 'D', 64: 'C', 65: 'D',
  66: 'B', 67: 'B', 68: 'A', 69: 'B', 70: 'C',
  71: 'B', 72: 'D', 73: 'B', 74: 'A', 75: 'C',
  76: 'D', 77: 'B', 78: 'D', 79: 'C', 80: 'C',
  81: 'D', 82: 'A', 83: 'B', 84: 'B', 85: 'A',
  86: 'B', 87: 'B', 88: 'C', 89: 'B', 90: 'D',
  91: 'A', 92: 'B', 93: 'A', 94: 'A', 95: 'A',
  96: 'A', 97: 'B', 98: 'A', 99: 'A', 100: 'A',
  101: 'A', 102: 'D', 103: 'D', 104: 'B', 105: 'A',
  106: 'C', 107: 'B', 108: 'D', 109: 'A', 110: 'C',
  111: 'D', 112: 'C', 113: 'B', 114: 'A', 115: 'B',
  116: 'C', 117: 'B', 118: 'B', 119: 'A', 120: 'D',
  121: 'B', 122: 'B', 123: 'D', 124: 'A', 125: 'C',
  // Out of syllabus
  126: 'D', 127: 'D', 128: 'D', 129: 'C', 130: 'D',
  131: 'B', 132: 'B', 133: 'C', 134: 'B', 135: 'B',
  136: 'C', 137: 'A', 138: 'D', 139: 'B', 140: 'A',
  141: 'C', 142: 'C', 143: 'C', 144: 'A', 145: 'B',
  146: 'C', 147: 'B', 148: 'D', 149: 'B', 150: 'C',
  151: 'D', 152: 'A', 153: 'B', 154: 'D', 155: 'A',
  156: 'C', 157: 'B', 158: 'C', 159: 'B', 160: 'A',
  161: 'C', 162: 'B', 163: 'A', 164: 'A', 165: 'A',
  166: 'B', 167: 'D'
};

const count = Object.keys(keys).length;
console.log(`Total keys: ${count}`);
if (count !== 167) {
  console.error(`ERROR: Expected 167 keys, got ${count}`);
  process.exit(1);
}

fs.writeFileSync(path.resolve(__dirname, 'semi_official_key.json'), JSON.stringify(keys, null, 2));
console.log('Saved semi_official_key.json successfully.');

