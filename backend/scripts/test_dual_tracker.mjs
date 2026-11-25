import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Helper for OCR fuzzy question number match
function matchQNum(str, q) {
  // Direct match: "q." or "q)" or "Qq."
  const r1 = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*`, 'i');
  if (r1.test(str)) return true;

  // Common OCR substitutions for specific numbers
  const substitutions = {
    6: /(?:^|\n)\s*BL\s*[\.\:\)]/i,
    8: /(?:^|\n)\s*8B\s*[\.\:\)]/i,
    10: /(?:^|\n)\s*0\s*[\.\:\)]\s*The negate/i,
    12: /(?:^|\n)\s*"2\s*[\.\:\)]/i,
    13: /(?:^|\n)\s*BB\s*[\.\:\)]/i,
    14: /(?:^|\n)\s*HM\s*[\.\:\)]/i,
    18: /(?:^|\n)\s*18\s*[\.\:\)]\s*The total/i,
    30: /(?:^|\n)\s*30\s*[\.\:\)]/i,
    31: /(?:^|\n)\s*31\s*[\.\:\)]/i,
    37: /(?:^|\n)\s*37\s*[\.\:\)]/i,
    38: /(?:^|\n)\s*38\s*[\.\:\)]/i,
    44: /(?:^|\n)\s*4\s*[\.\:\)]\s*Thin/i,
    45: /(?:^|\n)\s*AB\s*[\.\:\)]\s*Thre/i,
    47: /(?:^|\n)\s*AB\s*[\.\:\)]\s*sg/i,
    48: /(?:^|\n)\s*SB\s*[\.\:\)]/i,
    50: /(?:^|\n)\s*S0\s*[\.\:\)]/i,
    51: /(?:^|\n)\s*ST\s*[\.\:\)]/i,
    52: /(?:^|\n)\s*52\s*[\.\:\)]/i,
    57: /(?:^|\n)\s*BT\s*[\.\:\)]/i,
    63: /(?:^|\n)\s*B3\s*[\.\:\)]/i,
    64: /(?:^|\n)\s*B4\s*[\.\:\)]/i,
    66: /(?:^|\n)\s*BE\s*[\.\:\)]/i,
    71: /(?:^|\n)\s*TL\s*[\.\:\)]/i,
    76: /(?:^|\n)\s*FE\s*[\.\:\)]/i,
    79: /(?:^|\n)\s*TB\s*[\.\:\)]/i,
    80: /(?:^|\n)\s*BO\s*[\.\:\)]/i,
    157: /(?:^|\n)\s*57\s*[\.\:\)]\s*Four/i,
    158: /(?:^|\n)\s*0\s*[\.\:\)]\s*The vahae/i,
    159: /(?:^|\n)\s*155\s*[\.\:\)]\s*an electrical/i,
    160: /(?:^|\n)\s*180\s*[\.\:\)]\s*1 gavarrmater/i,
    407: /(?:^|\n)\s*407\s*[\.\:\)]/i,
    408: /(?:^|\n)\s*ADB\s*[\.\:\)]/i
  };

  if (substitutions[q] && substitutions[q].test(str)) {
    return true;
  }

  return false;
}

// Track sequential page for each question
const pageMap = {};
let curPage = 1;

for (let q = 1; q <= 408; q++) {
  let foundPage = null;
  // Search window from curPage up to curPage + 4
  for (let p = curPage; p <= Math.min(211, curPage + 4); p++) {
    const text = cache[p] || '';
    if (matchQNum(text, q)) {
      foundPage = p;
      break;
    }
  }

  if (foundPage) {
    pageMap[q] = foundPage;
    curPage = foundPage;
  } else {
    // If not matched, estimate by advancing smoothly
    pageMap[q] = curPage;
  }
}

console.log('Sample matched pages:');
[1, 10, 20, 50, 75, 100, 150, 200, 250, 300, 350, 400, 408].forEach(q => {
  console.log(`Q${q} -> Page ${pageMap[q]}`);
});
