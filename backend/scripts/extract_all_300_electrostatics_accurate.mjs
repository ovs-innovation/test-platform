import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

const DIAG_DIR = path.resolve(__dirname, 'electrostatics_clean_diagrams');
if (!fs.existsSync(DIAG_DIR)) {
  fs.mkdirSync(DIAG_DIR, { recursive: true });
}

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
    .replace(/\s+/g, ' ')
    .trim();
}

function trimAndSave(canvas, yStart, yEnd, outPath) {
  const ctx = canvas.getContext('2d');
  const h = Math.max(1, yEnd - yStart);
  if (h < 25) return false;

  const sliceData = ctx.getImageData(0, yStart, canvas.width, h);
  const data = sliceData.data;

  let minX = canvas.width, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 60; x < canvas.width - 60; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 225 || g < 225 || b < 225) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return false;
  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, yStart + minY - pad);
  const finalW = Math.min(canvas.width - cropX, trimW + pad * 2);
  const finalH = Math.min(canvas.height - cropY, trimH + pad * 2);

  const outCanvas = createCanvas(finalW, finalH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, finalW, finalH);
  outCtx.drawImage(canvas, cropX, cropY, finalW, finalH, 0, 0, finalW, finalH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  return true;
}

// Collect all lines with page & line index
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

// Find questions strictly forward
const qBlocks = [];
let curLineIdx = 0;

for (let q = 1; q <= 300; q++) {
  // Regex to match question number
  const directReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');

  const misreadMap = {
    1: /^1\s+[A-Za-z]/,
    6: /^©[\.\:\s]/,
    9: /^©[\.\:\s]/,
    11: /^M[\.\:\s]/,
    29: /^(Two identical charged spheres suspended|answeR)/i,
    50: /^50[\.\:\s]/,
    63: /^83[\.\:\s]/,
    66: /^86[\.\:\s]/,
    68: /^8[\.\:\s]/,
    69: /^89[\.\:\s]/,
    74: /^7a[\.\:\s]/,
    91: /^91[\.\:\s]/,
    106: /^106[\.\:\s]/,
    110: /^M0[\.\:\s]/,
    111: /^m[\.\:\s]/,
    112: /^M2[\.\:\s]/,
    113: /^M3[\.\:\s]/,
    114: /^114[\.\:\s]/,
    115: /^15[\.\:\s]/,
    116: /^116[\.\:\s]/,
    117: /^117[\.\:\s]/,
    118: /^118[\.\:\s]/,
    119: /^119[\.\:\s]/,
    131: /^13[1lI|][\.\:\s]/,
    136: /^13[68b][\.\:\s]/,
    141: /^14[1lI|][\.\:\s]/,
    146: /^14[68b][\.\:\s]/,
    147: /^147[\.\:\s]/,
    148: /^148[\.\:\s]/,
    151: /^15[1lI|][\.\:\s]/,
    157: /^157[\.\:\s]/,
    158: /^15[8B][\.\:\s]/,
    166: /^16[68b][\.\:\s]/,
    171: /^17[1lI|][\.\:\s]/,
    176: /^17[68b][\.\:\s]/,
    191: /^19[1lI|][\.\:\s]/,
    193: /^193[\.\:\s]/,
    199: /^199[\.\:\s]/,
    206: /^20[68b][\.\:\s]/,
    211: /^21[1lI|][\.\:\s]/,
    230: /^230[\.\:\s]/,
    236: /^23[68b][\.\:\s]/,
    239: /^239[\.\:\s]/,
    241: /^24[1lI|][\.\:\s]/,
    242: /^242[\.\:\s]/,
    269: /^269[\.\:\s]/,
    271: /^27[1lI|][\.\:\s]/
  };

  let foundStart = -1;
  for (let i = curLineIdx; i < Math.min(allLines.length, curLineIdx + 60); i++) {
    const l = allLines[i].text;
    if (!l) continue;
    if (l.includes('AcadXL') || l.includes('PREVIOUS YEAR') || l.includes('300 previous') || l.includes('Maximum marks:')) continue;
    if (l.includes('marks') && (l.includes('wrong') || l.includes('negative'))) continue;
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l)) continue;

    if (directReg.test(l) || (misreadMap[q] && misreadMap[q].test(l))) {
      foundStart = i;
      break;
    }
  }

  // Fallback: if not found, advance past the previous question's answer line
  if (foundStart === -1) {
    foundStart = curLineIdx;
  }

  qBlocks.push({
    qNum: q,
    startGlobalIdx: foundStart,
    page: allLines[foundStart]?.p || 1
  });

  curLineIdx = foundStart + 1;
}

console.log(`Initialized ${qBlocks.length} question blocks.`);

// Assign endGlobalIdx for each question block
for (let i = 0; i < qBlocks.length; i++) {
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startGlobalIdx : allLines.length;
  qBlocks[i].endGlobalIdx = nextStart;
}

// Now process each question block
const cleanQuestions = [];

