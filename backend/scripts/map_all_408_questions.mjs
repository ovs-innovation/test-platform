import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Flatten all lines across pages 1..211 with line metadata
const allLines = [];
for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}
console.log('Total lines across pages 1..211:', allLines.length);

// Custom header patterns for questions that had OCR misread on the header number
const misreadMap = {
  1: /^By\s+Increasing/i,
  2: /^2$/i,
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

// Locate question start positions
const qPositions = [];
let curLineIdx = 0;

for (let q = 1; q <= 408; q++) {
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');
  let foundIdx = -1;

  // Search forward up to 80 lines
  const searchLimit = Math.min(allLines.length, curLineIdx + 80);
  for (let i = curLineIdx; i < searchLimit; i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('408 Questions') || l.includes('Current Electricity —')) continue;
    if (l.includes('marks') && (l.includes('wrong') || l.includes('negative') || l.includes('Shift') || l.includes('Offline'))) continue;
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l)) continue;

    if (directReg.test(l) || (misreadMap[q] && misreadMap[q].test(l))) {
      foundIdx = i;
      break;
    }
  }

  // If not found, search with looser boundary on expected page
  if (foundIdx === -1) {
    foundIdx = curLineIdx;
  }

  qPositions.push({
    qNum: q,
    startIdx: foundIdx,
    p: allLines[foundIdx]?.p || 1
  });

  curLineIdx = foundIdx + 1;
}

// Assign end indices
for (let i = 0; i < qPositions.length; i++) {
  const nextStart = (i + 1 < qPositions.length) ? qPositions[i + 1].startIdx : allLines.length;
  qPositions[i].endIdx = Math.max(qPositions[i].startIdx + 1, nextStart);
}

console.log(`Mapped all ${qPositions.length} questions.`);
const OUT_PATH = path.resolve(__dirname, 'current_electricity_mapped_positions.json');
fs.writeFileSync(OUT_PATH, JSON.stringify(qPositions, null, 2));
console.log('Saved to', OUT_PATH);
