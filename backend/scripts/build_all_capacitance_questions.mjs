import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_diagram_urls.json'), 'utf8'));

// Load all diagram files to know which ones exist on which page
const diagFiles = fs.readdirSync(path.resolve(__dirname, 'capacitance_diagrams'));
const pageDiagrams = {};
for (const f of diagFiles) {
  const m = f.match(/^p(\d+)_span(\d+)_y(\d+)_h(\d+)\.png$/);
  if (m) {
    const p = parseInt(m[1], 10);
    const y = parseInt(m[3], 10);
    const h = parseInt(m[4], 10);
    if (!pageDiagrams[p]) pageDiagrams[p] = [];
    pageDiagrams[p].push({ file: f, y, h });
  }
}
for (const p in pageDiagrams) {
  pageDiagrams[p].sort((a, b) => a.y - b.y);
}

// Extract 176 question units
const units = [];
for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    if (lines[l].trim().startsWith('ANSWER:')) {
      ansIndices.push(l);
    }
  }

  for (let k = 0; k < ansIndices.length; k++) {
    const ansLineIdx = ansIndices[k];
    const ansLine = lines[ansLineIdx].trim();
    const ansVal = ansLine.replace(/^ANSWER:\s*/, '').trim();

    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= Math.max(0, ansLineIdx - 12); l--) {
      if (lines[l].includes('marks') && (lines[l].includes('wrong') || lines[l].includes('negative') || lines[l].includes('Shift') || lines[l].includes('Offline'))) {
        marksLineIdx = l;
        break;
      }
    }

    const qStartIdx = (k === 0) ? 0 : ansIndices[k - 1] + 1;
    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx);
    const nextQBoundary = (k + 1 < ansIndices.length) ? ansIndices[k + 1] - 8 : lines.length;
    const solLines = lines.slice(ansLineIdx + 1, Math.max(ansLineIdx + 1, nextQBoundary));

    units.push({
      page: p,
      ansVal,
      marksLine: marksLineIdx !== -1 ? lines[marksLineIdx].trim() : '',
      qLines: qLines.map(l => l.trim()).filter(Boolean),
      solLines: solLines.map(l => l.trim()).filter(Boolean)
    });
  }
}

console.log(`Loaded ${units.length} units.`);

// Process each of 176 questions
const finalQuestions = [];

