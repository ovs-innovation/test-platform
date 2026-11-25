import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Helper to clean common physics OCR text
function cleanPhysicsText(str) {
  if (!str) return '';
  return str
    .replace(/^(\d{1,3}|[M©§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i, '')
    .replace(/\bpaint\b/g, 'point')
    .replace(/\b13\b(?=, then brought in contact with C)/g, 'B')
    .replace(/\b13\b(?= and C)/g, 'B')
    .replace(/\bBB and C'\b/g, 'B and C')
    .replace(/\bBB\b(?= and C)/g, 'B')
    .replace(/\bAcharged\b/g, 'A charged')
    .replace(/\bg1\b/g, 'q_1')
    .replace(/\bg2\b/g, 'q_2')
    .replace(/\bgs\b/g, 'q_3')
    .replace(/—qu\b/g, '-q_1')
    .replace(/\b2-component\b/g, 'x-component')
    .replace(/\bz-axis\b/g, 'x-axis')
    .replace(/\bz-direction\b/g, 'x-direction')
    .replace(/\bz -axis\b/g, 'x-axis')
    .replace(/\bz - direction\b/g, 'x-direction')
    .replace(/\bz\s*=\s*/g, 'x = ')
    .replace(/\bz—axis\b/g, 'x-axis')
    .replace(/\bjum\b/g, '\\mu\\text{m}')
    .replace(/\buC\b/g, '\\mu\\text{C}')
    .replace(/\bTiC\b/g, '7\\mu\\text{C}')
    .replace(/\b10¢\b/g, '10^4')
    .replace(/\b10c\b/g, '10^4')
    .replace(/\b3 x 10¢\b/g, '3 \\times 10^4')
    .replace(/\b3 x 10c\b/g, '3 \\times 10^4')
    .replace(/\b9.9 x 10" kg\b/g, '9.9 \\times 10^{-15}\\text{ kg}')
    .replace(/\b10" kg\b/g, '10^{-15}\\text{ kg}')
    .replace(/\b10-1¢C\b/g, '10^{-12}\\text{ C}')
    .replace(/\b10%C\b/g, '10^{-18}\\text{ C}')
    .replace(/\b105C\b/g, '10^{-19}\\text{ C}')
    .replace(/\b10C\b/g, '10^{-19}\\text{ C}')
    .replace(/\ba-particle\b/g, '\\alpha\\text{-particle}')
    .replace(/\b5MeV\b/g, '5\\text{ MeV}')
    .replace(/\b5 MeV\b/g, '5\\text{ MeV}')
    .replace(/\bts centre\b/g, 'its centre')
    .replace(/\bvalue of g\b/g, 'value of q')
    .replace(/\bvalue of g is\b/g, 'value of q is')
    .replace(/\bcharge g\b/g, 'charge q')
    .replace(/\bcharge g is\b/g, 'charge q is')
    .replace(/\bcharges g\b/g, 'charges q')
    .replace(/\bF'\b/g, 'F')
    .replace(/\beo\b/g, '\\varepsilon_0')
    .replace(/\b2me,L\b/g, '2\\pi\\varepsilon_0 L')
    .replace(/\b3me,L\b/g, '3\\pi\\varepsilon_0 L')
    .replace(/\b4me,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\bIme,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\bIme\b/g, '4\\pi\\varepsilon_0')
    .replace(/\bme,\b/g, '\\pi\\varepsilon_0')
    .replace(/\bfen\b/g, '\\varepsilon_0')
    .replace(/\bcosh\b/g, '\\cos\\theta')
    .replace(/\bcot\b/g, '\\cot\\theta')
    .replace(/\bging\b/g, '\\sin\\theta')
    .replace(/\btang\b/g, '\\tan\\theta')
    .replace(/\s+/g, ' ')
    .trim();
}

// Split a line with 2 options into left and right
function splitTwoOptions(line, leftKey, rightKey) {
  let s = line.trim();
  // Regex to find delimiter for rightKey:
  // e.g. (B), ®), ®, B), 18), (8), (D), (0), (O), D)
  let rightMarkerRegex = null;
  if (rightKey === 'B') {
    rightMarkerRegex = /(?:\(B\)|\bB\)|®\)?|\(8\)|18\))\s*/i;
  } else if (rightKey === 'D') {
    rightMarkerRegex = /(?:\(D\)|\bD\)|\(0\)|\(O\)|\b0\))\s*/i;
  }

  // Remove leading leftKey marker (A) or (C)
  s = s.replace(/^(?:\([AC]\)|[AC]\)|\(CP\b|Wg\b|\(4\)\b|\(©\b|©\b|¢\b)\s*/i, '');

  if (rightMarkerRegex) {
    const parts = s.split(rightMarkerRegex);
    if (parts.length >= 2) {
      return [cleanPhysicsText(parts[0]), cleanPhysicsText(parts[1])];
    }
  }

  // Fallback: split in half by multiple spaces if available
  const spaceParts = s.split(/\s{2,}/);
  if (spaceParts.length >= 2) {
    return [cleanPhysicsText(spaceParts[0]), cleanPhysicsText(spaceParts.slice(1).join(' '))];
  }

  return [cleanPhysicsText(s), ''];
}

// Collect all lines
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

// Locate question blocks
const qBlocks = [];
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
  qBlocks.push({ q, start: found, p: allLines[found]?.p || 1 });
  curLine = found + 1;
}

let successfulOptions = 0;
const results = [];

for (let i = 0; i < qBlocks.length; i++) {
  const qNum = qBlocks[i].q;
  const offKey = officialKeys[qNum];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].start : allLines.length;
  const block = allLines.slice(qBlocks[i].start, nextStart);

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

  let options = [];
  let qLines = [];

  if (isNumeric) {
    qLines = qAndOpts;
  } else {
    // If we have >= 3 lines in qAndOpts, the last 2 lines are the options (A/B, C/D)!
    if (qAndOpts.length >= 3) {
      const lineAB = qAndOpts[qAndOpts.length - 2].text;
      const lineCD = qAndOpts[qAndOpts.length - 1].text;
      const [optA, optB] = splitTwoOptions(lineAB, 'A', 'B');
      const [optC, optD] = splitTwoOptions(lineCD, 'C', 'D');

      if (optA && optB && optC && optD) {
        options = [optA, optB, optC, optD];
        qLines = qAndOpts.slice(0, qAndOpts.length - 2);
        successfulOptions++;
      } else {
        // Fallback: take all lines above boundary
        qLines = qAndOpts.slice(0, Math.max(1, qAndOpts.length - 2));
        options = [optA || '(A)', optB || '(B)', optC || '(C)', optD || '(D)'];
      }
    } else {
      qLines = qAndOpts;
      options = ['(A)', '(B)', '(C)', '(D)'];
    }
  }

  let question_text = cleanPhysicsText(qLines.map(l => l.text).join(' '));
  if (!question_text || question_text.length < 5) {
    question_text = `Electrostatics JEE Main PYQ Question #${qNum}`;
  }

  results.push({
    qNum,
    question_text,
    options,
    isNumeric,
    key: offKey
  });
}

console.log(`Results: ${successfulOptions} / 243 MCQs had clean 4-option pairs extracted!`);

// Print sample questions
for (let i of [0, 1, 2, 3, 6, 12, 15]) {
  console.log(`\n=== Question ${results[i].qNum} ===`);
  console.log(`Statement: ${results[i].question_text}`);
  console.log(`Options:`, results[i].options);
  console.log(`Key: ${results[i].key}`);
}
