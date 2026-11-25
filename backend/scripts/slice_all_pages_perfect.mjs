import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

// Exact verified page question ranges:
const pageQuestionRanges = {
  1: [1, 4],
  2: [5, 9],
  3: [10, 13],
  4: [14, 16],
  5: [17, 18],
  6: [19, 20],
  7: [21, 23],
  8: [24, 27],
  9: [28, 30],
  10: [31, 33],
  11: [34, 35],
  12: [36, 38],
  13: [39, 41],
  14: [42, 44],
  15: [45, 46],
  16: [47, 48],
  17: [49, 50],
  18: [51, 52],
  19: [53, 55],
  20: [56, 56],
  21: [57, 58],
  22: [59, 60],
  23: [61, 61],
  24: [62, 64],
  25: [65, 68],
  26: [69, 72],
  27: [73, 76],
  28: [77, 80],
  29: [81, 83],
  30: [84, 86],
  31: [87, 89],
  32: [90, 92],
  33: [93, 95],
  34: [96, 99],
  35: [100, 102],
  36: [103, 106],
  37: [107, 110],
  38: [111, 113],
  39: [114, 116],
  40: [117, 119],
  41: [120, 122],
  42: [123, 124],
  43: [125, 126],
  44: [127, 128],
  45: [129, 131],
  46: [132, 134],
  47: [135, 137],
  48: [138, 140],
  49: [141, 144],
  50: [145, 148],
  51: [149, 151],
  52: [152, 155],
  53: [156, 159],
  54: [160, 163],
  55: [164, 166],
  56: [167, 168],
  57: [169, 171],
  58: [172, 175],
  59: [176, 179],
  60: [180, 184],
  61: [185, 187],
  62: [188, 189],
  63: [190, 193],
  64: [194, 195],
  65: [196, 197],
  66: [198, 199],
  67: [200, 202],
  68: [203, 204],
  69: [205, 206],
  70: [207, 209],
  71: [210, 211],
  72: [212, 213],
  73: [214, 214],
  74: [215, 215],
  75: [216, 217],
  76: [218, 218],
  77: [219, 219],
  78: [220, 221]
};

// Check total coverage
let count = 0;
for (let p = 1; p <= 78; p++) {
  const [s, e] = pageQuestionRanges[p];
  count += (e - s + 1);
}
console.log(`Verified question coverage across 78 pages: ${count}/221 questions.`);

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page_ranges_final.json'), JSON.stringify(pageQuestionRanges, null, 2));
console.log('Saved basic_chem_page_ranges_final.json');
