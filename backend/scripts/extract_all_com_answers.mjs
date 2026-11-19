import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Official Answer Key from page 106 OCR + manual confirmation of noise:
// 1.C 2.C 3.A 4.B 5.C 6.C 7.C 8.D 9.A 10.C 11.A 12.A 13.A 14.B 15.A 16.A 17.C 18.D
// 19.C 20.B 21.C 22.D 23.C 24.D 25.B 26.C 27.D 28.D 29.A 30.C 31.D 32.C 33.B 34.D 35.B 36.A
// 37.B 38.A 39.B 40.B 41.B 42.A 43.D 44.B 45.C 46.C 47.C 48.A 49.A 50.D 51.B 52.1 53.A 54.D
// 55.B 56.B 57.A 58.C 59.23 60.10 61.A 62.B 63.120 64.D 65.3 66.1 67.B 68.C 69.30 70.C 71.4 72.D
// 73.20 74.A 75.4 76.1 77.2 78.25 79.D 80.C 81.400 82.A 83.1 84.D 85.12 86.C 87.10 88.C 89.6 90.C
// 91.2 92.B 93.B 94.B 95.B 96.B 97.8 98.A 99.2 100.4 101.D 102.C 103.D 104.B 105.5 106.B 107.375 108.D
// 109.A 110.A 111.2 112.B 113.A 114.D 115.D 116.B 117.3 118.B 119.3 120.B 121.D 122.B 123.15 124.D 125.A 126.C
// 127.A 128.A 129.D 130.A 131.C 132.D 133.D 134.C 135.D 136.D 137.C 138.A 139.C

const OFFICIAL_KEY = {
  1: 'C', 2: 'C', 3: 'A', 4: 'B', 5: 'C', 6: 'C', 7: 'C', 8: 'D', 9: 'A', 10: 'C',
  11: 'A', 12: 'A', 13: 'A', 14: 'B', 15: 'A', 16: 'A', 17: 'C', 18: 'D', 19: 'C', 20: 'B',
  21: 'C', 22: 'D', 23: 'C', 24: 'D', 25: 'B', 26: 'C', 27: 'D', 28: 'D', 29: 'A', 30: 'C',
  31: 'D', 32: 'C', 33: 'B', 34: 'D', 35: 'B', 36: 'A', 37: 'B', 38: 'A', 39: 'B', 40: 'B',
  41: 'B', 42: 'A', 43: 'D', 44: 'B', 45: 'C', 46: 'C', 47: 'C', 48: 'A', 49: 'A', 50: 'D',
  51: 'B', 52: 1, 53: 'A', 54: 'D', 55: 'B', 56: 'B', 57: 'A', 58: 'C', 59: 23, 60: 10,
  61: 'A', 62: 'B', 63: 120, 64: 'D', 65: 3, 66: 1, 67: 'B', 68: 'C', 69: 30, 70: 'C',
  71: 4, 72: 'D', 73: 20, 74: 'A', 75: 4, 76: 1, 77: 2, 78: 25, 79: 'D', 80: 'C',
  81: 400, 82: 'A', 83: 1, 84: 'D', 85: 12, 86: 'C', 87: 10, 88: 'C', 89: 6, 90: 'C',
  91: 2, 92: 'B', 93: 'B', 94: 'B', 95: 'B', 96: 'B', 97: 8, 98: 'A', 99: 2, 100: 4,
  101: 'D', 102: 'C', 103: 'D', 104: 'B', 105: 5, 106: 'B', 107: 375, 108: 'D', 109: 'A', 110: 'A',
  111: 2, 112: 'B', 113: 'A', 114: 'D', 115: 'D', 116: 'B', 117: 3, 118: 'B', 119: 3, 120: 'B',
  121: 'D', 122: 'B', 123: 15, 124: 'D', 125: 'A', 126: 'C', 127: 'A', 128: 'A', 129: 'D', 130: 'A',
  131: 'C', 132: 'D', 133: 'D', 134: 'C', 135: 'D', 136: 'D', 137: 'C', 138: 'A', 139: 'C'
};

console.log('Total questions in answer key:', Object.keys(OFFICIAL_KEY).length);

const mcqs = Object.entries(OFFICIAL_KEY).filter(([_, v]) => typeof v === 'string');
const nums = Object.entries(OFFICIAL_KEY).filter(([_, v]) => typeof v === 'number');

console.log('MCQs count:', mcqs.length);
console.log('Numericals count:', nums.length);
console.log('Numericals list:', nums.map(([k, v]) => `Q${k}=${v}`).join(', '));

fs.writeFileSync(path.resolve(__dirname, 'com_official_key.json'), JSON.stringify(OFFICIAL_KEY, null, 2));
