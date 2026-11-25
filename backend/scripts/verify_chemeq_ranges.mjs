import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageQuestionRanges = {
  1: [1, 5],
  2: [6, 10],
  3: [11, 13],
  4: [14, 16],
  5: [17, 19],
  6: [20, 21],
  7: [22, 24],
  8: [25, 27],
  9: [28, 30],
  10: [31, 31],
  11: [32, 33],
  12: [34, 36],
  13: [37, 40],
  14: [41, 42],
  15: [43, 44],
  16: [45, 45],
  17: [46, 47],
  18: [48, 49],
  19: [50, 51],
  20: [52, 55],
  21: [56, 57],
  22: [58, 59],
  23: [60, 61],
  24: [62, 63],
  25: [64, 66],
  26: [67, 69],
  27: [70, 73],
  28: [74, 76],
  29: [77, 78],
  30: [79, 81],
  31: [82, 83],
  32: [84, 85],
  33: [86, 87],
  34: [88, 89],
  35: [90, 91],
  36: [92, 93],
  37: [94, 97],
  38: [98, 99],
  39: [100, 102],
  40: [103, 106],
  41: [107, 109],
  42: [110, 111],
  43: [112, 113],
  44: [114, 116],
  45: [117, 118],
  46: [119, 120],
  47: [121, 122],
  48: [123, 124],
  49: [125, 125],
  50: [126, 126],
  51: [127, 127],
  52: [128, 128],
  53: [129, 129],
  54: [130, 130],
  55: [131, 131],
  56: [132, 132]
};

const qPageMap = {};
let count = 0;
for (let p = 1; p <= 56; p++) {
  const [start, end] = pageQuestionRanges[p];
  for (let q = start; q <= end; q++) {
    qPageMap[q] = p;
    count++;
  }
}

console.log(`Total mapped questions: ${count}`);
fs.writeFileSync(path.resolve(__dirname, 'chemeq_page_map.json'), JSON.stringify(qPageMap, null, 2));
console.log('Saved chemeq_page_map.json');
