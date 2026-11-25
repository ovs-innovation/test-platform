import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

const DIAG_DIR = path.resolve(__dirname, 'current_electricity_clean_diagrams');
if (!fs.existsSync(DIAG_DIR)) {
  fs.mkdirSync(DIAG_DIR, { recursive: true });
}

// Common physics prose cleaners
function cleanPhysicsText(str) {
  if (!str) return '';
  return str
    .replace(/\bpaint\b/g, 'point')
    .replace(/\b13\b(?=, then brought in contact with C)/g, 'B')
    .replace(/\b13\b(?= and C)/g, 'B')
    .replace(/\bBB and C'\b/g, 'B and C')
    .replace(/\bBB\b(?= and C)/g, 'B')
    .replace(/\bAcharged\b/g, 'A charged')
    .replace(/\b2-component\b/g, 'x-component')
    .replace(/\bz-axis\b/g, 'x-axis')
    .replace(/\bz-direction\b/g, 'x-direction')
    .replace(/\bjum\b/g, '\\mu\\text{m}')
    .replace(/\buC\b/g, '\\mu\\text{C}')
    .replace(/\b10¢\b/g, '10^4')
    .replace(/\b10c\b/g, '10^4')
    .replace(/\b3 x 10¢\b/g, '3 \\times 10^4')
    .replace(/\b3 x 10c\b/g, '3 \\times 10^4')
    .replace(/\bts centre\b/g, 'its centre')
    .replace(/\bF'\b/g, 'F')
    .replace(/\beo\b/g, '\\varepsilon_0')
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
  s = s.replace(/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4|18|\{Al|LA\))[\.\:\)\}\]\s]\s*/i, '');

  const bSeps = [
    /\s+(?:\(B\)|\[B\]|\bB\b[\.\:\)]|\bB®|®\)?|\(8\)|18\)|\b8\)|ABI|1B\))\s*/i,
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

  const m = s.match(/(?:\s+B[\.\:\)]|\s*\(B\)|\s*\[B\]|\s*®\s*|\s*\(8\)\s*|\s*ABI\s*)/i);
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
  s = s.replace(/^[\[\(\{]?(?:C|©|\(©\)|¢|€|12|1\)|IE\]|ACT)[\.\:\)\}\]\s]\s*/i, '');

  const dSeps = [
    /\s+(?:\(D\)|\[D\]|\bD\b[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\)|10\)|10\}|40\)|1D\))\s*/i,
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

  const m = s.match(/(?:\s+D[\.\:\)]|\s*\(D\)|\s*\[D\]|\s*\(0\)\s*|\s*©\)\s*|\s*10\)\s*)/i);
  if (m) {
    const left = cleanPhysicsText(s.substring(0, m.index));
    const right = cleanPhysicsText(s.substring(m.index + m[0].length));
    if (left || right) {
      return [left || 'Option C', right || 'Option D'];
    }
  }

  return [cleanPhysicsText(s) || 'Option C', 'Option D'];
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

