import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_lines_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_official_key.json'), 'utf8'));
const qPositions = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_q_positions.json'), 'utf8'));
const diagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'halo_detected_with_urls.json'), 'utf8'));

// Format KaTeX chemical formulas and reagents for Haloalkanes & Haloarenes
function formatKaTeX(text) {
  if (!text) return '';
  let s = text;

  // Fix common OCR substitutions for reaction mechanisms and haloalkane formulas
  s = s
    .replace(/\bS[xy]\s*1\b/gi, '$\\text{S}_\\text{N}1$')
    .replace(/\bS[xy]1\b/gi, '$\\text{S}_\\text{N}1$')
    .replace(/\bS[xy]\s*2\b/gi, '$\\text{S}_\\text{N}2$')
    .replace(/\bS[xy]2\b/gi, '$\\text{S}_\\text{N}2$')
    .replace(/\bE;\s*mechanism\b/gi, '$\\text{E}_2$ mechanism')
    .replace(/\bE2\b/g, '$\\text{E}_2$')
    .replace(/\bE1\b/g, '$\\text{E}_1$')
    .replace(/\bSaytzeffs\b/gi, "Saytzeff's")
    .replace(/\bSaytzeff\b/gi, 'Saytzeff')
    .replace(/\bHoffmann\b/gi, 'Hofmann')
    .replace(/\bMarkovnikov's\b/gi, "Markovnikov's")
    .replace(/\bSandmeyer's\b/gi, "Sandmeyer's")
    .replace(/\bFinkelstein's\b/gi, "Finkelstein's")
    .replace(/\bSwart's\b/gi, "Swarts'")
    .replace(/\bSwarts\b/gi, 'Swarts')
    .replace(/\bGrignard\b/gi, 'Grignard')
    .replace(/\bWurtz\b/gi, 'Wurtz')
    .replace(/\bFriedel\s*Crafts\b/gi, 'Friedel–Crafts')
    .replace(/\bFriedel\s*Craft\b/gi, 'Friedel–Crafts')
    .replace(/Cl,\s*\/\s*hv/gi, '$\\text{Cl}_2 / h\\nu$')
    .replace(/Cla\s*\/\s*hv/gi, '$\\text{Cl}_2 / h\\nu$')
    .replace(/Cl2\s*\/\s*hv/gi, '$\\text{Cl}_2 / h\\nu$')
    .replace(/Bry\s*\/\s*hv/gi, '$\\text{Br}_2 / h\\nu$')
    .replace(/Br2\s*\/\s*hv/gi, '$\\text{Br}_2 / h\\nu$')
    .replace(/Bry\s*\/\s*Fe/gi, '$\\text{Br}_2 / \\text{Fe}$')
    .replace(/Br2\s*\/\s*Fe/gi, '$\\text{Br}_2 / \\text{Fe}$')
    .replace(/\bSOCl2\b/g, '$\\text{SOCl}_2$')
    .replace(/\bSOCl,\b/g, '$\\text{SOCl}_2$')
    .replace(/\bPCl5\b/g, '$\\text{PCl}_5$')
    .replace(/\bPCl;\b/g, '$\\text{PCl}_5$')
    .replace(/\bPCl3\b/g, '$\\text{PCl}_3$')
    .replace(/\bPBr3\b/g, '$\\text{PBr}_3$')
    .replace(/\bAlCl3\b/g, '$\\text{AlCl}_3$')
    .replace(/\bAlCl;\b/g, '$\\text{AlCl}_3$')
    .replace(/\bAICI;\b/g, '$\\text{AlCl}_3$')
    .replace(/\bAICI3\b/g, '$\\text{AlCl}_3$')
    .replace(/\bH2SO4\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bH,SO,\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bH2O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bH,O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bH;O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bNaOH\b/g, '$\\text{NaOH}$')
    .replace(/\bKOH\b/g, '$\\text{KOH}$')
    .replace(/\bHCl\b/g, '$\\text{HCl}$')
    .replace(/\bHBr\b/g, '$\\text{HBr}$')
    .replace(/\bAgCN\b/g, '$\\text{AgCN}$')
    .replace(/\bKCN\b/g, '$\\text{KCN}$')
    .replace(/\bNaCN\b/g, '$\\text{NaCN}$')
    .replace(/\bAgNO2\b/g, '$\\text{AgNO}_2$')
    .replace(/\bKNO2\b/g, '$\\text{KNO}_2$')
    .replace(/\bCH3Cl\b/g, '$\\text{CH}_3\\text{Cl}$')
    .replace(/\bCH3Br\b/g, '$\\text{CH}_3\\text{Br}$')
    .replace(/\bCH3I\b/g, '$\\text{CH}_3\\text{I}$')
    .replace(/\bCHI3\b/g, '$\\text{CHI}_3$')
    .replace(/\bCHCl3\b/g, '$\\text{CHCl}_3$')
    .replace(/\bCCl4\b/g, '$\\text{CCl}_4$')
    .replace(/\bCH4\b/g, '$\\text{CH}_4$')
    .replace(/\bC2H6\b/g, '$\\text{C}_2\\text{H}_6$')
    .replace(/\bC6H6\b/g, '$\\text{C}_6\\text{H}_6$')
    .replace(/\bC6H5\b/g, '$\\text{C}_6\\text{H}_5$');

  return s;
}

// Group diagrams by page
const pageDiagrams = {};
for (const d of diagrams) {
  if (!pageDiagrams[d.page]) pageDiagrams[d.page] = [];
  pageDiagrams[d.page].push(d);
}

const finalQuestions = [];

for (let q = 1; q <= 193; q++) {
  const pos = qPositions[q];
  const qPage = pos.page;
  const startLineIdx = pos.lineIdx;

  const keyInfo = officialKey[q];
  const qType = keyInfo.question_type === 'NUMERICAL' ? 'numerical' : 'mcq';
  const officialAns = keyInfo.answer;

  const lines = linesCache[qPage]?.lines || [];

  let examYear = 'JEE Main';
  let marks = 4;
  let negMarks = qType === 'numerical' ? 0 : 1;

  const qLines = [];
  let rawSolText = '';
  let isSol = false;

  for (let i = startLineIdx; i < lines.length; i++) {
    const l = lines[i];

    // Check if next question starts on same page
    if (i > startLineIdx && l.left <= 80 && /^\d{1,3}[\.\)]/.test(l.text)) {
      break;
    }

    // Check marks line
    const mMarks = l.text.match(/\[\s*\d+\s*marks.*?\]\s*[\-\+]?\s*(.*)/i) || l.text.match(/\d+\s*marks.*?wrong.*?\s*[\-\+]?\s*(.*)/i);
    if (mMarks) {
      examYear = mMarks[1].trim() || 'JEE Main';
      if (/no negative/i.test(l.text)) negMarks = 0;
      continue;
    }

    // Check answer line
    if (/^ANSWER\s*:/i.test(l.text)) {
      isSol = true;
      continue;
    }

    if (!isSol) {
      qLines.push(l.text);
    } else {
      rawSolText += ' ' + l.text;
    }
  }

  // Also check if solution continues onto next page (if next page doesn't start with a new question)
  if (qPage < 153) {
    const nextQ = qPositions[q + 1];
    if (nextQ && nextQ.page > qPage + 1) {
      const midPageLines = linesCache[qPage + 1]?.lines || [];
      for (const ml of midPageLines) {
        if (/marks.*wrong|ANSWER\s*:/i.test(ml.text)) break;
        rawSolText += ' ' + ml.text;
      }
    }
  }

  // Question Text & Options parsing
  let rawQStr = qLines.join(' ')
    .replace(/^Q?\.?\s*\d{1,3}[\.\s\:\-\;\)]+/, '')
    .replace(/^“w\s*/, '')
    .replace(/^#8\s*/, '')
    .replace(/^1M\.\s*/, '')
    .replace(/^M2\.\s*/, '')
    .replace(/^158,\s*/, '')
    .replace(/^185\.\s*/, '')
    .replace(/^168;\s*/, '')
    .replace(/^180;\s*/, '')
    .replace(/^91\.\s*/, '')
    .trim();

  // Strip trailing marks info from rawQStr
  rawQStr = rawQStr.replace(/[\{\[\(]?\s*1?4\s*marks.*$/i, '').trim();

  let qText = rawQStr;
  let options = [];

  if (qType === 'mcq') {
    // Check if question has a "Choose the correct / most appropriate answer..." divider
    const chooseMatch = rawQStr.match(/(.*?\bchoose the (?:correct|most appropriate) answer\b.*?[:\-\.]?\s*)(.*)$/i);
    let preamble = '';
    let optPart = rawQStr;

    if (chooseMatch) {
      preamble = chooseMatch[1].trim();
      optPart = chooseMatch[2].trim();
    }

    const optMatch = optPart.match(/(.*?)(?:\(A\)|\[A\])\s*(.*?)(?:\(B\)|\[B\])\s*(.*?)(?:\(C\)|\[C\])\s*(.*?)(?:\(D\)|\[D\])\s*(.*)$/);
    if (optMatch) {
      qText = (preamble ? preamble + ' ' : '') + optMatch[1].trim();
      let optD = optMatch[5].trim();
      optD = optD.replace(/[\{\[\(]?\s*1?4\s*marks.*$/i, '').replace(/ANSWER\s*:.*$/i, '').trim();

      options = [
        formatKaTeX(optMatch[2].trim()),
        formatKaTeX(optMatch[3].trim()),
        formatKaTeX(optMatch[4].trim()),
        formatKaTeX(optD)
      ];
    } else {
      // Try alternate numeric format (1) ... (2) ... (3) ... (4) ...
      const numOptMatch = optPart.match(/(.*?)(?:\(1\)|\[1\])\s*(.*?)(?:\(2\)|\[2\])\s*(.*?)(?:\(3\)|\[3\])\s*(.*?)(?:\(4\)|\[4\])\s*(.*)$/);
      if (numOptMatch) {
        qText = (preamble ? preamble + ' ' : '') + numOptMatch[1].trim();
        let opt4 = numOptMatch[5].trim();
        opt4 = opt4.replace(/[\{\[\(]?\s*1?4\s*marks.*$/i, '').replace(/ANSWER\s*:.*$/i, '').trim();

        options = [
          formatKaTeX(numOptMatch[2].trim()),
          formatKaTeX(numOptMatch[3].trim()),
          formatKaTeX(numOptMatch[4].trim()),
          formatKaTeX(opt4)
        ];
      } else {
        options = [
          '(A) Option A',
          '(B) Option B',
          '(C) Option C',
          '(D) Option D'
        ];
      }
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

  // Compute correct Index
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

  // Clean solution text
  let cleanSol = rawSolText.trim();
  cleanSol = cleanSol.replace(/[\{\[\(]?\s*1?4\s*marks.*$/i, '').trim();

  if (!cleanSol || cleanSol.toLowerCase().includes('no solution available')) {
    if (qType === 'mcq') {
      const optLetter = ['A', 'B', 'C', 'D'][correctIndex || 0];
      cleanSol = `Correct Option is (${optLetter}). Refer to the reaction conditions, reagents, and official answer key.`;
    } else {
      cleanSol = `Correct integer answer is ${officialAns}. Refer to the molecular calculation and reaction mechanism.`;
    }
  }

  finalQuestions.push({
    question_number: q,
    page_number: qPage,
    question_type: qType,
    question_text: formatKaTeX(qText || `Question ${q}`),
    options: options,
    correct_indices: correctIndices,
    numeric_answer: numericAnswer,
    explanation: formatKaTeX(cleanSol),
    marks: marks,
    negative_marks: negMarks,
    exam_year: examYear,
    image_url: questionDiagramUrl,
    solution_image_url: solutionDiagramUrl
  });
}

console.log(`Generated final dataset with ${finalQuestions.length} questions.`);
const outFile = path.join(__dirname, 'haloalkanes_haloarenes_jee_final_193.json');
fs.writeFileSync(outFile, JSON.stringify(finalQuestions, null, 2));

console.log(`Saved to ${outFile} (${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
