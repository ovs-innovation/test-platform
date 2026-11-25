import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Flatten all lines across pages 1..211 with { p, lIdx, text }
const allLines = [];
for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}
console.log('Total lines across pages 1..211:', allLines.length);

const matchedHeaders = [];
let curLineIdx = 0;

for (let q = 1; q <= 408; q++) {
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');

  // Specific OCR misreads for headers
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
    19: /^18:\s+The\s+electrochemical/i
  };

  let foundIdx = -1;
  const maxLookahead = 60;

  for (let i = curLineIdx; i < Math.min(allLines.length, curLineIdx + maxLookahead); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS') || l.includes('Current Electricity') || l.includes('Maximum mark')) continue;
    if (l.includes('marks') && (l.includes('wrong') || l.includes('negative') || l.includes('Offline'))) continue;
    if (/(?:answe?r|ansv|ans\b)/i.test(l)) continue;

    if (directReg.test(l) || (misreadMap[q] && misreadMap[q].test(l))) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    matchedHeaders.push({ q, lineIdx: foundIdx, p: allLines[foundIdx].p, text: allLines[foundIdx].text });
    curLineIdx = foundIdx + 1;
  } else {
    // If not found, log it and keep curLineIdx unchanged
    matchedHeaders.push({ q, lineIdx: -1, p: allLines[curLineIdx]?.p || 1, text: 'NOT_FOUND' });
  }
}

const notFound = matchedHeaders.filter(m => m.lineIdx === -1);
console.log(`Matched ${matchedHeaders.length - notFound.length} / 408 headers.`);
console.log(`Not found count: ${notFound.length}`);
if (notFound.length > 0) {
  console.log('Sample not found (first 25):', notFound.slice(0, 25).map(n => n.q));
}
