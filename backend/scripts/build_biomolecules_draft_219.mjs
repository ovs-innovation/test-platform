import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_lines_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_official_key.json'), 'utf8'));
const qHeaders = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_q_headers.json'), 'utf8'));

// 12 special headers overrides from earlier audit
const SPECIAL_MATCHES = {
  41: { page: 16, lineIdx: 10 },
  51: { page: 25, lineIdx: 0 },
  91: { page: 45, lineIdx: 0 },
  101: { page: 49, lineIdx: 0 },
  109: { page: 53, lineIdx: 0 },
  110: { page: 54, lineIdx: 0 },
  111: { page: 54, lineIdx: 7 },
  112: { page: 55, lineIdx: 0 },
  115: { page: 57, lineIdx: 0 },
  116: { page: 58, lineIdx: 0 },
  117: { page: 59, lineIdx: 0 },
  118: { page: 59, lineIdx: 13 },
  119: { page: 60, lineIdx: 0 },
  128: { page: 68, lineIdx: 0 },
  139: { page: 79, lineIdx: 0 },
  141: { page: 81, lineIdx: 0 },
  179: { page: 108, lineIdx: 0 },
  211: { page: 133, lineIdx: 0 },
  217: { page: 138, lineIdx: 0 }
};

// Merge all 219 headers
const allHeaders = {};
for (let q = 1; q <= 219; q++) {
  if (SPECIAL_MATCHES[q]) {
    const p = SPECIAL_MATCHES[q].page;
    const lIdx = SPECIAL_MATCHES[q].lineIdx;
    const l = linesCache[p]?.lines[lIdx];
    allHeaders[q] = { page: p, lineIdx: lIdx, top: l?.top || 0, text: l?.text || '' };
  } else if (qHeaders[q]) {
    allHeaders[q] = qHeaders[q];
  }
}

console.log(`Starting segmentation for all ${Object.keys(allHeaders).length} questions...`);

const draftQuestions = [];

