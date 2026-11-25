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

function isMetaLine(line) {
  const l = line.trim();
  if (!l) return true;
  if (/^[-—\=\_\.\s\~]{3,}$/.test(l)) return true;
  if (/[ER|Trp|TET|Rw]\s*[-—\=]/i.test(l)) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|wrong|wong|wang|wiong)/i.test(l) && (l.includes('marks') || l.includes('mars') || l.includes('mks') || l.includes('200') || l.includes('201') || l.includes('202'))) return true;
  return false;
}

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
      return [cleanPhysicsText(parts[0]), cleanPhysicsText(parts[1])];
    }
  }

  const spaceParts = s.split(/\s{3,}/);
  if (spaceParts.length >= 2) {
    return [cleanPhysicsText(spaceParts[0]), cleanPhysicsText(spaceParts.slice(1).join(' '))];
  }

  return [cleanPhysicsText(s), ''];
}

// 1. Gather clean answers
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

const finalQuestions = [];

for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const offKey = String(officialKeys[qNum] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  const ans = answers[i];
  const pLines = (cache[String(ans.p)] || '').split('\n');
  const minLine = (i > 0 && answers[i - 1].p === ans.p) ? answers[i - 1].lIdx + 1 : 0;

  let qStartLine = minLine;
  for (let l = minLine; l < ans.lIdx; l++) {
    const t = pLines[l].trim();
    if (!t) continue;
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    const reg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    if (reg.test(t)) {
      qStartLine = l;
      break;
    }
  }

  // Find meta / marks line between qStartLine and ans.lIdx
  let marksLineIdx = -1;
  for (let l = ans.lIdx - 1; l >= qStartLine; l--) {
    if (isMetaLine(pLines[l])) {
      marksLineIdx = l;
      break;
    }
  }

  const boundary = (marksLineIdx !== -1) ? marksLineIdx : ans.lIdx;
  const contentLines = pLines.slice(qStartLine, boundary);

  let options = [];
  let qTextLines = [];

  if (isNumeric) {
    qTextLines = contentLines;
  } else {
    // Walk backwards in contentLines to find CD line and AB line
    let ptr = contentLines.length - 1;
    while (ptr >= 0 && isMetaLine(contentLines[ptr])) ptr--;
    const cdIdx = ptr;
    ptr--;
    while (ptr >= 0 && isMetaLine(contentLines[ptr])) ptr--;
    const abIdx = ptr;

    if (abIdx >= 0 && cdIdx > abIdx) {
      const [optA, optB] = splitOptions(contentLines[abIdx], 'A', 'B');
      const [optC, optD] = splitOptions(contentLines[cdIdx], 'C', 'D');
      if (optA && optB && optC && optD) {
        options = [optA, optB, optC, optD];
        qTextLines = contentLines.slice(0, abIdx);
      } else {
        qTextLines = contentLines.slice(0, Math.max(1, abIdx));
        options = [optA || '(A)', optB || '(B)', optC || '(C)', optD || '(D)'];
      }
    } else {
      qTextLines = contentLines;
      options = ['(A)', '(B)', '(C)', '(D)'];
    }
  }

  let question_text = cleanPhysicsText(qTextLines.join(' '));
  if (!question_text || question_text.length < 5) {
    question_text = `Electrostatics JEE Main PYQ Question #${qNum}`;
  }

  // Solution lines: from ans.lIdx + 1 to next question start
  const nextQStartLine = (i + 1 < answers.length && answers[i + 1].p === ans.p) ? answers[i + 1].lIdx : pLines.length;
  // Look for next question start between ans.lIdx and nextQStartLine
  let solEndLine = nextQStartLine;
  for (let l = ans.lIdx + 1; l < nextQStartLine; l++) {
    const t = pLines[l].trim();
    const regNext = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${qNum + 1}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    if (regNext.test(t)) {
      solEndLine = l;
      break;
    }
  }

  const rawSolLines = pLines.slice(ans.lIdx + 1, solEndLine);
  let solution = rawSolLines.filter(l => !isMetaLine(l) && !l.includes('AcadXL')).map(cleanPhysicsText).join('\n').trim();
  if (!solution) {
    solution = `Official Answer: ${offKey}`;
  }

  // Diagram keyword check
  const hasDiagram = /(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*(?:graph|curve)|circuit\s+diagram)/i.test(question_text);

  finalQuestions.push({
    q_num: qNum,
    page: ans.p,
    qStartLine,
    ansLine: ans.lIdx,
    question_text,
    options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: isNumeric ? offKey : null,
    tolerance: isNumeric ? 0 : null,
    correct_option: !isNumeric ? offKey : null,
    correct_index: !isNumeric ? ({ 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey] ?? 0) : null,
    marks: 4,
    negative_marks: 1,
    hasDiagram,
    image_url: null,
    solution_image_url: null,
    solution
  });
}

fs.writeFileSync(path.resolve(__dirname, 'electrostatics_clean_300_prelim.json'), JSON.stringify(finalQuestions, null, 2));
console.log(`Saved 300 clean questions to electrostatics_clean_300_prelim.json.`);

// Preview questions 1, 2, 4, 7, 13, 16
for (let q of [1, 2, 4, 7, 13, 16]) {
  const item = finalQuestions[q - 1];
  console.log(`\n=== Question #${item.q_num} (Page ${item.page}) ===`);
  console.log(`Text: ${item.question_text}`);
  console.log(`Options:`, item.options);
  console.log(`Key: ${item.correct_option || item.numeric_answer}`);
  console.log(`Has Diagram: ${item.hasDiagram}`);
  console.log(`Sol: ${item.solution.substring(0, 100)}`);
}