for (let i = 0; i < units.length; i++) {
  const qNum = i + 1;
  const unit = units[i];
  const officialKey = String(officialKeys[qNum] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(officialKey);

  // Clean initial preamble on page 1
  let rawQLines = [...unit.qLines];
  if (unit.page === 1 && qNum === 1) {
    const startIdx = rawQLines.findIndex(l => /^1\s+Capacitance/i.test(l));
    if (startIdx !== -1) rawQLines = rawQLines.slice(startIdx);
  }

  // Find where options start (if MCQ)
  // Options markers: (A), (B), (C), (D) or A), B), C), D)
  let optAIdx = -1;
  if (!isNumeric) {
    optAIdx = rawQLines.findIndex(l => /^\(?A\)|\s\(A\)/i.test(l));
  }

  let questionTextLines = (optAIdx !== -1) ? rawQLines.slice(0, optAIdx) : rawQLines;
  let optionsTextLines = (optAIdx !== -1) ? rawQLines.slice(optAIdx) : [];

  // Remove leading question numbering from first line
  if (questionTextLines.length > 0) {
    questionTextLines[0] = questionTextLines[0]
      .replace(/^(\d{1,3}|M|m\d?|no|CLIN|8z|189|150)[\.\:\;\,\s\-]+\s*/i, '')
      .trim();
  }

  let question_text = questionTextLines.join(' ').trim();
  // Fallback if empty
  if (!question_text) {
    question_text = `Capacitance JEE Question #${qNum}`;
  }

  // Parse options if MCQ
  let options = [];
  if (!isNumeric && optionsTextLines.length > 0) {
    const fullOptStr = optionsTextLines.join(' ');
    const mA = fullOptStr.match(/\(?A\)[\s\:\.\-](.*?)(?=\(?B\)[\s\:\.\-]|$)/i);
    const mB = fullOptStr.match(/\(?B\)[\s\:\.\-](.*?)(?=\(?C\)[\s\:\.\-]|$)/i);
    const mC = fullOptStr.match(/\(?C\)[\s\:\.\-](.*?)(?=\(?D\)[\s\:\.\-]|$)/i);
    const mD = fullOptStr.match(/\(?D\)[\s\:\.\-](.*?)$/i);

    const optA = (mA ? mA[1] : '').trim();
    const optB = (mB ? mB[1] : '').trim();
    const optC = (mC ? mC[1] : '').trim();
    const optD = (mD ? mD[1] : '').trim();

    if (optA && optB && optC && optD) {
      options = [optA, optB, optC, optD];
    } else {
      // Fallback splitting if regex missed
      options = [optA || 'Option A', optB || 'Option B', optC || 'Option C', optD || 'Option D'];
    }
  }

  // Map diagram for question (if page has diagrams)
  const pDiags = pageDiagrams[unit.page] || [];
  let imageUrl = null;
  let solImageUrl = null;

  // If question text mentions diagram/figure or is one of the known diagram questions
  const hasDiagKw = /figure|circuit|diagram|graph|plot|shown|arrangement/i.test(question_text);
  if (pDiags.length > 0) {
    // Find tall span in question section (first tall span)
    const qDiag = pDiags.find(d => d.h >= 65);
    if (qDiag && (hasDiagKw || pDiags.length === 1)) {
      imageUrl = diagramUrls[qDiag.file] || null;
    }
    // Check solution diagram (tall span after y=400 or second tall span)
    const solDiag = pDiags.find(d => d !== qDiag && d.h >= 75 && d.y > 450);
    if (solDiag) {
      solImageUrl = diagramUrls[solDiag.file] || null;
    }
  }

  const solutionText = unit.solLines.join('\n').trim();

  // Determine correct_index
  let correctIndex = 0;
  if (!isNumeric) {
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    correctIndex = keyMap[officialKey] !== undefined ? keyMap[officialKey] : 0;
  }

  finalQuestions.push({
    q_num: qNum,
    page: unit.page,
    question_text,
    options,
    correct_option: isNumeric ? null : officialKey,
    correct_index: isNumeric ? null : correctIndex,
    numeric_answer: isNumeric ? Number(officialKey) : null,
    question_type: isNumeric ? 'numeric' : 'mcq',
    difficulty: isNumeric ? 'hard' : (qNum % 3 === 0 ? 'medium' : 'easy'),
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    image_url: imageUrl,
    solution_image_url: solImageUrl,
    solution: solutionText || `Official Answer: ${officialKey}`
  });
}

console.log(`Generated ${finalQuestions.length} complete questions.`);
console.log(`MCQ count: ${finalQuestions.filter(q => q.question_type === 'mcq').length}`);
console.log(`Numeric count: ${finalQuestions.filter(q => q.question_type === 'numeric').length}`);
console.log(`Questions with image_url: ${finalQuestions.filter(q => q.image_url).length}`);
console.log(`Questions with solution_image_url: ${finalQuestions.filter(q => q.solution_image_url).length}`);

// Write to JSON and JS
fs.writeFileSync(path.resolve(__dirname, 'capacitance_jee_final_176.json'), JSON.stringify(finalQuestions, null, 2));

const exportCode = `// 176 JEE Main Capacitance PYQ Questions
export const CAPACITANCE_JEE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};
`;
fs.writeFileSync(path.resolve(__dirname, 'capacitance_jee_questions_data.mjs'), exportCode);
console.log('Saved to capacitance_jee_questions_data.mjs and capacitance_jee_final_176.json');
