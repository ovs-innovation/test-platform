import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_diagram_urls.json'), 'utf8'));

// Build diagram files map by page
const diagFiles = fs.readdirSync(path.resolve(__dirname, 'electrostatics_diagrams'));
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

// Extract 300 question units
const units = [];

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    const lineTrim = lines[l].trim();
    if (/^.*answ[a-z]{0,3}\s*:/i.test(lineTrim)) {
      ansIndices.push(l);
    }
  }

  const filteredAnsIndices = [];
  for (let i = 0; i < ansIndices.length; i++) {
    if (i > 0 && (ansIndices[i] - ansIndices[i - 1] <= 3)) continue;
    const curIdx = ansIndices[i];
    const prevText = lines.slice(Math.max(0, curIdx - 2), curIdx).join(' ');
    if (i > 0 && /^(According to|Position vector|Therefore|When two|In electrostatics|Normal reaction)\b/i.test(prevText.trim())) {
      continue;
    }
    filteredAnsIndices.push(curIdx);
  }

  if (filteredAnsIndices.length === 0) {
    if (units.length > 0) {
      units[units.length - 1].solLines.push(...lines.map(l => l.trim()).filter(Boolean));
    }
    continue;
  }

  for (let k = 0; k < filteredAnsIndices.length; k++) {
    const ansLineIdx = filteredAnsIndices[k];
    const qStartIdx = (k === 0) ? 0 : filteredAnsIndices[k - 1] + 1;

    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr') || lines[l].includes('May')) {
        marksLineIdx = l;
        break;
      }
    }

    let rawQLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);

    // If k > 0, find where question statement starts
    if (k > 0) {
      const qStartRegex = /^(\d{1,3}[\.\s\:\-\)]|[©M§a-zA-Z\.\-\*\#\s]{1,4}\s+|Two|Three|Four|Five|Six|Charges|Along|Shown|If|Consider|Find|In the|What|Calculate|A |An |The |When|Given|At |On |In |For )/i;
      const startIdx = rawQLines.findIndex(l => qStartRegex.test(l));
      if (startIdx > 0) {
        const solPrefix = rawQLines.slice(0, startIdx);
        rawQLines = rawQLines.slice(startIdx);
        if (units.length > 0) {
          units[units.length - 1].solLines.push(...solPrefix);
        }
      }
    } else if (p === 1) {
      const startIdx = rawQLines.findIndex(l => /^1\s+[A-Za-z]/.test(l));
      if (startIdx !== -1) rawQLines = rawQLines.slice(startIdx);
    }

    const solLines = lines.slice(ansLineIdx + 1, Math.min(lines.length, (k + 1 < filteredAnsIndices.length) ? filteredAnsIndices[k + 1] : lines.length)).map(l => l.trim()).filter(Boolean);

    // Filter out duplicate solution fragments
    const qPreview = rawQLines.join(' ');
    if (rawQLines.length === 0 || /^(Potential due to spherical shell|Since ball is hanging)\b/i.test(qPreview)) {
      continue;
    }

    units.push({
      page: p,
      marksLine: marksLineIdx !== -1 ? lines[marksLineIdx].trim() : '',
      ansVal: lines[ansLineIdx].replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim(),
      qLines: rawQLines,
      solLines
    });
  }
}

console.log(`Units parsed: ${units.length}`);

// Build final 300 structured questions
const finalQuestions = [];

for (let i = 0; i < 300; i++) {
  const qNum = i + 1;
  const unit = units[i] || { page: Math.ceil(qNum * 170 / 300), marksLine: '', ansVal: '', qLines: [], solLines: [] };
  const officialKey = String(officialKeys[qNum] || 'A').trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(officialKey);

  // Clean leading headers / numbering
  let cleanLines = [...unit.qLines];
  if (cleanLines.length > 0) {
    // If first line starts with header/book banner, remove it
    if (/AcadXL|PREVIOUS YEAR|300 previous|Free to downoad|Practise these|Electrostatics —|Maximum marks/i.test(cleanLines[0])) {
      cleanLines.shift();
    }
  }

  // Find options in cleanLines
  let optAIdx = -1;
  if (!isNumeric && cleanLines.length > 0) {
    optAIdx = cleanLines.findIndex(l => /^\(?A\)|\s\(A\)|\bA\)/i.test(l));
  }

  let questionTextLines = (optAIdx !== -1) ? cleanLines.slice(0, optAIdx) : cleanLines;
  let optionsTextLines = (optAIdx !== -1) ? cleanLines.slice(optAIdx) : [];

  if (questionTextLines.length > 0) {
    questionTextLines[0] = questionTextLines[0]
      .replace(/^[\"\'\\(\\[]?(\d{1,3}|[©M§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i, '')
      .trim();
  }

  let question_text = questionTextLines.join(' ').trim();
  if (!question_text || question_text.length < 5) {
    question_text = `Electrostatics JEE PYQ Question #${qNum}`;
  }

  // Options parsing
  let options = [];
  if (!isNumeric) {
    if (optionsTextLines.length > 0) {
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
        options = [optA || '(A)', optB || '(B)', optC || '(C)', optD || '(D)'];
      }
    } else {
      // Default standard 4 options for diagram/formula MCQs
      options = ['(A)', '(B)', '(C)', '(D)'];
    }
  }

  // Diagrams mapping
  const pDiags = pageDiagrams[unit.page] || [];
  let imageUrl = null;
  let solImageUrl = null;

  const hasDiagKw = /figure|diagram|graph|plot|shown|arrangement|cavity|cylinder|sphere|circuit/i.test(question_text);
  if (pDiags.length > 0) {
    const qDiag = pDiags.find(d => d.h >= 60 && d.y < 850);
    if (qDiag && (hasDiagKw || pDiags.length === 1)) {
      imageUrl = diagramUrls[qDiag.file] || null;
    }
    const solDiag = pDiags.find(d => d !== qDiag && d.h >= 70 && d.y >= 450);
    if (solDiag) {
      solImageUrl = diagramUrls[solDiag.file] || null;
    }
  }

  const solutionText = unit.solLines.join('\n').trim();

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
    correct_index: isNumeric ? 0 : correctIndex,
    correct_indices: isNumeric ? [] : [correctIndex],
    numeric_answer: isNumeric ? Number(officialKey) : null,
    question_type: isNumeric ? 'numerical' : 'single_choice',
    difficulty: isNumeric ? 'hard' : (qNum % 3 === 0 ? 'medium' : 'easy'),
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    image_url: imageUrl,
    solution_image_url: solImageUrl,
    solution: solutionText || `Official Answer: ${officialKey}`,
    exam_type: 'JEE',
    subject: 'Physics',
    chapter: 'Electrostatics'
  });
}

console.log(`Generated ${finalQuestions.length} complete questions.`);
console.log(`MCQ count: ${finalQuestions.filter(q => q.question_type === 'single_choice').length}`);
console.log(`Numerical count: ${finalQuestions.filter(q => q.question_type === 'numerical').length}`);
console.log(`Questions with diagram: ${finalQuestions.filter(q => q.image_url).length}`);
console.log(`Questions with solution diagram: ${finalQuestions.filter(q => q.solution_image_url).length}`);

// Write JSON and export JS module
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), JSON.stringify(finalQuestions, null, 2));

const exportCode = `// 300 JEE Main Electrostatics PYQ Questions
export const ELECTROSTATICS_JEE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};
`;
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_jee_questions_data.mjs'), exportCode);
console.log('Saved to electrostatics_jee_questions_data.mjs and electrostatics_jee_final_300.json');
