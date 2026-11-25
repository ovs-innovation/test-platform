import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Physics text cleaner
function cleanPhysicsText(str) {
  if (!str) return '';
  return str
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
    .replace(/\bav\b/g, '0.1\\text{ V}')
    .replace(/\bsv\b/g, '8\\text{ V}')
    .replace(/\b2v\b/g, '2\\text{ V}')
    .replace(/\b05v\b/g, '0.5\\text{ V}')
    .replace(/\bgg\b/g, 'F/4')
    .replace(/\b34\b(?=\s*$)/g, '3F/4')
    .replace(/\bg\/g\b/g, 'F/8')
    .replace(/\b35\/5\b/g, '3F/8')
    .replace(/\bWg\b/g, '-Q/8')
    .replace(/\b_g\/2\b/g, '-Q/2')
    .replace(/\b_qg\/4\b/g, '-Q/4')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMarksLine(s) {
  const l = s.trim();
  if (!l) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|wrong|wong|wang|wiong)\b/i.test(l)) return true;
  if (/^[-—\=\_\.\s\~\[\]\{\}\(\)]{3,}$/.test(l)) return true;
  if (/(?:\[|\b)?(?:ER|Trp|TET|Rw|Pr|T—)\s*[-—\=]/i.test(l)) return true;
  if (/^\[?ER\s*T/i.test(l)) return true;
  if (/^\[?[A-Za-z\s]{0,4}\d{1,2}\s*(?:marks|mars|mks|mark)/i.test(l)) return true;
  if (/^(?:Tak\s*TR|Treokt|Pepa)/i.test(l)) return true;
  return false;
}

function stripOptionMarker(str, key) {
  let s = str.trim();
  if (key === 'A') {
    s = s.replace(/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4|W\b|Wg\b)[\.\:\)\}\]\s]\s*/i, '');
  } else if (key === 'B') {
    s = s.replace(/^[\[\(\{]?(?:B|®|B®|8|18)[\.\:\)\}\]\s]\s*/i, '');
  } else if (key === 'C') {
    s = s.replace(/^[\[\(\{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]\s*/i, '');
  } else if (key === 'D') {
    s = s.replace(/^[\[\(\{]?(?:D|0|O|JT)[\.\:\)\}\]\s]\s*/i, '');
  }
  return s.trim();
}

function splitABLine(line) {
  let s = line.trim();
  // Strip leading A marker if present
  s = s.replace(/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4)[\.\:\)\}\]\s]\s*/i, '');
  
  const bSeps = [
    /\s+(?:\(B\)|\[B\]|\bB\b[\.\:\)]|\bB®|®\)?|\(8\)|18\)|\b8\))\s*/i,
    /\s+(?:©\)|®|©)\s*/,
    /\s{3,}/
  ];

  for (const sep of bSeps) {
    const parts = s.split(sep);
    if (parts.length >= 2) {
      const left = cleanPhysicsText(parts[0]);
      const right = cleanPhysicsText(parts.slice(1).join(' '));
      if (left && right) {
        return [left, right];
      }
    }
  }

  // Fallback: if 'B' marker is anywhere in the string
  const m = s.match(/(?:\s+B[\.\:\)]|\s*\(B\)|\s*\[B\]|\s*®\s*|\s*\(8\)\s*)/i);
  if (m) {
    const left = cleanPhysicsText(s.substring(0, m.index));
    const right = cleanPhysicsText(s.substring(m.index + m[0].length));
    if (left || right) {
      return [left || 'Option A', right || 'Option B'];
    }
  }

  return [cleanPhysicsText(s), 'Option B'];
}

function splitCDLine(line) {
  let s = line.trim();
  s = s.replace(/^[\[\(\{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]\s*/i, '');

  const dSeps = [
    /\s+(?:\(D\)|\[D\]|\bD\b[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\))\s*/i,
    /\s+(?:©\)|©|\(©\))\s*/,
    /\s{3,}/
  ];

  for (const sep of dSeps) {
    const parts = s.split(sep);
    if (parts.length >= 2) {
      const left = cleanPhysicsText(parts[0]);
      const right = cleanPhysicsText(parts.slice(1).join(' '));
      if (left && right) {
        return [left, right];
      }
    }
  }

  const m = s.match(/(?:\s+D[\.\:\)]|\s*\(D\)|\s*\[D\]|\s*\(0\)\s*|\s*©\)\s*)/i);
  if (m) {
    const left = cleanPhysicsText(s.substring(0, m.index));
    const right = cleanPhysicsText(s.substring(m.index + m[0].length));
    if (left || right) {
      return [left || 'Option C', right || 'Option D'];
    }
  }

  return [cleanPhysicsText(s), 'Option D'];
}

const answers = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l.trim())) {
      if (p === 169 && l.includes('20')) return;
      if (p === 170 && l.includes('10%')) return;
      answers.push({ p, lIdx: idx, text: l.trim() });
    }
  });
}

let mcqTotal = 0;
let cleanOptionsCount = 0;
let dummyOptionsCount = 0;

for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const offKey = officialKeys[qNum];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNum) continue;
  mcqTotal++;

  const ans = answers[i];
  const pLines = (cache[String(ans.p)] || '').split('\n');
  const minLine = (i > 0 && answers[i - 1].p === ans.p) ? answers[i - 1].lIdx + 1 : 0;

  // Walk backwards from ans.lIdx - 1
  let ptr = ans.lIdx - 1;
  while (ptr >= minLine && isMarksLine(pLines[ptr])) {
    ptr--;
  }
  const cdLine = (ptr >= minLine) ? pLines[ptr] : '';
  ptr--;
  while (ptr >= minLine && !pLines[ptr].trim()) {
    ptr--;
  }
  const abLine = (ptr >= minLine) ? pLines[ptr] : '';

  const [optA, optB] = splitABLine(abLine);
  const [optC, optD] = splitCDLine(cdLine);

  const opts = [optA, optB, optC, optD];
  const hasDummy = opts.some(o => /^\([A-D]\)$/.test(o));
  if (hasDummy) {
    dummyOptionsCount++;
    console.log(`DUMMY FOUND in Q${qNum}:`, opts);
  } else {
    cleanOptionsCount++;
  }

  if (qNum <= 15) {
    console.log(`Q${qNum} (ans ${offKey}):`, opts);
  }
}

console.log(`Total MCQs: ${mcqTotal}`);
console.log(`Clean options count: ${cleanOptionsCount}`);
console.log(`Dummy options count: ${dummyOptionsCount}`);
