import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Helper to check if a line is a question header
function matchQuestionHeader(q, line) {
  const l = line.trim();
  if (!l) return false;
  if (l.includes('AcadXL') || l.includes('PREVIOUS') || l.includes('Current Electricity') || l.includes('Questions: 408')) return false;

  // Direct number
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,2})?\\b${q}[\\.\\:\\;\\,\\-\\)\\~*#]`, 'i');
  if (directReg.test(l)) return true;

  // Standalone number
  if (new RegExp(`^${q}$`).test(l)) return true;

  // Misread mappings for specific Qs
  const special = {
    1: /^By\s+Increasing/i,
    4: /^A\.\s+4\s+wre/i,
    6: /^BL\.\s+The\s+mass/i,
    8: /^8B\.\s+5\s+stp/i,
    9: /^B43\s+val/i,
    10: /^0\.\s+The\s+negate/i,
    11: /^TA\s+220\s+vl/i,
    12: /^"2\.\s+n\s+ammeter/i,
    13: /^BB\.\s+The\s+thermo/i,
    14: /^HM\.\s+Trig\s+lengih/i,
    16: /^6\.\s+An\s+aleciric/i,
    17: /^"7%\s+The\s+resistance/i,
    18: /^=\.\s*The\s+total\s+current/i,
    19: /^18:\s+The\s+electrochemical/i,
    25: /^28\.\s+A\s+heater\s+coll/i,
    28: /^2B\.\s+\|\s+petantioeenar/i,
    31: /^Fa\s+material/i,
    32: /^2\.\s*The\s+currem/i,
    36: /^20\.\s+The\s+resistance\s+of\s+a\s+wire/i,
    38: /^30\.\s+paragrapin/i,
    39: /^3\s+46\s+V\s+battery/i,
    50: /^S01\s+ae\s+periment/i,
    51: /^ST\s+The\s+supply/i,
    53: /^53:\s+latter/i,
    54: /^Be\s+i\s+a\s+tro\s+bridge/i,
    55: /^LO\s+shunt/i,
    56: /^Sa\s+te\s+aurea/i,
    57: /^BT\.\s+Te\s+find/i,
    58: /^SB\s+Which/i,
    60: /^BO\.\s+ir\s+a\s+large/i,
    61: /^B14\s+0\.c\s+main/i,
    62: /^BL\s+mye\s+chest/i,
    63: /^B31\s+the\s+circuit/i,
    64: /^B4\.\s+The\s+circu/i,
    65: /^5:\s+in\s+the\s+expenment\s+of\s+cabration/i,
    66: /^BE\./i,
    67: /^87\.\s+\\inan\s+51/i,
    68: /^BY\s+p\s+20/i,
    71: /^TL\s+nthe\s+electric/i
  };

  if (special[q] && special[q].test(l)) return true;

  return false;
}

const qLocations = [];
let curP = 1;
let curL = 0;

for (let q = 1; q <= 408; q++) {
  let found = false;

  // Search forward through pages starting at curP
  for (let p = curP; p <= Math.min(211, curP + 4); p++) {
    const lines = (cache[String(p)] || '').split('\n');
    const startLine = (p === curP) ? curL : 0;

    for (let l = startLine; l < lines.length; l++) {
      if (matchQuestionHeader(q, lines[l])) {
        qLocations.push({ q, p, l, text: lines[l].trim() });
        curP = p;
        curL = l + 1;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    // If not found, advance curL or curP gracefully
    qLocations.push({ q, p: curP, l: curL, text: 'AUTO_ADVANCE', notFound: true });
    // Advance slightly
    const linesOnCurP = (cache[String(curP)] || '').split('\n').length;
    curL += 10;
    if (curL >= linesOnCurP) {
      curP = Math.min(211, curP + 1);
      curL = 0;
    }
  }
}

const missing = qLocations.filter(x => x.notFound);
console.log(`Matched ${qLocations.length - missing.length} / 408 questions.`);
console.log(`Auto-advanced count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Sample auto-advanced (first 20):', missing.slice(0, 20).map(m => `Q${m.q} (P${m.p})`));
}
