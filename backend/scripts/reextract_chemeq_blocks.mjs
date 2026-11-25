import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_ocr_cache.json'), 'utf8'));

// Question definitions with anchors
const anchors = {
  1: /(?:^|\n)\s*1[\.:\s]/i,
  2: /(?:^|\n)\s*2[\.:\s]/i,
  3: /(?:^|\n)\s*3[\.:\s]/i,
  4: /(?:^|\n)\s*4[\.:\s]/i,
  5: /(?:^|\n)\s*5[\.:\s]/i,
  6: /(?:^|\n)\s*6[\.:\s]/i,
  7: /(?:^|\n)\s*7[\.:\s]/i,
  8: /(?:^|\n)\s*8[\.:\s]/i,
  9: /(?:[©9]\s*[:\.]\s*What is the equilibrium expression|What is the equilibrium expression)/i,
  10: /(?:^|\n)\s*10[\.:\s]/i,
  11: /(?:^|\n)\s*(?:11[\.:\s]|M\.\s*For the reaction\s+2NO)/i,
  12: /(?:^|\n)\s*(?:12[\.:\s]|A schematic plot of In K)/i,
  13: /(?:^|\n)\s*(?:13[\.:\s]|The exothermic formation of CIF)/i,
  14: /(?:^|\n)\s*14[\.:\s]/i,
  15: /(?:^|\n)\s*15[\.:\s]/i,
  16: /(?:^|\n)\s*(?:16[\.:\s]|6\.\s*For the following three reactions)/i,
  17: /(?:^|\n)\s*(?:17[\.:\s]|7[:\.]\s*The equilibrium constants)/i,
  18: /(?:^|\n)\s*(?:18[\.:\s]|8[\.:\s]\s*A vessel at 1000 K)/i,
  19: /(?:9\.\s*The equilibrium constant.*(?:N2\(g\)|N,\(g\))|The equilibrium constant.*N,\(g\)\s*\+\s*O,\(\s*g\))/i,
  20: /(?:^|\n)\s*20[\.:\s]/i,
  21: /(?:^|\n)\s*(?:21[\.:\s]|8 mol of AB|21\s+8 mol)/i,
  22: /(?:^|\n)\s*(?:22[\.:\s]|The value of Kp for the equilibrium reaction N2O4)/i,
  23: /(?:^|\n)\s*23[\.:\s]/i,
  24: /(?:^|\n)\s*(?:24[\.:\s]|yn reaction A \+ 2 B|In reaction A \+ 2 B)/i,
  25: /(?:^|\n)\s*25[\.:\s]/i,
  26: /(?:^|\n)\s*26[\.:\s]/i,
  27: /(?:^|\n)\s*27[\.:\s]/i,
  28: /(?:^|\n)\s*28[\.:\s]/i,
  29: /(?:^|\n)\s*29[\.:\s]/i,
  30: /(?:^|\n)\s*30[\.:\s]/i,
  31: /(?:^|\n)\s*31[\.:\s]/i,
  32: /(?:^|\n)\s*(?:32[\.:\s]|standard Gibbs energy change)/i,
  33: /(?:^|\n)\s*33[\.:\s]/i,
  34: /(?:^|\n)\s*34[\.:\s]/i,
  35: /(?:^|\n)\s*35[\.:\s]/i,
  36: /(?:^|\n)\s*36[\.:\s]/i,
  37: /(?:^|\n)\s*37[\.:\s]/i,
  38: /(?:^|\n)\s*38[\.:\s]/i,
  39: /(?:^|\n)\s*39[\.:\s]/i,
  40: /(?:^|\n)\s*40[\.:\s]/i,
  41: /(?:^|\n)\s*41[\.:\s]/i,
  42: /(?:^|\n)\s*42[\.:\s]/i,
  43: /(?:^|\n)\s*43[\.:\s]/i,
  44: /(?:^|\n)\s*44[\.:\s]/i,
  45: /(?:^|\n)\s*45[\.:\s]/i,
  46: /(?:Co\s+For the chemical reaction|For the chemical reaction\s*X\s*=\s*Y)/i,
  47: /(?:^|\n)\s*47[\.:\s]/i,
  48: /(?:^|\n)\s*48[\.:\s]/i,
  49: /(?:^|\n)\s*49[\.:\s]/i,
  50: /(?:^|\n)\s*50[\.:\s]/i,
  51: /(?:^|\n)\s*51[\.:\s]/i,
  52: /(?:^|\n)\s*(?:52[\.:\s]|In the figure shown below)/i,
  53: /(?:83[\.:\s]*if the equilibrium constant|if the equilibrium constant for A\s*=\s*B\s*\+\s*C)/i,
  54: /(?:^|\n)\s*(?:54[\.:\s]|Consider the following reaction.*2SO2)/i,
  55: /(?:reaction\s+X\s*\+\s*Y\s*=\s*2Z)/i,
  56: /(?:^|\n)\s*56[\.:\s]/i,
  57: /(?:^|\n)\s*57[\.:\s]/i,
  58: /(?:^|\n)\s*58[\.:\s]/i,
  59: /(?:^|\n)\s*59[\.:\s]/i,
  60: /(?:80[\.:\s]*The stepwise formation|The stepwise formation of)/i,
  61: /(?:^|\n)\s*61[\.:\s]/i,
  62: /(?:^|\n)\s*62[\.:\s]/i,
  63: /(?:83[\.:\s]*A homogeneous ideal gaseous reaction|A homogeneous ideal gaseous reaction)/i,
  64: /(?:84[\.:\s]*For the reaction\s*4\s*\(g\)|For the reaction\s*4\s*\(g\)\s*=\s*B\s*\(g\)\s*at\s*495K)/i,
  65: /(?:85[\.:\s]*Consider the reaction\s*N204|Consider the reaction\s*N204\(g\)\s*=\s*2NO)/i,
  66: /(?:^|\n)\s*66[\.:\s]/i,
  67: /(?:^|\n)\s*67[\.:\s]/i,
  68: /(?:^|\n)\s*(?:68[\.:\s]|Value of Kp for the equilibrium)/i,
  69: /(?:^|\n)\s*69[\.:\s]/i,
  70: /(?:^|\n)\s*70[\.:\s]/i,
  71: /(?:n\s*es.*The equilbrium constant|The equilbrium constant forthe reaction\s*A\(s\))/i,
  72: /(?:^|\n)\s*72[\.:\s]/i,
  73: /(?:^|\n)\s*73[\.:\s]/i,
  74: /(?:^|\n)\s*74[\.:\s]/i,
  75: /(?:^|\n)\s*75[\.:\s]/i,
  76: /(?:^|\n)\s*76[\.:\s]/i,
  77: /(?:^|\n)\s*77[\.:\s]/i,
  78: /(?:^|\n)\s*78[\.:\s]/i,
  79: /(?:^|\n)\s*79[\.:\s]/i,
  80: /(?:^|\n)\s*80[\.:\s]/i,
  81: /(?:^|\n)\s*(?:81[\.:\s]|of HI undergoes decomposition)/i,
  82: /(?:^|\n)\s*82[\.:\s]/i,
  83: /(?:^|\n)\s*83[\.:\s]/i,
  84: /(?:^|\n)\s*84[\.:\s]/i,
  85: /(?:^|\n)\s*85[\.:\s]/i,
  86: /(?:^|\n)\s*86[\.:\s]/i,
  87: /(?:^|\n)\s*87[\.:\s]/i,
  88: /(?:^|\n)\s*88[\.:\s]/i,
  89: /(?:Ls\s*\n\s*For reaction|For reaction:\s*50s\(g\)\s*\+\s*502\(g\))/i,
  90: /(?:^|\n)\s*90[\.:\s]/i,
  91: /(?:^|\n)\s*91[\.:\s]/i,
  92: /(?:^|\n)\s*92[\.:\s]/i,
  93: /(?:^|\n)\s*93[\.:\s]/i,
  94: /(?:^|\n)\s*94[\.:\s]/i,
  95: /(?:^|\n)\s*95[\.:\s]/i,
  96: /(?:^|\n)\s*96[\.:\s]/i,
  97: /(?:^|\n)\s*97[\.:\s]/i,
  98: /(?:^|\n)\s*98[\.:\s]/i,
  99: /(?:^|\n)\s*99[\.:\s]/i,
  100: /(?:^|\n)\s*100[\.:\s]/i,
  101: /(?:^|\n)\s*101[\.:\s]/i,
  102: /(?:^|\n)\s*102[\.:\s]/i,
  103: /(?:^|\n)\s*103[\.:\s]/i,
  104: /(?:^|\n)\s*104[\.:\s]/i,
  105: /(?:^|\n)\s*105[\.:\s]/i,
  106: /(?:^|\n)\s*106[\.:\s]/i,
  107: /(?:^|\n)\s*107[\.:\s]/i,
  108: /(?:198[\.:\s]*Consider the reaction|Consider the reaction\s*XY)/i,
  109: /(?:^|\n)\s*109[\.:\s]/i,
  110: /(?:0[\.:\s]*[£f]or the reaction,\s*Ha|For the reaction,\s*Ha\s*g\)\s*\+\s*I2)/i,
  111: /(?:[™\-\d]+[\.:\s]*At temperature T|At temperature T,\s*compound\s*ABy)/i,
  112: /(?:M2[\.:\s]*Consider the equilibrium|Consider the equilibrium\s*\n\s*CO)/i,
  113: /(?:3[\.:\s]*Consider the following equilibrium|Consider the following equilibrium,\s*CO\(g\)\s*\+\s*2Ha)/i,
  114: /(?:M4[\.:\s]*Consider the following chemical equilibrium|Consider the following chemical equilibrium of the gas)/i,
  115: /(?:^|\n)\s*(?:115[\.:\s]|M5[\.:\s]|PCl5.*addition of xenon)/i,
  116: /(?:^|\n)\s*(?:116[\.:\s]|M6[\.:\s]|catalyst cannot alter)/i,
  117: /(?:^|\n)\s*(?:117[\.:\s]|M7[\.:\s]|decomposition of H2O|decomposition of HyO)/i,
  118: /(?:^|\n)\s*(?:118[\.:\s]|"18[:\.]|reaction, N2O4.*graph is plotted)/i,
  119: /(?:^|\n)\s*(?:119[\.:\s]|M9[\.:\s]|Dissociation of a gas A)/i,
  120: /(?:^|\n)\s*(?:120[\.:\s]|gas phase equilibrium reaction)/i,
  121: /(?:^|\n)\s*121[\.:\s]/i,
  122: /(?:^|\n)\s*(?:122[\.:\s]|X2\(g\)\s*\+\s*Y2\(g\))/i,
  123: /(?:^|\n)\s*123[\.:\s]/i,
  124: /(?:^|\n)\s*(?:124[\.:\s]|Observe the following equilibrium)/i,
  125: /(?:^|\n)\s*125[\.:\s]/i,
  126: /(?:^|\n)\s*126[\.:\s]/i,
  127: /(?:^|\n)\s*127[\.:\s]/i,
  128: /(?:^|\n)\s*128[\.:\s]/i,
  129: /(?:^|\n)\s*129[\.:\s]/i,
  130: /(?:^|\n)\s*130[\.:\s]/i,
  131: /(?:^|\n)\s*131[\.:\s]/i,
  132: /(?:^|\n)\s*132[\.:\s]/i
};

