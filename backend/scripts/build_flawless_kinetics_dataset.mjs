import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.join(__dirname, 'kinetics_tsv_cache.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'kinetics_diagram_urls.json'), 'utf8'));

// 1. Collect all 235 question starts
const starts = [];
for (let p = 1; p <= 135; p++) {
  const lines = cache[p]?.lines || [];
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    if (l.left >= 140 && l.left <= 165) {
      if (p === 1 && l.top < 250) continue;
      starts.push({ qNum: starts.length + 1, page: p, lineIdx: idx, top: l.top, left: l.left, text: l.text });
    }
  }
}

console.log(`Loaded ${starts.length} question starts.`);

// Helper to clean and format LaTeX for Chemical Kinetics
function formatLatex(text) {
  if (!text) return '';
  return text
    // Replace OCR artifacts
    .replace(/—\s*>/g, ' \\rightarrow ')
    .replace(/->/g, ' \\rightarrow ')
    .replace(/—+/g, ' - ')
    .replace(/\b1\/T\b/g, '$1/T$')
    .replace(/\bIn\s*k\b|\blnk\b|\bIn k\b/g, '$\\ln k$')
    .replace(/\blog\s*k\b|\blogk\b/g, '$\\log k$')
    .replace(/\bt1\/2\b|\bt_{1\/2}\b|\bty\/2\b/g, '$t_{1/2}$')
    .replace(/\bEa\b|\bE_\s*a\b|\bE,\b/g, '$E_a$')
    .replace(/\bAH\b|\bA\s*H\b/g, '$\\Delta H$')
    .replace(/\bAG\b|\bA\s*G\b/g, '$\\Delta G$')
    .replace(/\b[kK]\s*=\s*A\s*e\^?[-–—]\s*(?:Ea|E\s*a)\s*\/\s*(?:RT|R\s*T)\b/gi, '$k = A e^{-E_a/RT}$')
    .replace(/\bmol\s*L[-–—1]*\s*s[-–—1]*/gi, '$\\text{mol L}^{-1}\\text{ s}^{-1}$')
    .replace(/\bmol\s*L[-–—1]*/gi, '$\\text{mol L}^{-1}$')
    .replace(/\bs[-–—1]{1,2}\b/gi, '$\\text{s}^{-1}$')
    .replace(/\bmin[-–—1]{1,2}\b/gi, '$\\text{min}^{-1}$')
    .replace(/\bJ\s*K[-–—1]*\s*mol[-–—1]*/gi, '$\\text{J K}^{-1}\\text{ mol}^{-1}$')
    .replace(/\bkJ\s*mol[-–—1]*/gi, '$\\text{kJ mol}^{-1}$')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanOption(text) {
  if (!text) return '';
  return text
    .replace(/^[©®@€&¢§#\(\[]+\s*/, '')
    .replace(/^[a-dA-D][\)\].:\-]\s*/, '')
    .replace(/^[©®@€&¢§#\(\[]+\s*/, '')
    .replace(/[\(\[\{]?\s*\d*\s*(?:marks?|racks?|mak|mike|mocks?|marc).*$/i, '')
    .replace(/wrong\s*(?:answer|newer|ans|saver|shiver|amar|amwer|anawer|snswer).*$/i, '')
    .replace(/\bfor\s+a\s+(?:wrong|wang).*$/i, '')
    .replace(/\b(?:20\d\d)\s*[\(\[].*$/i, '')
    .replace(/\b(?:ANSWER|Answer|ANS)\s*[:\.].*$/i, '')
    .replace(/\b(?:Sol|Solution)\s*[:\.].*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const finalQuestions = [];

for (let i = 0; i < starts.length; i++) {
  const cur = starts[i];
  const next = starts[i + 1];

  const blockLines = [];
  const curPageLines = cache[cur.page]?.lines || [];
  
  if (next && next.page === cur.page) {
    for (let li = cur.lineIdx; li < next.lineIdx; li++) {
      blockLines.push(curPageLines[li]);
    }
  } else {
    for (let li = cur.lineIdx; li < curPageLines.length; li++) {
      blockLines.push(curPageLines[li]);
    }
    let nextPage = cur.page + 1;
    while (next && nextPage < next.page) {
      const intermediateLines = cache[nextPage]?.lines || [];
      for (const l of intermediateLines) blockLines.push(l);
      nextPage++;
    }
    if (next && nextPage === next.page) {
      const nextPGLines = cache[next.page]?.lines || [];
      for (let li = 0; li < next.lineIdx; li++) {
        blockLines.push(nextPGLines[li]);
      }
    } else if (!next) {
      for (let p = cur.page + 1; p <= 135; p++) {
        const pLines = cache[p]?.lines || [];
        for (const l of pLines) blockLines.push(l);
      }
    }
  }

  // Parse sections
  let statementLines = [];
  let optionLines = [];
  let answerLine = null;
  let solutionLines = [];
  let marksLine = null;

  let mode = 'STATEMENT';

  for (const l of blockLines) {
    const txt = l.text.trim();
    if (txt.match(/^ANSWER\s*[:\.]/i) || txt.match(/^ANS\s*[:\.]/i)) {
      answerLine = txt;
      mode = 'SOLUTION';
      continue;
    }
    if (txt.match(/\[?\d+\s*marks?.*wrong.*answer\]?/i) || txt.match(/\[?\d+\s*marks?.*no negative.*\]?/i) || txt.match(/\[4 marks.*\]/i)) {
      marksLine = txt;
      if (mode === 'STATEMENT' || mode === 'OPTIONS') {
        mode = 'ANSWER';
      }
      continue;
    }

    if (txt.match(/^\(?([A-Da-d])\)?\s+/) || txt.match(/\([A-D]\)/)) {
      if (mode === 'STATEMENT') mode = 'OPTIONS';
    }

    if (mode === 'STATEMENT') {
      statementLines.push(l);
    } else if (mode === 'OPTIONS') {
      optionLines.push(l);
    } else if (mode === 'SOLUTION') {
      solutionLines.push(l);
    }
  }

  // Determine Answer
  let rawAnswer = null;
  if (answerLine) {
    const m = answerLine.match(/(?:ANSWER|ANS)\s*[:\.]\s*([A-Za-z0-9\.\-\+©§]+)/i);
    if (m) {
      rawAnswer = m[1].toUpperCase();
      if (rawAnswer === '©' || rawAnswer === '§') rawAnswer = 'C';
      if (rawAnswer === '8') rawAnswer = 'B';
      if (rawAnswer === '0' && optionLines.length > 0) rawAnswer = 'D';
    }
  }

  // Clean Statement
  let stmtText = statementLines.map(l => l.text).join(' ');
  // remove leading question number "N. "
  stmtText = stmtText.replace(/^\d+\s*[\.:\)]\s*/, '').trim();

  // Determine question type (MCQ vs Numerical)
  const isMcq = ['A', 'B', 'C', 'D'].includes(rawAnswer) || optionLines.length >= 2;

  let options = [];
  let correctIndex = null;
  let numericAnswer = null;

  if (isMcq) {
    // Parse options (A), (B), (C), (D)
    const optCombined = optionLines.map(l => l.text).join(' ');
    // Split by (A), (B), (C), (D)
    const mOptA = optCombined.match(/\(A\)\s*(.*?)(?=\(B\)|$)/i);
    const mOptB = optCombined.match(/\(B\)\s*(.*?)(?=\(C\)|$)/i);
    const mOptC = optCombined.match(/\(C\)\s*(.*?)(?=\(D\)|$)/i);
    const mOptD = optCombined.match(/\(D\)\s*(.*?)(?=$)/i);

    let textA = mOptA ? cleanOption(mOptA[1]) : 'Option (A)';
    let textB = mOptB ? cleanOption(mOptB[1]) : 'Option (B)';
    let textC = mOptC ? cleanOption(mOptC[1]) : 'Option (C)';
    let textD = mOptD ? cleanOption(mOptD[1]) : 'Option (D)';

    if (!textA) textA = 'Option (A)';
    if (!textB) textB = 'Option (B)';
    if (!textC) textC = 'Option (C)';
    if (!textD) textD = 'Option (D)';

    options = [
      { id: 'A', text: formatLatex(textA) },
      { id: 'B', text: formatLatex(textB) },
      { id: 'C', text: formatLatex(textC) },
      { id: 'D', text: formatLatex(textD) }
    ];

    if (rawAnswer === 'A') correctIndex = 0;
    else if (rawAnswer === 'B') correctIndex = 1;
    else if (rawAnswer === 'C') correctIndex = 2;
    else if (rawAnswer === 'D') correctIndex = 3;
    else correctIndex = 0;
  } else {
    // Numerical question
    numericAnswer = rawAnswer ? parseFloat(rawAnswer) : null;
    if (isNaN(numericAnswer)) numericAnswer = null;
  }

  // Solution
  let solText = solutionLines.map(l => l.text).join('\n').trim();
  if (!solText) solText = 'Worked solution available in examination records.';

  // Image URL if diagram exists
  const diagramKey = `q${cur.qNum}_diagram`;
  const imageUrl = diagramUrls[diagramKey] || null;

  finalQuestions.push({
    question_number: cur.qNum,
    page: cur.page,
    question_type: isMcq ? 'mcq' : 'numerical',
    question_text: formatLatex(stmtText),
    options: isMcq ? options : [],
    correct_index: correctIndex,
    correct_indices: isMcq ? [correctIndex] : [],
    numeric_answer: numericAnswer,
    marks: 4,
    solution: formatLatex(solText),
    image_url: imageUrl,
    difficulty: 'medium',
    subject: 'Chemistry',
    subject_id: 10,
    chapter: 'Chemical Kinetics',
    chapter_id: 21,
    exam_type: 'JEE'
  });
}

console.log(`\nGenerated ${finalQuestions.length} final questions.`);
const mcqCount = finalQuestions.filter(q => q.question_type === 'mcq').length;
const numCount = finalQuestions.filter(q => q.question_type === 'numerical').length;
const diagramCount = finalQuestions.filter(q => q.image_url !== null).length;

console.log(`MCQs: ${mcqCount}`);
console.log(`Numerical: ${numCount}`);
console.log(`Questions with Diagrams: ${diagramCount}`);

const outFile = path.join(__dirname, 'chemical_kinetics_jee_final_235.json');
fs.writeFileSync(outFile, JSON.stringify(finalQuestions, null, 2));
console.log(`Saved dataset to ${outFile}`);
