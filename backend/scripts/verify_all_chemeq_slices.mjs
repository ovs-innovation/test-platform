import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_ocr_cache.json'), 'utf8'));

// Exact page mapping verified from page inspection
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

// Check question anchors on each page
const detectedPositions = {};

for (let p = 1; p <= 56; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const [startQ, endQ] = pageQuestionRanges[p];

  for (let q = startQ; q <= endQ; q++) {
    let idx = -1;
    if (q === 5) idx = pageText.search(/(?:^|\n)\s*5\s+Consider/i);
    else if (q === 8) idx = pageText.search(/(?:^|\n)\s*8\s*[:\.]\s*For the reaction/i);
    else if (q === 9) idx = pageText.search(/(?:[©9]\s*[:\.]\s*What is the equilibrium expression|What is the equilibrium expression for the reaction)/i);
    else if (q === 11) idx = pageText.search(/(?:^|\n)\s*(?:11[\.:\s]|For the reaction\s+A\(g\)\s*\+\s*2B\(g\))/i);
    else if (q === 12) idx = pageText.search(/(?:^|\n)\s*(?:12[\.:\s]|Standard entropy of)/i);
    else if (q === 16) idx = pageText.search(/(?:^|\n)\s*(?:16[\.:\s]|For the following three)/i);
    else if (q === 17) idx = pageText.search(/(?:^|\n)\s*(?:17[\.:\s]|The equilibrium constants)/i);
    else if (q === 18) idx = pageText.search(/(?:^|\n)\s*(?:18[\.:\s]|A vessel at 1000 K)/i);
    else if (q === 19) idx = pageText.search(/(?:^|\n)\s*(?:19[\.:\s]|The equilibrium constant.*for the reaction N2)/i);
    else if (q === 21) idx = pageText.search(/(?:^|\n)\s*(?:21[\.:\s]|8 mol of AB)/i);
    else if (q === 24) idx = pageText.search(/(?:^|\n)\s*(?:24[\.:\s]|In reaction A \+ 2 B)/i);
    else if (q === 32) idx = pageText.search(/(?:^|\n)\s*(?:32[\.:\s]|standard Gibbs energy change)/i);
    else if (q === 52) idx = pageText.search(/(?:^|\n)\s*(?:52[\.:\s]|In the figure shown below)/i);
    else if (q === 53) idx = pageText.search(/(?:^|\n)\s*(?:53[\.:\s]|equilibrium constant for A)/i);
    else if (q === 54) idx = pageText.search(/(?:^|\n)\s*(?:54[\.:\s]|Consider the following reaction)/i);
    else if (q === 55) idx = pageText.search(/(?:^|\n)\s*(?:55[\.:\s]|reaction X \+ Y = 2Z)/i);
    else if (q === 60) idx = pageText.search(/(?:^|\n)\s*(?:60[\.:\s]|stepwise formation of)/i);
    else if (q === 63) idx = pageText.search(/(?:^|\n)\s*(?:63[\.:\s]|homogeneous ideal gaseous reaction)/i);
    else if (q === 65) idx = pageText.search(/(?:^|\n)\s*(?:65[\.:\s]|reaction N2O4.*2NO2)/i);
    else if (q === 68) idx = pageText.search(/(?:^|\n)\s*(?:68[\.:\s]|Value of Kp for the equilibrium)/i);
    else if (q === 71) idx = pageText.search(/(?:^|\n)\s*(?:71[\.:\s]|equilibrium constant for the reaction A\(s\))/i);
    else if (q === 81) idx = pageText.search(/(?:^|\n)\s*(?:81[\.:\s]|of HI undergoes decomposition)/i);
    else if (q === 89) idx = pageText.search(/(?:^|\n)\s*(?:89[\.:\s]|For reaction.*SO2.*O2)/i);
    else if (q === 108) idx = pageText.search(/(?:^|\n)\s*(?:108[\.:\s]|reaction X2Y.*X2)/i);
    else if (q === 110) idx = pageText.search(/(?:^|\n)\s*(?:110[\.:\s]|For the reaction.*H2.*I2)/i);
    else if (q === 111) idx = pageText.search(/(?:^|\n)\s*(?:111[\.:\s]|temperature T, compound AB2)/i);
    else if (q === 113) idx = pageText.search(/(?:^|\n)\s*(?:113[\.:\s]|equilibrium.*CO.*2H2)/i);
    else if (q === 115) idx = pageText.search(/(?:^|\n)\s*(?:115[\.:\s]|PCl5.*addition of xenon)/i);
    else if (q === 116) idx = pageText.search(/(?:^|\n)\s*(?:116[\.:\s]|catalyst cannot alter)/i);
    else if (q === 118) idx = pageText.search(/(?:^|\n)\s*(?:118[\.:\s]|reaction, N2O4.*graph is plotted)/i);
    else if (q === 120) idx = pageText.search(/(?:^|\n)\s*(?:120[\.:\s]|gas phase equilibrium reaction)/i);
    else if (q === 122) idx = pageText.search(/(?:^|\n)\s*(?:122[\.:\s]|X2\(g\)\s*\+\s*Y2\(g\))/i);
    else if (q === 124) idx = pageText.search(/(?:^|\n)\s*(?:124[\.:\s]|Observe the following equilibrium)/i);
    else {
      // General regex
      const re = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]`, 'i');
      const m = pageText.match(re);
      if (m) idx = m.index;
    }

    if (idx === -1 && startQ !== endQ) {
      console.log(`Page ${p}, Q${q}: NOT FOUND in page text!`);
    } else {
      detectedPositions[q] = { page: p, idx };
    }
  }
}

console.log('Total questions found:', Object.keys(detectedPositions).length);
