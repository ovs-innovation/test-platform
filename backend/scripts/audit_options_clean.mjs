import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Helper to normalize option strings
function normalizeOptionLine(str) {
  if (!str) return '';
  return str
    .replace(/\bB®\s*/g, ' (B) ')
    .replace(/\b18\)\s*/g, ' (B) ')
    .replace(/\(8\)\s*/g, ' (B) ')
    .replace(/®\s*/g, ' (B) ')
    .replace(/\(CP\s*/g, ' (A) ')
    .replace(/\bWg\s*/g, ' (A) ')
    .replace(/\(4\)\s*/g, ' (A) ')
    .replace(/\(©\)\s*/g, ' (C) ')
    .replace(/\(©\s*/g, ' (C) ')
    .replace(/©\s*/g, ' (C) ')
    .replace(/¢\s*/g, ' (C) ')
    .replace(/\(0\)\s*/g, ' (D) ')
    .replace(/\(O\)\s*/g, ' (D) ')
    .replace(/\(0\s*/g, ' (D) ')
    .replace(/\bA\)\s*/g, ' (A) ')
    .replace(/\bB\)\s*/g, ' (B) ')
    .replace(/\bC\)\s*/g, ' (C) ')
    .replace(/\bD\)\s*/g, ' (D) ')
    .replace(/^[\[\(\{]?([A-D]|[1-4])[\.\:\)\}\]\s]\s*/, (m, k) => `(${k.toUpperCase()}) `)
    .replace(/\s+/g, ' ')
    .trim();
}

function parseOptions(lines) {
  const normLines = lines.map(normalizeOptionLine).filter(Boolean);
  const full = normLines.join(' ');

  const mA = full.match(/\(A\)\s*(.*?)(?=\(B\)|$)/i);
  const mB = full.match(/\(B\)\s*(.*?)(?=\(C\)|$)/i);
  const mC = full.match(/\(C\)\s*(.*?)(?=\(D\)|$)/i);
  const mD = full.match(/\(D\)\s*(.*?)$/i);

  if (mA && mB && mC && mD) {
    const a = mA[1].trim();
    const b = mB[1].trim();
    const c = mC[1].trim();
    const d = mD[1].trim();
    if (a && b && c && d) return [a, b, c, d];
  }
  return [];
}

// Read lines sequentially
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

// Find question boundaries
const qStarts = [];
let curLine = 0;

for (let q = 1; q <= 300; q++) {
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');
  let found = -1;

  for (let i = curLine; i < Math.min(allLines.length, curLine + 60); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('300 previous') || l.includes('Maximum marks:')) continue;
    if (l.includes('marks') && (l.includes('wrong') || l.includes('negative'))) continue;
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

let optionsFound = 0;
let emptyOptions = [];

for (let i = 0; i < qStarts.length; i++) {
  const qNum = qStarts[i].q;
  const offKey = officialKeys[qNum];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNumeric) continue;

  const nextStart = (i + 1 < qStarts.length) ? qStarts[i + 1].start : allLines.length;
  const block = allLines.slice(qStarts[i].start, nextStart);

  let marksIdx = -1;
  let ansIdx = -1;
  for (let l = 0; l < block.length; l++) {
    const t = block[l].text;
    if (t.includes('marks') && (t.includes('wrong') || t.includes('negative') || t.includes('Shift') || t.includes('Offline'))) {
      marksIdx = l;
    }
    if (/^.*answ[a-z]{0,3}\s*:/i.test(t)) {
      ansIdx = l;
      break;
    }
  }

  const boundary = (marksIdx !== -1) ? marksIdx : (ansIdx !== -1 ? ansIdx : block.length);
  const qAndOpts = block.slice(0, boundary);

  // Find where option starts
  let optStart = -1;
  for (let l = 0; l < qAndOpts.length; l++) {
    const t = qAndOpts[l].text;
    if (/^\(?[A-D]\)[\.\:\s]/i.test(t) || /\b\(A\)\b/i.test(t) || /^\(CP\b/i.test(t) || /^\(4\)\b/i.test(t) || /^[A-D]\.\s/i.test(t)) {
      optStart = l;
      break;
    }
  }

  const optLines = (optStart !== -1) ? qAndOpts.slice(optStart) : [];
  const opts = parseOptions(optLines.map(l => l.text));
  if (opts.length === 4) {
    optionsFound++;
  } else {
    emptyOptions.push(qNum);
  }
}

console.log(`MCQ Options cleanly parsed: ${optionsFound} / 243`);
console.log(`Remaining to refine: ${emptyOptions.length}`);
console.log(`First 20 remaining:`, emptyOptions.slice(0, 20));
