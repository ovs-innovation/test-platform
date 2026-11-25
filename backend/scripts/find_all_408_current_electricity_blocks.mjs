import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Flatten all lines across pages 1..211
const allLines = [];
for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}
console.log('Total lines across pages 1..211:', allLines.length);

const qBlocks = [];
let curLineIdx = 0;

for (let q = 1; q <= 408; q++) {
  // Regex to match question number
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');

  let foundStart = -1;

  // Search forward from curLineIdx
  // Look up to 100 lines forward
  for (let i = curLineIdx; i < Math.min(allLines.length, curLineIdx + 120); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('408 Questions') || l.includes('Current Electricity —')) continue;
    if (l.includes('marks') && (l.includes('wrong') || l.includes('negative') || l.includes('Shift') || l.includes('Offline'))) continue;
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l)) continue;

    if (directReg.test(l)) {
      foundStart = i;
      break;
    }
  }

  // If not found by direct regex, search for standalone number on its own line
  if (foundStart === -1) {
    const standaloneReg = new RegExp(`^${q}$`);
    for (let i = curLineIdx; i < Math.min(allLines.length, curLineIdx + 120); i++) {
      const l = allLines[i].text;
      if (standaloneReg.test(l) && i + 1 < allLines.length && allLines[i + 1].text.length > 5) {
        foundStart = i;
        break;
      }
    }
  }

  // Fallback: estimate from expected page position if still not found
  if (foundStart === -1) {
    // If not found, use curLineIdx
    foundStart = curLineIdx;
  }

  qBlocks.push({
    qNum: q,
    startGlobalIdx: foundStart,
    page: allLines[foundStart]?.p || 1
  });

  curLineIdx = foundStart + 1;
}

// Assign endGlobalIdx for each block
for (let i = 0; i < qBlocks.length; i++) {
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startGlobalIdx : allLines.length;
  qBlocks[i].endGlobalIdx = Math.max(qBlocks[i].startGlobalIdx + 1, nextStart);
}

console.log(`Segmented ${qBlocks.length} question blocks.`);

// Save preliminary blocks
const OUT = path.resolve(__dirname, 'current_electricity_q_blocks.json');
fs.writeFileSync(OUT, JSON.stringify(qBlocks, null, 2));
console.log('Saved to', OUT);