for (let i = 0; i < qBlocks.length; i++) {
  const block = qBlocks[i];
  const qNum = block.qNum;
  const offKey = String(officialKeys[qNum] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);

  const blockLines = allLines.slice(block.startGlobalIdx, block.endGlobalIdx);
  const page = block.page;

  // Find marks line and answer line inside block
  let marksLocalIdx = -1;
  let ansLocalIdx = -1;

  for (let l = 0; l < blockLines.length; l++) {
    const txt = blockLines[l].text;
    if (txt.includes('marks') && (txt.includes('wrong') || txt.includes('negative') || txt.includes('Shift') || txt.includes('Offline'))) {
      marksLocalIdx = l;
    }
    if (/^.*answ[a-z]{0,3}\s*:/i.test(txt)) {
      ansLocalIdx = l;
      break; // First answer line in this question block is the real answer
    }
  }

  // Question + Options are before marks/answer
  const qAndOptBoundary = (marksLocalIdx !== -1) ? marksLocalIdx : (ansLocalIdx !== -1 ? ansLocalIdx : blockLines.length);
  const qAndOptLines = blockLines.slice(0, qAndOptBoundary);

  // Separate Question text from Options
  // Option markers: (A), A), A., (1), etc.
  let optStartIdx = -1;
  if (!isNumeric) {
    for (let l = 0; l < qAndOptLines.length; l++) {
      const txt = qAndOptLines[l].text;
      // Match option start on a line
      if (/^\(?[A-D]\)[\.\:\s]/i.test(txt) || /^\(?[1-4]\)[\.\:\s]/i.test(txt) || /^[A-D]\.\s/i.test(txt) || /^[A-D]\s*[\)\]]/i.test(txt)) {
        optStartIdx = l;
        break;
      }
      // Or in-line option marker
      if (/\b\(A\)\b/i.test(txt) || /\bA\)\b/i.test(txt)) {
        optStartIdx = l;
        break;
      }
    }
  }

  const qLines = (optStartIdx !== -1) ? qAndOptLines.slice(0, optStartIdx) : qAndOptLines;
  const optLines = (optStartIdx !== -1) ? qAndOptLines.slice(optStartIdx) : [];

  let rawQText = qLines.map(l => l.text).join(' ');
  // Clean question statement
  let question_text = cleanPhysicsText(rawQText);
  if (!question_text || question_text.length < 5) {
    question_text = `Electrostatics JEE Main PYQ Question #${qNum}`;
  }

  // Options parsing
  let options = [];
  if (!isNumeric) {
    const fullOptStr = optLines.map(l => l.text).join(' ');
    // Attempt standard split: (A) ... (B) ... (C) ... (D) ...
    const optRegex = /(?:^|\s|\(|\[)(?:[A-D]|[1-4])(?:\)|\.|\:|\])\s*(.*?)(?=(?:^|\s|\(|\[)(?:[A-D]|[1-4])(?:\)|\.|\:|\])|$)/gi;
    let matches = [];
    let m;
    while ((m = optRegex.exec(fullOptStr)) !== null) {
      if (m[1].trim()) matches.push(m[1].trim());
    }

    if (matches.length >= 4) {
      options = matches.slice(0, 4).map(cleanPhysicsText);
    } else {
      // Fallback: try splitting by newline if each line has an option
      const cleanOptLines = optLines.map(l => cleanPhysicsText(l.text)).filter(Boolean);
      if (cleanOptLines.length >= 4) {
        options = cleanOptLines.slice(0, 4);
      } else {
        // Fallback for symbolic options
        options = ['(A)', '(B)', '(C)', '(D)'];
      }
    }
  }

  // Solution lines
  const solLines = (ansLocalIdx !== -1) ? blockLines.slice(ansLocalIdx + 1) : [];
  let solution = solLines.map(l => l.text).filter(l => !l.includes('AcadXL') && !l.includes('PREVIOUS YEAR')).join('\n').trim();
  if (!solution) {
    solution = `Official Answer: ${offKey}`;
  }

  // Diagram keyword check
  const hasDiagram = /(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*(?:graph|curve)|circuit\s+diagram)/i.test(question_text);

  cleanQuestions.push({
    q_num: qNum,
    page,
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

console.log(`Processed all 300 clean questions.`);
console.log(`MCQs: ${cleanQuestions.filter(q => q.question_type === 'mcq').length}`);
console.log(`Numericals: ${cleanQuestions.filter(q => q.question_type === 'numerical').length}`);
console.log(`Questions with diagram keyword: ${cleanQuestions.filter(q => q.hasDiagram).length}`);

// Preview first 5 questions
for (let i = 0; i < 5; i++) {
  console.log(`\n--- Question ${i + 1} ---`);
  console.log(`Text: ${cleanQuestions[i].question_text.substring(0, 120)}`);
  console.log(`Options:`, cleanQuestions[i].options);
  console.log(`Key: ${cleanQuestions[i].correct_option || cleanQuestions[i].numeric_answer}`);
}