// Check which page each question is on
const pageRanges = {
  1: [1, 5], 2: [6, 10], 3: [11, 13], 4: [14, 16], 5: [17, 19],
  6: [20, 21], 7: [22, 24], 8: [25, 27], 9: [28, 30], 10: [31, 31],
  11: [32, 33], 12: [34, 36], 13: [37, 40], 14: [41, 42], 15: [43, 44],
  16: [45, 45], 17: [46, 47], 18: [48, 49], 19: [50, 51], 20: [52, 55],
  21: [56, 57], 22: [58, 59], 23: [60, 61], 24: [62, 63], 25: [64, 66],
  26: [67, 69], 27: [70, 73], 28: [74, 76], 29: [77, 78], 30: [79, 81],
  31: [82, 83], 32: [84, 85], 33: [86, 87], 34: [88, 89], 35: [90, 91],
  36: [92, 93], 37: [94, 97], 38: [98, 99], 39: [100, 102], 40: [103, 106],
  41: [107, 109], 42: [110, 111], 43: [112, 113], 44: [114, 116], 45: [117, 118],
  46: [119, 120], 47: [121, 122], 48: [123, 124], 49: [125, 125], 50: [126, 126],
  51: [127, 127], 52: [128, 128], 53: [129, 129], 54: [130, 130], 55: [131, 131],
  56: [132, 132]
};

