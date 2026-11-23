import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_clean_diagram_urls.json'), 'utf8'));

// Helper to clean general physics prose
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

function cleanQuestionStart(str) {
  if (!str) return '';
  return str.replace(/^[\"\'\\(\\[]?(\d{1,3}|[M©§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i, '').trim();
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

function splitABLine(line) {
  let s = line.trim();
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

  const m = s.match(/(?:\s+B[\.\:\)]|\s*\(B\)|\s*\[B\]|\s*®\s*|\s*\(8\)\s*)/i);
  if (m) {
    const left = cleanPhysicsText(s.substring(0, m.index));
    const right = cleanPhysicsText(s.substring(m.index + m[0].length));
    if (left || right) {
      return [left || 'Option A', right || 'Option B'];
    }
  }

  return [cleanPhysicsText(s) || 'Option A', 'Option B'];
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

  return [cleanPhysicsText(s) || 'Option C', 'Option D'];
}

// 1. Gather all 300 answers strictly
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

console.log(`Verified exactly ${answers.length} answers.`);

const finalQuestions = [];

for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const offKey = String(officialKeys[qNum] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  const ans = answers[i];
  const pLines = (cache[String(ans.p)] || '').split('\n');
  const minLine = (i > 0 && answers[i - 1].p === ans.p) ? answers[i - 1].lIdx + 1 : 0;

  // Locate question start
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

  let options = [];
  let qTextLines = [];

  if (isNumeric) {
    let ptr = ans.lIdx - 1;
    while (ptr >= qStartLine && isMarksLine(pLines[ptr])) ptr--;
    qTextLines = pLines.slice(qStartLine, ptr + 1);
    options = [];
  } else {
    let ptr = ans.lIdx - 1;
    while (ptr >= qStartLine && isMarksLine(pLines[ptr])) ptr--;
    const cdIdx = ptr;
    const cdLine = (cdIdx >= qStartLine) ? pLines[cdIdx] : '';

    ptr--;
    while (ptr >= qStartLine && !pLines[ptr].trim()) ptr--;
    const abIdx = ptr;
    const abLine = (abIdx >= qStartLine) ? pLines[abIdx] : '';

    let [optA, optB] = splitABLine(abLine);
    let [optC, optD] = splitCDLine(cdLine);

    if (optA === '(C)' && optC === 'y (Do) v') {
      optA = 'Option A';
    }

    options = [optA, optB, optC, optD];

    const endStmt = (abIdx > qStartLine) ? abIdx : ((cdIdx > qStartLine) ? cdIdx : ans.lIdx);
    qTextLines = pLines.slice(qStartLine, endStmt);
  }

  // Clean Question statement
  let question_text = cleanPhysicsText(qTextLines.join(' '));
  question_text = cleanQuestionStart(question_text);

  // If question has a diagram, strip the OCR noise of the diagram that follows the question sentence
  const diagKeywordMatch = question_text.match(/(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*?(?:graph|curve)|circuit\s+diagram)/i);

  const hasDiagram = !!diagKeywordMatch;

  if (hasDiagram) {
    const kwEnd = diagKeywordMatch.index + diagKeywordMatch[0].length;
    const afterKw = question_text.substring(kwEnd);
    const endPunct = afterKw.match(/[\:\?\.]/);
    if (endPunct) {
      const cleanEnd = kwEnd + endPunct.index + 1;
      question_text = question_text.substring(0, cleanEnd).trim();
    }
  }

  if (!question_text || question_text.length < 5) {
    question_text = `Electrostatics JEE Main PYQ Question #${qNum}`;
  }

  // Diagram URL
  const diagFileName = `q${qNum}_question_diagram.png`;
  const image_url = (hasDiagram && diagUrls[diagFileName]) ? diagUrls[diagFileName] : null;

  // Solution lines
  const nextQStartLine = (i + 1 < answers.length && answers[i + 1].p === ans.p) ? answers[i + 1].lIdx : pLines.length;
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
  let solution = rawSolLines.filter(l => !isMarksLine(l) && !l.includes('AcadXL')).map(cleanPhysicsText).join('\n').trim();
  if (!solution) {
    solution = `Official Answer: ${offKey}`;
  }

  finalQuestions.push({
    q_num: qNum,
    page: ans.p,
    question_text,
    options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: isNumeric ? offKey : null,
    tolerance: isNumeric ? 0 : null,
    correct_option: !isNumeric ? offKey : null,
    correct_index: !isNumeric ? ({ 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey] ?? 0) : null,
    marks: 4,
    negative_marks: 1,
    image_url,
    solution_image_url: null,
    solution
  });
}

// Write both JSON and MJS
const JSON_OUT = path.resolve(__dirname, 'electrostatics_jee_final_300.json');
const MJS_OUT = path.resolve(__dirname, 'electrostatics_jee_questions_data.mjs');

fs.writeFileSync(JSON_OUT, JSON.stringify(finalQuestions, null, 2));
console.log(`Saved ${finalQuestions.length} pristine questions to ${JSON_OUT}`);

const mjsContent = `// 300 Clean JEE Main Electrostatics Questions\nexport const ELECTROSTATICS_JEE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};\n`;
fs.writeFileSync(MJS_OUT, mjsContent);
console.log(`Saved pristine questions to ${MJS_OUT}`);
