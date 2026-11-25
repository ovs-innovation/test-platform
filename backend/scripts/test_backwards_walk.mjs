import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Helper to check if line is decorative or marks line
function isMetaLine(line) {
  const l = line.trim();
  if (!l) return true;
  if (/^[-—\=\_\.\s\~]{3,}$/.test(l)) return true;
  if (/[ER|Trp|TET|Rw]\s*[-—\=]/i.test(l)) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|Jan|Apr|May|Sep|Feb|wrong|wong|wang|wiong)/i.test(l) && (l.includes('marks') || l.includes('mars') || l.includes('mks') || l.includes('200') || l.includes('201') || l.includes('202'))) return true;
  return false;
}

// Split line into left and right options
function splitOptions(line, leftKey, rightKey) {
  let s = line.trim();
  s = s.replace(/^[\[\(\{]?(?:[AC]|[13]|CP|Wg|4|©|¢)[\.\:\)\}\]\s]\s*/i, '');

  let rightRegex = null;
  if (rightKey === 'B') {
    rightRegex = /(?:\(B\)|\bB\)|\bB[\.\:]|\bB®|®\)?|\(8\)|18\))\s*/i;
  } else if (rightKey === 'D') {
    rightRegex = /(?:\(D\)|\bD\)|\bD[\.\:]|\(0\)|\(O\)|\b0\))\s*/i;
  }

  if (rightRegex) {
    const parts = s.split(rightRegex);
    if (parts.length >= 2) {
      return [parts[0].trim(), parts[1].trim()];
    }
  }

  // Fallback by spaces
  const spaceParts = s.split(/\s{3,}/);
  if (spaceParts.length >= 2) {
    return [spaceParts[0].trim(), spaceParts.slice(1).join(' ').trim()];
  }

  return [s, ''];
}

// Gather all lines
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

// Locate question starts
const qBlocks = [];
let curLine = 0;

for (let q = 1; q <= 300; q++) {
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');
  let found = -1;

  for (let i = curLine; i < Math.min(allLines.length, curLine + 60); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('300 previous') || l.includes('Maximum marks:')) continue;
    if (isMetaLine(l)) continue;
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l)) continue;

    if (directReg.test(l)) {
      found = i;
      break;
    }
  }

  if (found === -1) found = curLine;
  qBlocks.push({ q, start: found, p: allLines[found]?.p || 1 });
  curLine = found + 1;
}

let mcqExtracted = 0;

for (let i = 0; i < qBlocks.length; i++) {
  const qNum = qBlocks[i].q;
  const offKey = officialKeys[qNum];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNumeric) continue;

  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].start : allLines.length;
  const block = allLines.slice(qBlocks[i].start, nextStart);

  let ansIdx = -1;
  for (let l = 0; l < block.length; l++) {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(block[l].text)) {
      ansIdx = l;
      break;
    }
  }

  if (ansIdx === -1) continue;

  // Walk backwards from ansIdx to find CD line and AB line
  let ptr = ansIdx - 1;
  while (ptr >= 0 && isMetaLine(block[ptr].text)) {
    ptr--;
  }
  const cdLineIdx = ptr;
  ptr--;
  while (ptr >= 0 && isMetaLine(block[ptr].text)) {
    ptr--;
  }
  const abLineIdx = ptr;

  if (abLineIdx >= 0 && cdLineIdx > abLineIdx) {
    const [optA, optB] = splitOptions(block[abLineIdx].text, 'A', 'B');
    const [optC, optD] = splitOptions(block[cdLineIdx].text, 'C', 'D');

    if (optA && optB && optC && optD) {
      mcqExtracted++;
    }
  }
}

console.log(`Backwards-walk option extraction: ${mcqExtracted} / 243 MCQs had all 4 options extracted!`);
