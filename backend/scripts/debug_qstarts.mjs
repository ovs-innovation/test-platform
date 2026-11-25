import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Print debug for Q1 to Q10
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

// Find qStarts
const qStarts = [];
let curLine = 0;

for (let q = 1; q <= 20; q++) {
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');
  let found = -1;

  for (let i = curLine; i < Math.min(allLines.length, curLine + 60); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('300 previous') || l.includes('Maximum marks:')) continue;
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l)) continue;

    if (directReg.test(l)) {
      found = i;
      break;
    }
  }

  if (found === -1) found = curLine;
  qStarts.push({ q, start: found, p: allLines[found]?.p || 1 });
  curLine = found + 1;
}

for (let i = 0; i < 10; i++) {
  const qNum = qStarts[i].q;
  const nextStart = (i + 1 < qStarts.length) ? qStarts[i + 1].start : allLines.length;
  const block = allLines.slice(qStarts[i].start, nextStart);
  console.log(`\n=== Q${qNum} (lines ${qStarts[i].start} to ${nextStart}, page ${qStarts[i].p}) ===`);
  block.forEach((b, idx) => console.log(`  [${idx}] (p${b.p} line ${b.lIdx}): ${b.text}`));
}
