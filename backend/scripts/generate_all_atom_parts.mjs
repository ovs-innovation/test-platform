import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));
const bounds = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_question_bounds.json'), 'utf8'));

// Flatten all lines
const lines = [];
for (let p = 1; p <= 151; p++) {
  const pLines = (cache[String(p)] || '').split('\n');
  for (let l = 0; l < pLines.length; l++) {
    lines.push({
      page: p,
      lIdx: l,
      text: pLines[l]
    });
  }
}

function cleanMath(text) {
  if (!text) return '';
  let s = text.trim();
  // Strip question number prefix
  s = s.replace(/^[0-9%#$oaMne]{1,4}[\.\:\;\-]?\s*/i, '');
  // KaTeX conversions
  s = s.replace(/([0-9\.\-]+)\s*x\s*10\^?([0-9\-]+)/gi, '$$$1 \\times 10^{$2}$$');
  s = s.replace(/([0-9\.\-]+)\s*x\s*10\s*([0-9\-]+)/gi, '$$$1 \\times 10^{$2}$$');
  s = s.replace(/\bms~1\b/gi, '$\\text{ms}^{-1}$');
  s = s.replace(/\bms~2\b/gi, '$\\text{ms}^{-2}$');
  s = s.replace(/\bkJmol~1\b/gi, '$\\text{kJ mol}^{-1}$');
  s = s.replace(/\bJmol~1\b/gi, '$\\text{J mol}^{-1}$');
  return s.trim();
}

// Diagram mapping by question number
const DIAGRAM_MAP = {
  57: diagramUrls['q57_diagram'],
  59: diagramUrls['q59_diagram'],
  69: diagramUrls['q69_diagram'],
  71: diagramUrls['q71_diagram'],
  73: diagramUrls['q73_diagram'],
  79: diagramUrls['q79_diagram'],
  87: diagramUrls['q87_diagram'],
  90: diagramUrls['q90_diagram'],
  111: diagramUrls['q111_diagram'],
  127: diagramUrls['q127_diagram'],
  140: diagramUrls['q140_diagram'],
  141: diagramUrls['q141_diagram'],
  143: diagramUrls['q143_diagram'],
  156: diagramUrls['q156_diagram'],
  159: diagramUrls['q159_diagram'],
  162: diagramUrls['q162_diagram'],
  177: diagramUrls['q177_diagram'],
  185: diagramUrls['q185_diagram'],
  194: diagramUrls['q194_diagram'],
  200: diagramUrls['q200_diagram'],
  203: diagramUrls['q203_diagram'],
  208: diagramUrls['q208_diagram'],
  223: diagramUrls['q223_diagram'],
  224: diagramUrls['q224_diagram'],
};

const allProcessedQuestions = [];

for (const b of bounds) {
  const qNum = b.qNum;
  const chunk = lines.slice(b.startLine, b.endLine);

  let marksIdx = -1;
  let answerIdx = -1;
  for (let i = 0; i < chunk.length; i++) {
    if (/\[\s*\d+\s*marks/i.test(chunk[i].text)) marksIdx = i;
    if (/ANSWER\s*:/i.test(chunk[i].text) && answerIdx === -1) answerIdx = i;
  }

  // Exam and marks
  let examStr = 'JEE Main';
  let marks = 4;
  let negativeMarks = 1;
  if (marksIdx !== -1) {
    const mLine = chunk[marksIdx].text;
    const yrMatch = mLine.match(/-\s*([0-9]{4}[^\n\]]*)/);
    if (yrMatch) examStr = `JEE Main ${yrMatch[1].trim()}`;
    if (/no\s*negative|0\s*for\s*a\s*wrong/i.test(mLine)) {
      negativeMarks = 0;
    }
  }

  const rawKey = String(officialKeys[qNum] || '').trim().toUpperCase();
  const isNumerical = /^[0-9]+$/.test(rawKey);
  if (isNumerical) negativeMarks = 0;

  // Question body vs options
  const preMarksLines = (marksIdx !== -1) ? chunk.slice(0, marksIdx) : chunk.slice(0, answerIdx !== -1 ? answerIdx : chunk.length);
  const fullPreText = preMarksLines.map(l => l.text).join('\n');

  let questionText = '';
  let options = [];
  let correctOption = null;
  let numericAnswer = null;

  if (isNumerical) {
    questionText = cleanMath(fullPreText);
    numericAnswer = rawKey;
  } else {
    // MCQ question: extract options (A), (B), (C), (D)
    // Find where options start
    const optSplit = fullPreText.split(/(?=\([A-D]\)|\b[A-D]\))/);
    if (optSplit.length >= 4) {
      questionText = cleanMath(optSplit[0]);
      for (let i = 1; i < optSplit.length; i++) {
        let optStr = optSplit[i].trim();
        // remove (A), (B), etc prefix
        optStr = optStr.replace(/^\(?[A-D]\)?[\s\.\:\-]?/, '').trim();
        if (optStr) options.push(cleanMath(optStr));
      }
    } else {
      // Line-based option extraction
      const qLines = [];
      for (const line of preMarksLines) {
        const t = line.text.trim();
        if (/^\(?[A-D]\)/.test(t)) {
          options.push(cleanMath(t.replace(/^\(?[A-D]\)[\s\.\:\-]*/, '')));
        } else if (options.length === 0) {
          qLines.push(t);
        } else {
          // append to last option
          options[options.length - 1] += ' ' + cleanMath(t);
        }
      }
      questionText = cleanMath(qLines.join(' '));
    }

    // Ensure options array has exactly 4 options
    if (options.length < 4) {
      // Fallback: extract options with regex
      const mOpts = [...fullPreText.matchAll(/\(([A-D])\)\s*([^(\n]+)/g)];
      if (mOpts.length === 4) {
        options = mOpts.map(m => cleanMath(m[2]));
      }
    }

    // Map correct option
    if (rawKey === 'A') correctOption = 0;
    else if (rawKey === 'B') correctOption = 1;
    else if (rawKey === 'C') correctOption = 2;
    else if (rawKey === 'D') correctOption = 3;
    else if (rawKey.includes('A')) correctOption = 0;
    else if (rawKey.includes('B')) correctOption = 1;
    else if (rawKey.includes('C')) correctOption = 2;
    else if (rawKey.includes('D')) correctOption = 3;
    else correctOption = 0;
  }

  // Solution
  let solutionText = '';
  if (answerIdx !== -1) {
    const postAnswerLines = chunk.slice(answerIdx + 1);
    solutionText = postAnswerLines.map(l => l.text).join('\n').trim();
  }
  if (!solutionText || solutionText.length < 5) {
    solutionText = isNumerical
      ? `The correct numerical answer is ${rawKey}.`
      : `The correct option is (${rawKey}).`;
  }

  allProcessedQuestions.push({
    qNum,
    exam: examStr,
    question: questionText,
    options: isNumerical ? [] : options,
    correct_option: correctOption,
    numeric_answer: numericAnswer,
    question_type: isNumerical ? 'numerical' : 'mcq',
    marks,
    negative_marks: negativeMarks,
    difficulty: isNumerical ? 'medium' : 'easy',
    category: 'Chemistry',
    chapter: 'Structure of Atom',
    exam_type: 'JEE',
    image_url: DIAGRAM_MAP[qNum] || null,
    solution_image_url: null,
    solution: cleanMath(solutionText)
  });
}

console.log(`Successfully built all ${allProcessedQuestions.length} question objects.`);
fs.writeFileSync(path.resolve(__dirname, 'atom_all_processed_questions.json'), JSON.stringify(allProcessedQuestions, null, 2));
console.log('Saved atom_all_processed_questions.json');
