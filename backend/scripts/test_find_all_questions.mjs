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

const foundPositions = [];
let curLine = 0;

for (let q = 1; q <= 408; q++) {
  const regDirect = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');
  let matchIdx = -1;

  for (let i = curLine; i < Math.min(allLines.length, curLine + 80); i++) {
    const t = allLines[i].text;
    if (!t) continue;
    if (t.includes('AcadXL') || t.includes('PREVIOUS') || t.includes('Current Electricity') || t.includes('Maximum mark')) continue;
    if (t.includes('marks') && (t.includes('wrong') || t.includes('negative') || t.includes('Offline'))) continue;
    if (/(?:answe?r|ansv|ans\b)/i.test(t)) continue;

    if (regDirect.test(t)) {
      matchIdx = i;
      break;
    }
  }

  if (matchIdx !== -1) {
    foundPositions.push({ q, p: allLines[matchIdx].p, lIdx: allLines[matchIdx].lIdx, text: allLines[matchIdx].text });
    curLine = matchIdx + 1;
  } else {
    foundPositions.push({ q, p: allLines[curLine]?.p || 1, lIdx: allLines[curLine]?.lIdx || 0, text: 'MISSING', missing: true });
  }
}

const missing = foundPositions.filter(f => f.missing);
console.log(`Found ${foundPositions.length - missing.length} / 408 question headers directly.`);
console.log(`Missing headers count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Sample missing:', missing.slice(0, 20).map(m => m.q));
}