const results = {};
const failed = [];

for (let p = 1; p <= 56; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const [startQ, endQ] = pageRanges[p];

  if (startQ === endQ) {
    results[startQ] = { page: p, text: text.trim() };
    continue;
  }

  const qPositions = [];
  for (let q = startQ; q <= endQ; q++) {
    const anchor = anchors[q];
    let idx = -1;
    if (anchor) {
      idx = text.search(anchor);
    }
    if (idx === -1) {
      failed.push({ page: p, q });
    } else {
      qPositions.push({ q, idx });
    }
  }

  qPositions.sort((a, b) => a.idx - b.idx);
  for (let i = 0; i < qPositions.length; i++) {
    const item = qPositions[i];
    const nextItem = qPositions[i + 1];
    const startIdx = item.idx;
    const endIdx = nextItem ? nextItem.idx : text.length;
    results[item.q] = {
      page: p,
      text: text.slice(startIdx, endIdx).trim()
    };
  }
}

console.log('Successfully sliced questions:', Object.keys(results).length, '/ 132');
if (failed.length > 0) {
  console.log('Failed to anchor:', failed);
} else {
  console.log('ALL 132 QUESTIONS SUCCESSFULLY ANCHORED AND SLICED!');
  fs.writeFileSync(path.resolve(__dirname, 'chemeq_raw_blocks.json'), JSON.stringify(results, null, 2), 'utf8');
}
