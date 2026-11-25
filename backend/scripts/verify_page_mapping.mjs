import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));

// Verify our page distribution
const knownPageRanges = [
  { p: 1, qs: [1, 2, 3, 4] },
  { p: 2, qs: [5, 6, 7] },
  { p: 3, qs: [8, 9, 10] },
  { p: 4, qs: [11, 12] },
  { p: 5, qs: [13, 14, 15, 16] },
  { p: 6, qs: [17, 18, 19] },
  { p: 7, qs: [20, 21, 22] },
  { p: 8, qs: [23, 24, 25] },
  { p: 9, qs: [26, 27] },
  { p: 10, qs: [28, 29] },
  { p: 11, qs: [30] },
  { p: 12, qs: [31, 32] },
  { p: 13, qs: [33, 34, 35] },
  { p: 14, qs: [36, 37] },
  { p: 15, qs: [38] },
  { p: 16, qs: [39, 40] },
  { p: 17, qs: [41, 42] },
  { p: 18, qs: [43, 44] },
  { p: 19, qs: [45, 46] },
  { p: 20, qs: [47] },
  { p: 21, qs: [48] },
  { p: 22, qs: [49, 50] },
  { p: 23, qs: [51] },
  { p: 24, qs: [52, 53] },
  { p: 25, qs: [54] },
  { p: 26, qs: [55] },
  { p: 27, qs: [56, 57] },
  { p: 28, qs: [58, 59] },
  { p: 29, qs: [60, 61] },
  { p: 30, qs: [62, 63] },
  { p: 31, qs: [64, 65] },
  { p: 32, qs: [66, 67] },
  { p: 33, qs: [68, 69] },
  { p: 34, qs: [70, 71] },
  { p: 35, qs: [72, 73] },
  { p: 36, qs: [74, 75, 76] },
  { p: 37, qs: [77, 78] },
  { p: 38, qs: [79] },
  { p: 39, qs: [80] },
  { p: 40, qs: [81] },
  { p: 41, qs: [82] },
  { p: 42, qs: [83] },
  { p: 43, qs: [84, 85] },
  { p: 44, qs: [86, 87] },
  { p: 45, qs: [88, 89] },
  { p: 46, qs: [90, 91] },
  { p: 47, qs: [92, 93] },
  { p: 48, qs: [94, 95] },
  { p: 49, qs: [96, 97] },
  { p: 50, qs: [98, 99] },
  { p: 51, qs: [100, 101] },
  { p: 52, qs: [102, 103] },
  { p: 53, qs: [104, 105, 106] },
  { p: 54, qs: [107, 108, 109] },
  { p: 55, qs: [110, 111] },
  { p: 56, qs: [112, 113] },
  { p: 57, qs: [114, 115] },
  { p: 58, qs: [116, 117, 118] },
  { p: 59, qs: [119, 120] },
  { p: 60, qs: [121, 122] },
  { p: 61, qs: [123, 124] },
  { p: 62, qs: [125] },
  { p: 63, qs: [126] },
  { p: 64, qs: [127] },
  { p: 65, qs: [128] },
  { p: 66, qs: [129, 130] },
  { p: 67, qs: [131, 132] },
  { p: 68, qs: [133, 134] },
  { p: 69, qs: [135] },
  { p: 70, qs: [136, 137] },
  { p: 71, qs: [138, 139] },
  { p: 72, qs: [140, 141] },
  { p: 73, qs: [142, 143] },
  { p: 74, qs: [144] },
  { p: 75, qs: [145, 146] },
  { p: 76, qs: [147, 148] },
  { p: 77, qs: [149] },
  { p: 78, qs: [150, 151] },
  { p: 79, qs: [152, 153] },
  { p: 80, qs: [154, 155] },
  { p: 81, qs: [156, 157] },
  { p: 82, qs: [158, 159] },
  { p: 83, qs: [160, 161] },
  { p: 84, qs: [162, 163] },
  { p: 85, qs: [164, 165] },
  { p: 86, qs: [166] },
  { p: 87, qs: [167] },
  { p: 88, qs: [168, 169] },
  { p: 89, qs: [170, 171] },
  { p: 90, qs: [172, 173] },
  { p: 91, qs: [174, 175] },
  { p: 92, qs: [176] },
  { p: 93, qs: [177, 178, 179] },
  { p: 94, qs: [180, 181] },
  { p: 95, qs: [182, 183] },
  { p: 96, qs: [184, 185] },
  { p: 97, qs: [186, 187] },
  { p: 98, qs: [188, 189] },
  { p: 99, qs: [190, 191, 192] },
  { p: 100, qs: [193, 194] },
  { p: 101, qs: [195, 196] },
  { p: 102, qs: [197] },
  { p: 103, qs: [198] },
  { p: 104, qs: [199, 200] },
  { p: 105, qs: [201, 202, 203] },
  { p: 106, qs: [204, 205] },
  { p: 107, qs: [206, 207] },
  { p: 108, qs: [208] },
  { p: 109, qs: [209, 210] },
  { p: 110, qs: [211, 212] },
  { p: 111, qs: [213] },
  { p: 112, qs: [214, 215] },
  { p: 113, qs: [216] },
  { p: 114, qs: [217, 218] },
  { p: 115, qs: [219, 220] },
  { p: 116, qs: [221, 222] },
  { p: 117, qs: [223, 224] },
  { p: 118, qs: [225, 226] },
  { p: 119, qs: [227] },
  { p: 120, qs: [228, 229] },
  { p: 121, qs: [230] },
  { p: 122, qs: [231] },
  { p: 123, qs: [232] },
  { p: 124, qs: [233] },
  { p: 125, qs: [234] },
  { p: 126, qs: [235, 236] },
  { p: 127, qs: [237] },
  { p: 128, qs: [238] },
  { p: 129, qs: [239] },
  { p: 130, qs: [240] },
  { p: 131, qs: [241] },
];

let allQs = [];
for (const r of knownPageRanges) {
  allQs.push(...r.qs);
}

console.log(`Total mapped questions: ${allQs.length}`);
if (allQs.length !== 241) {
  throw new Error(`Expected 241, got ${allQs.length}`);
}

// Check sequential
for (let i = 0; i < 241; i++) {
  if (allQs[i] !== i + 1) {
    throw new Error(`Mismatch at index ${i}: expected ${i+1}, got ${allQs[i]}`);
  }
}
console.log('Strict sequential 1..241 mapping verified across all 131 pages!');

fs.writeFileSync(path.resolve(__dirname, 'hydro_page_ranges.json'), JSON.stringify(knownPageRanges, null, 2));
