import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const mapped = JSON.parse(fs.readFileSync('./backend/scripts/mapped_305_boundaries.json', 'utf8'));
const ansKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key.json', 'utf8'));

// Build page lookup
const pageMap = {};
for (const p of pages) {
  // Sort lines by Y coordinate
  const linesWithCoords = p.lines.map((l, idx) => {
    const words = Array.isArray(l.Words) ? l.Words : (l.Words ? [l.Words] : []);
    const y = words.length > 0 ? words[0].Y : 0;
    const x = words.length > 0 ? words[0].X : 0;
    return {
      lineIdx: idx,
      text: (typeof l === 'string' ? l : l.Text).trim(),
      words,
      x,
      y
    };
  });
  pageMap[p.page] = linesWithCoords;
}

const extracted = [];

for (let q = 1; q <= 305; q++) {
  const m = mapped[q - 1];
  const expectedAns = ansKey[q];
  const isMcq = ['A', 'B', 'C', 'D'].includes(String(expectedAns).toUpperCase());
  
  const pageLines = pageMap[m.page];
  const ansIdx = m.ansLineIdx;

  // Question start
  let startIdx = 0;
  if (q > 1 && mapped[q - 2].page === m.page) {
    const prevAns = mapped[q - 2].ansLineIdx;
    for (let i = prevAns + 1; i < ansIdx; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q}\\s*[\\.\\)]`, 'i').test(pageLines[i].text)) {
        startIdx = i;
        break;
      }
    }
    if (startIdx === 0) startIdx = prevAns + 1;
  } else {
    for (let i = 0; i < ansIdx; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q}\\s*[\\.\\)]`, 'i').test(pageLines[i].text)) {
        startIdx = i;
        break;
      }
    }
  }

  // Question end
  let endIdx = pageLines.length;
  if (q < 305 && mapped[q].page === m.page) {
    for (let i = ansIdx + 1; i < pageLines.length; i++) {
      if (new RegExp(`^\\s*(?:•\\s*)?${q + 1}\\s*[\\.\\)]`, 'i').test(pageLines[i].text)) {
        endIdx = i;
        break;
      }
    }
  }

  const qLines = pageLines.slice(startIdx, ansIdx);
  const solLines = pageLines.slice(ansIdx + 1, endIdx);

  // Separate question text from options and marks line
  let qTextLines = [];
  let optALines = [], optBLines = [], optCLines = [], optDLines = [];
  let marksLine = '';
  let inOptions = false;
  let currentOpt = null;

  for (const line of qLines) {
    const t = line.text;
    if (/\b(?:4\s*marks|marks[,\.]?\s*[\-—–]?[1i]?\s*for)\b/i.test(t)) {
      marksLine = t;
      continue;
    }

    // Check for option tags
    if (isMcq) {
      if (/^\(A\)/i.test(t)) {
        inOptions = true;
        currentOpt = 'A';
        optALines.push(t.replace(/^\(A\)\s*/i, ''));
        continue;
      } else if (/^\(B\)/i.test(t)) {
        inOptions = true;
        currentOpt = 'B';
        optBLines.push(t.replace(/^\(B\)\s*/i, ''));
        continue;
      } else if (/^\(C\)/i.test(t)) {
        inOptions = true;
        currentOpt = 'C';
        optCLines.push(t.replace(/^\(C\)\s*/i, ''));
        continue;
      } else if (/^\(D\)/i.test(t)) {
        inOptions = true;
        currentOpt = 'D';
        optDLines.push(t.replace(/^\(D\)\s*/i, ''));
        continue;
      }
    }

    if (inOptions && currentOpt) {
      if (currentOpt === 'A') optALines.push(t);
      else if (currentOpt === 'B') optBLines.push(t);
      else if (currentOpt === 'C') optCLines.push(t);
      else if (currentOpt === 'D') optDLines.push(t);
    } else {
      qTextLines.push(t);
    }
  }

  // Also check solution lines for options (sometimes right column OCR lands in solLines)
  const realSolLines = [];
  for (const line of solLines) {
    const t = line.text;
    if (isMcq) {
      if (/^\(B\)/i.test(t) && optBLines.length === 0) {
        optBLines.push(t.replace(/^\(B\)\s*/i, ''));
        continue;
      } else if (/^\(D\)/i.test(t) && optDLines.length === 0) {
        optDLines.push(t.replace(/^\(D\)\s*/i, ''));
        continue;
      }
    }
    realSolLines.push(t);
  }

  // Clean question text: strip leading question number
  let rawQText = qTextLines.join(' ')
    .replace(new RegExp(`^\\s*(?:•\\s*)?${q}\\s*[\\.\\)]\\s*`, 'i'), '')
    .trim();

  // If question text is empty or header junk, clean it
  rawQText = rawQText
    .replace(/^AcadXLT?["']?\s*/i, '')
    .replace(/^PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[^\.]*\.\s*/i, '')
    .replace(/^305 previous-year questions[^\.]*\.\s*/i, '')
    .replace(/^Free to download[^\.]*\.\s*/i, '')
    .replace(/^Practise these online[^\.]*\.\s*/i, '')
    .replace(/^ACADXL\s+EDUCATION WITH DISCIPLINE\s*/i, '')
    .replace(/^Vector Algebra\s*—\s*JEE Main PYQ Bank[^\n]*\s*/i, '')
    .replace(/^Time: \d+ minutes[^\n]*\s*/i, '')
    .trim();

  extracted.push({
    q_num: q,
    page: m.page,
    question_type: isMcq ? 'mcq' : 'numerical',
    question_text: rawQText,
    optA: optALines.join(' ').trim(),
    optB: optBLines.join(' ').trim(),
    optC: optCLines.join(' ').trim(),
    optD: optDLines.join(' ').trim(),
    expectedAns: expectedAns,
    marksLine,
    solution: realSolLines.join('\n').trim()
  });
}

console.log('Successfully extracted all 305 questions!');
fs.writeFileSync('./backend/scripts/extracted_305_raw.json', JSON.stringify(extracted, null, 2), 'utf8');

// Sample check
for (let q = 1; q <= 5; q++) {
  console.log(`\n--- Q${q} ---`);
  console.log('Text:', extracted[q - 1].question_text);
  console.log('Options:', [extracted[q - 1].optA, extracted[q - 1].optB, extracted[q - 1].optC, extracted[q - 1].optD]);
  console.log('Answer:', extracted[q - 1].expectedAns);
  console.log('Sol:', extracted[q - 1].solution.slice(0, 100));
}

