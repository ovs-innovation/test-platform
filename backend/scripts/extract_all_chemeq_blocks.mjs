import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_ocr_cache.json'), 'utf8'));

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

const rawBlocks = {};

for (let p = 1; p <= 56; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const [startQ, endQ] = pageQuestionRanges[p];

  if (startQ === endQ) {
    rawBlocks[String(startQ)] = {
      page: p,
      text: pageText.trim()
    };
    continue;
  }

  // Find start index of each question on this page
  const qIndices = [];
  for (let q = startQ; q <= endQ; q++) {
    // Regex for question start on this page
    // Look for lines starting with question number
    const regexes = [
      new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${q}\\s+[A-Z]`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${q}[\\.:\\-\\)]`, 'i')
    ];

    let foundIdx = -1;
    for (const re of regexes) {
      const match = pageText.match(re);
      if (match && match.index !== undefined) {
        foundIdx = match.index;
        break;
      }
    }

    if (foundIdx === -1) {
      // Fallback searches
      if (q === 11) foundIdx = pageText.search(/For the reaction/i);
      else if (q === 16) foundIdx = pageText.search(/For the following three/i);
      else if (q === 17) foundIdx = pageText.search(/The equilibrium constants/i);
      else if (q === 18) foundIdx = pageText.search(/A vessel at 1000 K/i);
      else if (q === 19) foundIdx = pageText.search(/The equilibrium constant.*for the reaction N2/i);
      else if (q === 21) foundIdx = pageText.search(/8 mol of AB/i);
      else if (q === 24) foundIdx = pageText.search(/In reaction A \+ 2 B/i);
      else if (q === 32) foundIdx = pageText.search(/standard Gibbs energy change/i);
      else if (q === 52) foundIdx = pageText.search(/In the figure shown below/i);
      else if (q === 53) foundIdx = pageText.search(/equilibrium constant for A/i);
      else if (q === 54) foundIdx = pageText.search(/Consider the following reaction/i);
      else if (q === 55) foundIdx = pageText.search(/reaction X \+ Y = 2Z/i);
      else if (q === 60) foundIdx = pageText.search(/stepwise formation of/i);
      else if (q === 63) foundIdx = pageText.search(/homogeneous ideal gaseous reaction/i);
      else if (q === 65) foundIdx = pageText.search(/reaction N2O4.*2NO2/i);
      else if (q === 68) foundIdx = pageText.search(/Value of Kp for the equilibrium/i);
      else if (q === 71) foundIdx = pageText.search(/equilibrium constant for the reaction A\(s\)/i);
      else if (q === 81) foundIdx = pageText.search(/of HI undergoes decomposition/i);
      else if (q === 89) foundIdx = pageText.search(/For reaction.*SO2.*O2/i);
      else if (q === 108) foundIdx = pageText.search(/reaction X2Y.*X2/i);
      else if (q === 110) foundIdx = pageText.search(/For the reaction.*H2.*I2/i);
      else if (q === 111) foundIdx = pageText.search(/temperature T, compound AB2/i);
      else if (q === 113) foundIdx = pageText.search(/equilibrium.*CO.*2H2/i);
      else if (q === 115) foundIdx = pageText.search(/PCl5.*addition of xenon/i);
      else if (q === 116) foundIdx = pageText.search(/catalyst cannot alter/i);
      else if (q === 118) foundIdx = pageText.search(/reaction, N2O4.*graph is plotted/i);
      else if (q === 120) foundIdx = pageText.search(/gas phase equilibrium reaction/i);
      else if (q === 122) foundIdx = pageText.search(/X2\(g\) \+ Y2\(g\)/i);
      else if (q === 124) foundIdx = pageText.search(/Observe the following equilibrium/i);
    }

    qIndices.push({ q, idx: foundIdx });
  }

  // Sort by index to slice cleanly
  for (let i = 0; i < qIndices.length; i++) {
    const item = qIndices[i];
    const qNum = item.q;
    const startPos = item.idx !== -1 ? item.idx : 0;
    const nextItem = qIndices[i + 1];
    const endPos = (nextItem && nextItem.idx !== -1) ? nextItem.idx : pageText.length;

    const blockText = pageText.slice(startPos, endPos).trim();
    rawBlocks[String(qNum)] = {
      page: p,
      text: blockText
    };
  }
}

console.log(`Sliced ${Object.keys(rawBlocks).length}/132 raw blocks.`);
const missing = [];
for (let q = 1; q <= 132; q++) {
  if (!rawBlocks[String(q)] || !rawBlocks[String(q)].text) missing.push(q);
}
console.log('Missing blocks:', missing);

fs.writeFileSync(path.resolve(__dirname, 'chemeq_raw_blocks.json'), JSON.stringify(rawBlocks, null, 2));
console.log('Saved chemeq_raw_blocks.json');