for (let q = 1; q <= 219; q++) {
  const cur = allHeaders[q];
  const next = allHeaders[q + 1];

  if (!cur) {
    console.error(`FATAL: Missing header for Q${q}!`);
    continue;
  }

  // Collect all lines for Q
  let qLines = [];
  if (!next || next.page === cur.page) {
    const endIdx = next ? next.lineIdx : (linesCache[cur.page]?.lines.length || 0);
    qLines = (linesCache[cur.page]?.lines || []).slice(cur.lineIdx, endIdx);
  } else {
    qLines = (linesCache[cur.page]?.lines || []).slice(cur.lineIdx);
    for (let p = cur.page + 1; p < next.page; p++) {
      qLines = qLines.concat(linesCache[p]?.lines || []);
    }
    qLines = qLines.concat((linesCache[next.page]?.lines || []).slice(0, next.lineIdx));
  }

  // Find marks line and answer line
  let marksLineIdx = -1;
  let ansLineIdx = -1;

  for (let i = 0; i < qLines.length; i++) {
    const txt = qLines[i].text.trim();
    if (marksLineIdx === -1 && (/marks.*wrong|marks.*answer|marks\]|no negative marking/i.test(txt))) {
      marksLineIdx = i;
    }
    if (ansLineIdx === -1 && /^ANSWER\s*[:\.\-]/i.test(txt)) {
      ansLineIdx = i;
    }
  }

  // Identify exam year
  let examYear = 'JEE Main';
  if (marksLineIdx !== -1) {
    const mMatch = qLines[marksLineIdx].text.match(/(?:19\d\d|20\d\d)(?:\s*\([^\)]+\))?/);
    if (mMatch) examYear = mMatch[0];
  }

  // Check if numerical integer question
  const corrAns = String(officialKey[q] || '').trim();
  const isNumerical = /^\d+$/.test(corrAns);

  // Extract Question text and Options
  const preMarks = marksLineIdx !== -1 ? qLines.slice(0, marksLineIdx) : (ansLineIdx !== -1 ? qLines.slice(0, ansLineIdx) : qLines.slice(0, 1));

  let rawStatementLines = [];
  let rawOptionLines = [];

  if (isNumerical) {
    rawStatementLines = preMarks.map(l => l.text);
  } else {
    // Find where options start
    let optStart = -1;
    for (let i = 0; i < preMarks.length; i++) {
      const txt = preMarks[i].text.trim();
      if (i > 0 && (/^\(?[A-Da-d1-4][\.\)]/i.test(txt) || /^\(A\)\s/i.test(txt) || /^[A-D]\s+[A-Za-z0-9]/i.test(txt))) {
        optStart = i;
        break;
      }
    }

    if (optStart !== -1) {
      rawStatementLines = preMarks.slice(0, optStart).map(l => l.text);
      rawOptionLines = preMarks.slice(optStart).map(l => l.text);
    } else {
      rawStatementLines = preMarks.map(l => l.text);
    }
  }

  // Solution lines
  let rawSolLines = [];
  if (ansLineIdx !== -1) {
    rawSolLines = qLines.slice(ansLineIdx + 1).map(l => l.text);
  }

  // Clean Question Statement
  let questionStatement = rawStatementLines.join(' ')
    .replace(/^(?:Q\.?\s*)?[\d\%\w]{1,4}[\.\%\)\:\-\s]*/i, '')
    .trim();

  // If question statement is empty or too short, fallback to full text before marks
  if (!questionStatement && preMarks.length > 0) {
    questionStatement = preMarks.map(l => l.text).join(' ').replace(/^(?:Q\.?\s*)?[\d\%\w]{1,4}[\.\%\)\:\-\s]*/i, '').trim();
  }

  // Parse Options
  let parsedOptions = [];
  if (!isNumerical) {
    const optText = rawOptionLines.join(' ');
    // Split into (A), (B), (C), (D)
    const tokens = optText.split(/(?=\s*(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)]|®|©|\(P\)|\(o\)|\(8\)|\[[A-D]\])\s*)/);
    const cleanedOpts = [];
    for (const t of tokens) {
      const c = t.replace(/^\s*(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)]|®|©|\(P\)|\(o\)|\(8\)|\[[A-D]\])\s*/, '').trim();
      if (c) cleanedOpts.push(c);
    }

    if (cleanedOpts.length === 4) {
      parsedOptions = cleanedOpts;
    } else if (cleanedOpts.length > 4) {
      parsedOptions = cleanedOpts.slice(0, 4);
    } else {
      // Fallback: fill up to 4
      while (cleanedOpts.length < 4) {
        cleanedOpts.push(`Option ${String.fromCharCode(65 + cleanedOpts.length)}`);
      }
      parsedOptions = cleanedOpts.slice(0, 4);
    }
  }

  // Solution explanation
  let solutionText = rawSolLines.join('\n').trim();
  if (!solutionText || /no solution (available|stored)/i.test(solutionText)) {
    solutionText = `According to the official JEE answer key, the correct answer is ${corrAns}.`;
  }

  // Diagram detection and crop coordinates
  const fullQText = qLines.map(l => l.text).join('\n');
  const hasQuestionDiagram = /Match List|structures? given below|following (reactions?|isomeric forms?|pyranose|sugar|compound)|possible structure of|predominant form|cyclic hemiacetal/i.test(questionStatement) ||
    rawOptionLines.some(l => /^\s*\(?[A-D]\)\s*$/i.test(l.trim()) || /^\s*\(A\)\s+\(B\)\s*$/i.test(l.trim())) ||
    rawOptionLines.length === 0 && !isNumerical;

  const hasSolutionDiagram = (rawSolLines.length > 2 && /CH,OH|CH2OH|CH_3|COOH|NH_2|—>|-->|\\rightarrow|Hydrolysis|maltose|lactose|sucrose|pyranose|furanose|anomer|peptide/i.test(solutionText)) ||
    rawSolLines.some(l => /[\|\\\/]{2,}/.test(l));

  // Compute crop bounds
  let qCrop = null;
  if (hasQuestionDiagram) {
    const startTop = Math.max(10, cur.top - 15);
    const endTop = marksLineIdx !== -1 ? qLines[marksLineIdx].top + 10 : (ansLineIdx !== -1 ? qLines[ansLineIdx].top : startTop + 400);
    const height = Math.max(150, endTop - startTop);
    qCrop = {
      page: cur.page,
      top: startTop,
      height: Math.min(height, 1200)
    };
  }

  let solCrop = null;
  if (hasSolutionDiagram && ansLineIdx !== -1 && ansLineIdx < qLines.length - 1) {
    const ansTop = qLines[ansLineIdx].top + 25;
    const nextTop = next && next.page === cur.page ? next.top - 15 : 1500;
    const height = Math.max(150, nextTop - ansTop);
    solCrop = {
      page: cur.page,
      top: ansTop,
      height: Math.min(height, 800)
    };
  }

  draftQuestions.push({
    question_number: q,
    page: cur.page,
    question_type: isNumerical ? 'numerical' : 'mcq',
    question_text: questionStatement,
    options: isNumerical ? [] : parsedOptions,
    correct_option: corrAns,
    marks: 4,
    negative_marks: isNumerical ? 0 : 1,
    difficulty: 'medium',
    exam_type: 'JEE',
    subject: 'Chemistry',
    category: 'Chemistry',
    chapter: 'Biomolecules',
    chapter_id: 133,
    exam_year: examYear,
    solution: solutionText,
    hasQuestionDiagram,
    hasSolutionDiagram,
    qCrop,
    solCrop
  });
}

console.log(`Draft built for ${draftQuestions.length}/219 questions.`);
const mcqCount = draftQuestions.filter(d => d.question_type === 'mcq').length;
const numCount = draftQuestions.filter(d => d.question_type === 'numerical').length;
console.log(`Breakdown: ${mcqCount} MCQs, ${numCount} Numerical questions.`);
const qDiagCount = draftQuestions.filter(d => d.hasQuestionDiagram).length;
const solDiagCount = draftQuestions.filter(d => d.hasSolutionDiagram).length;
console.log(`Diagrams: ${qDiagCount} question diagrams, ${solDiagCount} solution diagrams.`);

fs.writeFileSync(path.join(__dirname, 'biomolecules_draft_219.json'), JSON.stringify(draftQuestions, null, 2));
console.log('Saved biomolecules_draft_219.json.');