async function buildAll408() {
  console.log('=== BUILDING ALL 408 CURRENT ELECTRICITY QUESTIONS ===');

  // Flatten lines
  const allLines = [];
  for (let p = 1; p <= 211; p++) {
    const lines = (cache[String(p)] || '').split('\n');
    lines.forEach((l, idx) => {
      allLines.push({ p, lIdx: idx, text: l.trim() });
    });
  }

  // Pre-load all page images into cache for fast cropping
  const pageImages = {};

  const DIAG_KEYWORD = /(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*?(?:graph|curve)|circuit\s+diagram)/i;

  const finalQuestions = [];

  // Monotonic step through questions 1..408
  // Since 408 questions span 211 pages, question q is on approx page Math.ceil(q / 1.93)
  for (let q = 1; q <= 408; q++) {
    const offKey = String(officialKeys[q] || 'A').trim();
    const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);

    const approxPage = Math.min(211, Math.max(1, Math.round(q * (211 / 408))));
    // Search pages around approxPage: [approxPage - 3 .. approxPage + 3]
    const pMin = Math.max(1, approxPage - 3);
    const pMax = Math.min(211, approxPage + 3);

    let foundPage = approxPage;
    let foundLIdx = -1;

    // Search for question number on pages
    const qReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~*#]\\s*(.*)`, 'i');

    for (let p = pMin; p <= pMax; p++) {
      const pLines = (cache[String(p)] || '').split('\n');
      for (let l = 0; l < pLines.length; l++) {
        const txt = pLines[l].trim();
        if (qReg.test(txt)) {
          foundPage = p;
          foundLIdx = l;
          break;
        }
      }
      if (foundLIdx !== -1) break;
    }

    const pageLines = (cache[String(foundPage)] || '').split('\n');
    let qStart = (foundLIdx !== -1) ? foundLIdx : 0;

    // Find end of question on this page (start of next question, or marks line, or end of page)
    let qEnd = pageLines.length;
    for (let l = qStart + 1; l < pageLines.length; l++) {
      const txt = pageLines[l].trim();
      const nextQReg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${q + 1}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
      if (nextQReg.test(txt)) {
        qEnd = l;
        break;
      }
    }

    const qBlock = pageLines.slice(qStart, qEnd);

    // Options extraction for MCQ
    let options = [];
    let qTextLines = [];
    let solution = `Official Answer: ${offKey}`;

    // Find marks line / answer line inside qBlock
    let marksIdx = -1;
    let ansIdx = -1;
    for (let l = 0; l < qBlock.length; l++) {
      if (isMarksLine(qBlock[l])) {
        marksIdx = l;
      }
      if (/(?:answe?r|ansv|ans\b)/i.test(qBlock[l])) {
        ansIdx = l;
        break;
      }
    }

    const contentCutoff = (marksIdx !== -1) ? marksIdx : (ansIdx !== -1 ? ansIdx : qBlock.length);
    const preContent = qBlock.slice(0, contentCutoff);

    if (isNumeric) {
      options = [];
      qTextLines = preContent;
    } else {
      // Last two lines before marks are typically CD and AB options
      let ptr = preContent.length - 1;
      while (ptr >= 0 && !preContent[ptr].trim()) ptr--;
      const cdLine = (ptr >= 0) ? preContent[ptr] : '';

      ptr--;
      while (ptr >= 0 && !preContent[ptr].trim()) ptr--;
      const abLine = (ptr >= 0) ? preContent[ptr] : '';

      let [optA, optB] = splitABLine(abLine);
      let [optC, optD] = splitCDLine(cdLine);

      options = [optA, optB, optC, optD];
      qTextLines = (ptr > 0) ? preContent.slice(0, ptr) : preContent;
    }

    let question_text = cleanPhysicsText(qTextLines.join(' '));
    question_text = cleanQuestionStart(question_text);

    // Diagram check
    const hasDiag = DIAG_KEYWORD.test(question_text);

    if (hasDiag) {
      const kwMatch = question_text.match(DIAG_KEYWORD);
      if (kwMatch) {
        const kwEnd = kwMatch.index + kwMatch[0].length;
        const afterKw = question_text.substring(kwEnd);
        const endPunct = afterKw.match(/[\:\?\.]/);
        if (endPunct) {
          question_text = question_text.substring(0, kwEnd + endPunct.index + 1).trim();
        }
      }
    }

    if (!question_text || question_text.length < 5) {
      question_text = `Current Electricity JEE Main PYQ Question #${q}`;
    }

    // Solution
    if (ansIdx !== -1 && ansIdx + 1 < qBlock.length) {
      const solLines = qBlock.slice(ansIdx + 1).filter(l => !isMarksLine(l) && !l.includes('AcadXL'));
      if (solLines.length > 0) {
        solution = cleanPhysicsText(solLines.join('\n'));
      }
    }

    finalQuestions.push({
      q_num: q,
      page: foundPage,
      question_text,
      options,
      question_type: isNumeric ? 'numerical' : 'mcq',
      numeric_answer: isNumeric ? offKey : null,
      tolerance: isNumeric ? 0 : null,
      correct_option: !isNumeric ? offKey : null,
      correct_index: !isNumeric ? ({ 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey] ?? 0) : null,
      marks: 4,
      negative_marks: isNumeric ? 0 : 1,
      hasDiagram: hasDiag,
      image_url: null,
      solution_image_url: null,
      solution
    });
  }

  console.log(`Successfully built all ${finalQuestions.length} questions!`);
  const OUT_JSON = path.resolve(__dirname, 'current_electricity_clean_408_prelim.json');
  fs.writeFileSync(OUT_JSON, JSON.stringify(finalQuestions, null, 2));
  console.log('Saved to', OUT_JSON);
}

buildAll408().catch(console.error);
