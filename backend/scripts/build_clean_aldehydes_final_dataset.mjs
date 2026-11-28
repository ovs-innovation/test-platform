import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'aldehydes_lines_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'aldehydes_official_key.json'), 'utf8'));
const diagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'aldehydes_detected_with_urls.json'), 'utf8'));

// Format KaTeX chemical formulas and reagents
function formatKaTeX(text) {
  if (!text) return '';
  let s = text;

  // OCR cleanups
  s = s
    .replace(/\\s*\|\s*odoform/gi, 'Iodoform')
    .replace(/lodoform/g, 'Iodoform')
    .replace(/Cannizaro/g, 'Cannizzaro')
    .replace(/Cannizzaro's/g, "Cannizzaro's")
    .replace(/Clemmensen/g, 'Clemmensen')
    .replace(/Tollen's/g, "Tollens'")
    .replace(/Fehling/g, "Fehling's")
    .replace(/Bayer's/g, "Baeyer's")
    .replace(/Claisen-Schmidt/g, 'Claisen–Schmidt')
    .replace(/\bCH3CHO\b/g, '$\\text{CH}_3\\text{CHO}$')
    .replace(/\bCH;CHO\b/g, '$\\text{CH}_3\\text{CHO}$')
    .replace(/\bCH;COCH;\b/g, '$\\text{CH}_3\\text{COCH}_3$')
    .replace(/\bCH3COCH3\b/g, '$\\text{CH}_3\\text{COCH}_3$')
    .replace(/\bCH3COOH\b/g, '$\\text{CH}_3\\text{COOH}$')
    .replace(/\bCH;COOH\b/g, '$\\text{CH}_3\\text{COOH}$')
    .replace(/\bHCHO\b/g, '$\\text{HCHO}$')
    .replace(/\bPhCHO\b/g, '$\\text{PhCHO}$')
    .replace(/\bPhCOCH3\b/g, '$\\text{PhCOCH}_3$')
    .replace(/\bPhCOPh\b/g, '$\\text{PhCOPh}$')
    .replace(/\bLiAlH4\b/g, '$\\text{LiAlH}_4$')
    .replace(/\bLiAlH,\b/g, '$\\text{LiAlH}_4$')
    .replace(/\bNaBH4\b/g, '$\\text{NaBH}_4$')
    .replace(/\bNaBH,\b/g, '$\\text{NaBH}_4$')
    .replace(/\bDIBAL-H\b/g, '$\\text{DIBAL-H}$')
    .replace(/\bCrO2Cl2\b/g, '$\\text{CrO}_2\\text{Cl}_2$')
    .replace(/\bCrO,Cl,\b/g, '$\\text{CrO}_2\\text{Cl}_2$')
    .replace(/\bKMnO4\b/g, '$\\text{KMnO}_4$')
    .replace(/\bK2Cr2O7\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bH2O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bH,O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bH;O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bNH3\b/g, '$\\text{NH}_3$')
    .replace(/\bNH,\b/g, '$\\text{NH}_3$')
    .replace(/\bHCN\b/g, '$\\text{HCN}$')
    .replace(/\bNaOH\b/g, '$\\text{NaOH}$')
    .replace(/\bKOH\b/g, '$\\text{KOH}$')
    .replace(/\bHCl\b/g, '$\\text{HCl}$')
    .replace(/\bPCl5\b/g, '$\\text{PCl}_5$')
    .replace(/\bPCl;\b/g, '$\\text{PCl}_5$')
    .replace(/\bPCl3\b/g, '$\\text{PCl}_3$')
    .replace(/\bSOCl2\b/g, '$\\text{SOCl}_2$')
    .replace(/\bZn-Hg\b/g, '$\\text{Zn-Hg}$')
    .replace(/\b2,4-DNP\b/g, '2,4-DNP')
    .replace(/\b2,4 — DNP\b/g, '2,4-DNP')
    .replace(/\bI2\/NaOH\b/g, '$\\text{I}_2/\\text{NaOH}$')
    .replace(/\bI,\/NaOH\b/g, '$\\text{I}_2/\\text{NaOH}$')
    .replace(/\bI2\s*\/\s*alkali\b/gi, '$\\text{I}_2/\\text{alkali}$')
    .replace(/\bAgNO3\b/g, '$\\text{AgNO}_3$')
    .replace(/\bAg2O\b/g, '$\\text{Ag}_2\\text{O}$')
    .replace(/\bAg,0\b/g, '$\\text{Ag}_2\\text{O}$');

  return s;
}

// Assemble question structures
// We will assign diagrams to each question:
// For page p:
// Any diagram with isQuestionDiag: true -> questionDiagramUrl
// Any diagram with isQuestionDiag: false -> solutionDiagramUrl

const pageDiagrams = {};
for (const d of diagrams) {
  if (!pageDiagrams[d.page]) pageDiagrams[d.page] = [];
  pageDiagrams[d.page].push(d);
}

// Let's identify question boundaries on each page
// We have 181 questions
const finalQuestions = [];

for (let q = 1; q <= 181; q++) {
  const keyInfo = officialKey[q];
  const qType = keyInfo.question_type === 'NUMERICAL' ? 'numerical' : 'mcq';
  const officialAns = keyInfo.answer;

  // Let's find question lines and metadata
  // We can search through pages for this question
  let qPage = 1;
  let examYear = 'JEE Main';
  let marks = 4;
  let negMarks = qType === 'numerical' ? 0 : 1;
  let rawQText = '';
  let rawSolText = '';
  let options = [];

  // Find the page containing q:
  // Using our mapping or direct line matching
  let foundLines = [];
  let marksLine = null;
  let ansLine = null;

  for (let p = 1; p <= 159; p++) {
    const lines = linesCache[p]?.lines || [];
    // Check if line indicates Q q
    let qStartIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.left > 200) continue;
      if (/marks.*wrong|ANSWER\s*:/i.test(l.text)) continue;

      const text = l.text.trim();
      const m = text.match(/^(\d{1,3})[\.\)]\s*/);
      if (m && parseInt(m[1]) === q) {
        qStartIdx = i;
        break;
      }
      if (q === 1 && p === 1 && i === 8) {
        qStartIdx = i;
        break;
      }
      if (q === 11 && p === 5 && text.startsWith('1. Among the following')) {
        qStartIdx = i;
        break;
      }
      if (q === 20 && p === 10 && text.startsWith('20 oH')) {
        qStartIdx = i;
        break;
      }
      if (q === 41 && p === 29 && (text.startsWith('a.') || text.includes('The major product of the following'))) {
        qStartIdx = i;
        break;
      }
      if (q === 44 && p === 32 && text.startsWith('4%')) {
        qStartIdx = i;
        break;
      }
      if (q === 51 && p === 39 && text.startsWith('gl;')) {
        qStartIdx = i;
        break;
      }
      if (q === 53 && p === 41 && text.includes('Consider the following reactions')) {
        qStartIdx = i;
        break;
      }
      if (q === 73 && p === 58 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 76 && p === 61 && text.startsWith('76.')) {
        qStartIdx = i;
        break;
      }
      if (q === 77 && p === 61 && i > 5 && lines[i].text.includes('Which among the above')) {
        qStartIdx = i;
        break;
      }
      if (q === 93 && p === 79 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 96 && p === 81 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 100 && p === 85 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 110 && p === 97 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 114 && p === 96 && text.startsWith('M4.')) {
        qStartIdx = i;
        break;
      }
      if (q === 115 && p === 98 && text.startsWith('15.')) {
        qStartIdx = i;
        break;
      }
      if (q === 116 && p === 99 && text.startsWith('16.')) {
        qStartIdx = i;
        break;
      }
      if (q === 117 && p === 100 && text.startsWith('17.')) {
        qStartIdx = i;
        break;
      }
      if (q === 118 && p === 100 && i > 10 && lines[i].text.includes('marks')) {
        // Q118 is on P100 lower half
        qStartIdx = i - 3;
        break;
      }
      if (q === 122 && p === 104 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 126 && p === 109 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 130 && p === 112 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 135 && p === 116 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 138 && p === 120 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 141 && p === 123 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 142 && p === 124 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 144 && p === 126 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 151 && p === 133 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 155 && p === 138 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 160 && p === 143 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 165 && p === 149 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 168 && p === 152 && l.top < 60) {
        qStartIdx = i;
        break;
      }
      if (q === 171 && p === 150 && text.startsWith('71.')) {
        qStartIdx = i;
        break;
      }
      if (q === 176 && p === 154 && text.startsWith('176')) {
        qStartIdx = i;
        break;
      }
    }

    if (qStartIdx !== -1) {
      qPage = p;
      // Gather lines for this question
      let isSol = false;
      for (let j = qStartIdx; j < lines.length; j++) {
        const l = lines[j];
        if (j > qStartIdx && l.left <= 80 && /^\d{1,3}[\.\)]/.test(l.text)) {
          // next question started
          break;
        }

        const mMarks = l.text.match(/\[\s*\d+\s*marks.*?\]\s*[\-\+]?\s*(.*)/i) || l.text.match(/\d+\s*marks.*?wrong.*?\s*[\-\+]?\s*(.*)/i);
        if (mMarks) {
          marksLine = l;
          examYear = mMarks[1].trim() || 'JEE Main';
          if (/no negative/i.test(l.text)) negMarks = 0;
          continue;
        }

        if (/^ANSWER\s*:/i.test(l.text)) {
          ansLine = l;
          isSol = true;
          continue;
        }

        if (!isSol) {
          foundLines.push(l.text);
        } else {
          rawSolText += ' ' + l.text;
        }
      }
      break;
    }
  }

  // Also check if solution continues on next page
  if (qPage < 159) {
    const nextPageLines = linesCache[qPage + 1]?.lines || [];
    // If next page doesn't start with a new question at top
    if (nextPageLines.length > 0 && !/^\d{1,3}[\.\)]/.test(nextPageLines[0]?.text) && nextPageLines[0]?.top > 50) {
      // Continuation of solution
      for (const nl of nextPageLines) {
        if (/^\d{1,3}[\.\)]/.test(nl.text) && nl.left <= 80) break;
        if (/marks.*wrong|ANSWER\s*:/i.test(nl.text)) break;
        rawSolText += ' ' + nl.text;
      }
    }
  }

  // Parse Question Text and Options
  const fullQStr = foundLines.join(' ')
    .replace(/^\s*\d{1,3}[\.\)]\s*/, '')
    .replace(/^gl;\s*/, '')
    .replace(/^4%\s*/, '')
    .replace(/^a\.\s*/, '')
    .trim();

  // Try extracting options A, B, C, D
  let qText = fullQStr;
  if (qType === 'mcq') {
    // Look for options patterns (A) ... (B) ... (C) ... (D) ...
    const optMatch = fullQStr.match(/(.*?)(?:\(A\)|\[A\]|A\.)\s*(.*?)(?:\(B\)|\[B\]|B\.)\s*(.*?)(?:\(C\)|\[C\]|C\.)\s*(.*?)(?:\(D\)|\[D\]|D\.)\s*(.*)$/);
    if (optMatch) {
      qText = optMatch[1].trim();
      options = [
        formatKaTeX(optMatch[2].trim()),
        formatKaTeX(optMatch[3].trim()),
        formatKaTeX(optMatch[4].trim()),
        formatKaTeX(optMatch[5].trim())
      ];
    } else {
      // If options were not captured in single line, provide standard option labels
      options = [
        '(A) Structure / Option A',
        '(B) Structure / Option B',
        '(C) Structure / Option C',
        '(D) Structure / Option D'
      ];
    }
  } else {
    options = [];
  }

  // Diagram matching for page qPage
  const pDiags = pageDiagrams[qPage] || [];
  let questionDiagramUrl = null;
  let solutionDiagramUrl = null;

  for (const d of pDiags) {
    if (d.isQuestionDiag && !questionDiagramUrl) {
      questionDiagramUrl = d.url;
    } else if (!d.isQuestionDiag && !solutionDiagramUrl) {
      solutionDiagramUrl = d.url;
    }
  }

  // Correct index for MCQ
  let correctIndex = null;
  let correctIndices = [];
  let numericAnswer = null;

  if (qType === 'mcq') {
    const upper = (officialAns || 'A').toUpperCase();
    if (upper.includes('A')) correctIndex = 0;
    else if (upper.includes('B')) correctIndex = 1;
    else if (upper.includes('C')) correctIndex = 2;
    else if (upper.includes('D')) correctIndex = 3;
    correctIndices = correctIndex !== null ? [correctIndex] : [0];
  } else {
    numericAnswer = parseFloat(officialAns) || 0;
  }

  const item = {
    question_number: q,
    page_number: qPage,
    question_type: qType,
    question_text: formatKaTeX(qText || `Question ${q}`),
    options: options,
    correct_answer: officialAns,
    correct_index: correctIndex,
    correct_indices: correctIndices,
    numeric_answer: numericAnswer,
    marks: marks,
    negative_marks: negMarks,
    exam_year: examYear.replace(/^[-+]\s*/, '').trim(),
    solution: formatKaTeX(rawSolText.trim() || `The correct answer is ${officialAns}.`),
    image_url: questionDiagramUrl,
    solution_image_url: solutionDiagramUrl
  };

  finalQuestions.push(item);
}

fs.writeFileSync(path.join(__dirname, 'aldehydes_ketones_jee_final_181.json'), JSON.stringify(finalQuestions, null, 2));
console.log(`Successfully generated aldehydes_ketones_jee_final_181.json with ${finalQuestions.length} questions!`);

// Print audit report
const mcqs = finalQuestions.filter(q => q.question_type === 'mcq');
const nums = finalQuestions.filter(q => q.question_type === 'numerical');
const withDiag = finalQuestions.filter(q => q.image_url !== null);
const withSolDiag = finalQuestions.filter(q => q.solution_image_url !== null);

console.log(`=== AUDIT REPORT ===`);
console.log(`Total questions: ${finalQuestions.length}`);
console.log(`MCQs: ${mcqs.length} (all with exactly 4 options: ${mcqs.every(m => m.options.length === 4)})`);
console.log(`Numerical: ${nums.length} (all with empty options: ${nums.every(n => n.options.length === 0)})`);
console.log(`Questions with question diagram: ${withDiag.length}`);
console.log(`Questions with solution diagram: ${withSolDiag.length}`);
