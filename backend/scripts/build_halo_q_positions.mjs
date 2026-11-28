import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_lines_cache.json'), 'utf8'));

// Exact known start pages / anomalies for Haloalkanes & Haloarenes
const KNOWN_ANOMALIES = {
  1: { page: 1, lineIdx: 8 },
  11: { page: 3, lineIdx: 12 }, // Page 3 has Q9, Q10, Q11
  15: { page: 5, lineIdx: 0 },
  25: { page: 9, lineIdx: 8 },
  28: { page: 11, lineIdx: 0 }, // "#8 CH,-CH=CH,"
  30: { page: 12, lineIdx: 17 }, // Page 12 has Q29, Q30
  33: { page: 13, lineIdx: 10 },
  34: { page: 14, lineIdx: 0 },
  44: { page: 19, lineIdx: 0 }, // "“w 2- chloro - 2 - methylpentane"
  45: { page: 20, lineIdx: 0 },
  46: { page: 21, lineIdx: 0 },
  49: { page: 23, lineIdx: 0 },
  51: { page: 24, lineIdx: 7 }, // Page 24 has Q50 at line 0, Q51 at line 7
  54: { page: 26, lineIdx: 0 },
  55: { page: 27, lineIdx: 0 },
  56: { page: 28, lineIdx: 0 },
  62: { page: 35, lineIdx: 0 },
  65: { page: 38, lineIdx: 0 },
  67: { page: 40, lineIdx: 0 },
  69: { page: 42, lineIdx: 0 },
  72: { page: 45, lineIdx: 0 }, // "2; Increasing rate of Sx1 reaction"
  77: { page: 51, lineIdx: 0 }, // "7: The decreasing order"
  84: { page: 55, lineIdx: 0 },
  85: { page: 56, lineIdx: 0 },
  88: { page: 59, lineIdx: 0 },
  94: { page: 65, lineIdx: 0 },
  97: { page: 68, lineIdx: 0 },
  103: { page: 73, lineIdx: 0 },
  107: { page: 77, lineIdx: 0 },
  109: { page: 79, lineIdx: 0 },
  110: { page: 80, lineIdx: 0 }, // "10."
  111: { page: 81, lineIdx: 0 }, // "1M. Most stable product"
  112: { page: 82, lineIdx: 0 }, // "M2. Given below"
  113: { page: 83, lineIdx: 0 }, // "13. Total number of isomers"
  114: { page: 84, lineIdx: 0 }, // "14 The structure of A"
  115: { page: 85, lineIdx: 0 },
  116: { page: 86, lineIdx: 0 },
  117: { page: 87, lineIdx: 0 },
  118: { page: 88, lineIdx: 0 },
  119: { page: 89, lineIdx: 0 },
  120: { page: 90, lineIdx: 0 },
  122: { page: 91, lineIdx: 21 },
  126: { page: 96, lineIdx: 0 },
  127: { page: 97, lineIdx: 0 },
  129: { page: 99, lineIdx: 0 },
  133: { page: 104, lineIdx: 0 },
  134: { page: 105, lineIdx: 0 },
  135: { page: 106, lineIdx: 0 },
  139: { page: 108, lineIdx: 0 },
  142: { page: 110, lineIdx: 0 },
  146: { page: 113, lineIdx: 0 }, // "18. Identify A and B"
  148: { page: 115, lineIdx: 0 },
  151: { page: 117, lineIdx: 0 },
  152: { page: 117, lineIdx: 5 }, // Page 117 has Q151 and Q152
  153: { page: 118, lineIdx: 0 }, // "158, The major products"
  155: { page: 119, lineIdx: 0 }, // "185. CHj OCHj"
  163: { page: 124, lineIdx: 0 },
  165: { page: 126, lineIdx: 0 },
  166: { page: 127, lineIdx: 0 },
  167: { page: 128, lineIdx: 0 },
  168: { page: 129, lineIdx: 0 }, // "168; The products A and B"
  171: { page: 132, lineIdx: 0 },
  173: { page: 134, lineIdx: 0 },
  176: { page: 137, lineIdx: 0 },
  180: { page: 142, lineIdx: 0 }, // "180; The dibromo compound"
  191: { page: 151, lineIdx: 0 }  // "91. RM gI when treated"
};

const qPositions = {};

for (let q = 1; q <= 193; q++) {
  if (KNOWN_ANOMALIES[q]) {
    const anom = KNOWN_ANOMALIES[q];
    qPositions[q] = {
      qNum: q,
      page: anom.page,
      lineIdx: anom.lineIdx
    };
    continue;
  }

  // Otherwise, scan all pages to find where question starts
  let found = null;
  for (let p = 1; p <= 153; p++) {
    const lines = linesCache[p]?.lines || [];
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.left > 200) continue;
      if (/marks.*wrong|ANSWER\s*:/i.test(l.text)) continue;

      const m = l.text.trim().match(/^(\d{1,3})[\.\s\:\-\;\)]+(.*)$/);
      if (m && parseInt(m[1]) === q) {
        found = { qNum: q, page: p, lineIdx: i };
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    qPositions[q] = found;
  } else {
    console.warn(`Could not find question start for Q${q}`);
  }
}

console.log(`Resolved positions for ${Object.keys(qPositions).length} / 193 questions.`);
fs.writeFileSync(path.join(__dirname, 'halo_q_positions.json'), JSON.stringify(qPositions, null, 2));
