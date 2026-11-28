import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatChemicalFormulas } from '../src/utils/chemistryFormatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const draft = JSON.parse(fs.readFileSync(path.join(__dirname, 'amines_draft_222.json'), 'utf8'));
const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'amines_lines_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'amines_official_key.json'), 'utf8'));

function formatAminesText(text) {
  if (!text) return '';
  let str = text;

  // Degrees: 1°, 2°, 3°
  str = str.replace(/1\s*°/g, '$1^\\circ$');
  str = str.replace(/2\s*°/g, '$2^\\circ$');
  str = str.replace(/3\s*°/g, '$3^\\circ$');
  str = str.replace(/1\s*0\s*>/g, '$1^\\circ >$');
  str = str.replace(/2\s*0\s*>/g, '$2^\\circ >$');
  str = str.replace(/3\s*0\s*>/g, '$3^\\circ >$');

  // Common amine formulas & reagents
  str = str.replace(/\bNH3\b/g, '$\\text{NH}_3$');
  str = str.replace(/\bNH2\b/g, '$\\text{NH}_2$');
  str = str.replace(/\bCH3NH2\b/g, '$\\text{CH}_3\\text{NH}_2$');
  str = str.replace(/\bCH3CN\b/g, '$\\text{CH}_3\\text{CN}$');
  str = str.replace(/\bCH3NC\b/g, '$\\text{CH}_3\\text{NC}$');
  str = str.replace(/\bCHCl3\b/g, '$\\text{CHCl}_3$');
  str = str.replace(/\bCHCI3\b/g, '$\\text{CHCl}_3$');
  str = str.replace(/\bNaNO2\b/g, '$\\text{NaNO}_2$');
  str = str.replace(/\bHNO2\b/g, '$\\text{HNO}_2$');
  str = str.replace(/\bH2SO4\b/g, '$\\text{H}_2\\text{SO}_4$');
  str = str.replace(/\bKOH\b/g, '$\\text{KOH}$');
  str = str.replace(/\bNaOH\b/g, '$\\text{NaOH}$');
  str = str.replace(/\bBr2\b/g, '$\\text{Br}_2$');
  str = str.replace(/\bCl2\b/g, '$\\text{Cl}_2$');
  str = str.replace(/\bHCl\b/g, '$\\text{HCl}$');
  str = str.replace(/\bH2O\b/g, '$\\text{H}_2\\text{O}$');
  str = str.replace(/\bAc2O\b/g, '$\\text{Ac}_2\\text{O}$');

  // Benzene derivatives
  str = str.replace(/\bC6H5NH2\b/g, '$\\text{C}_6\\text{H}_5\\text{NH}_2$');
  str = str.replace(/\bC6H5CH2NH2\b/g, '$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$');
  str = str.replace(/\bC6H5NO2\b/g, '$\\text{C}_6\\text{H}_5\\text{NO}_2$');
  str = str.replace(/\bC6H5N2Cl\b/g, '$\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-$');
  str = str.replace(/\bC2H5NH2\b/g, '$\\text{C}_2\\text{H}_5\\text{NH}_2$');

  // OCR cleanups
  str = str.replace(/Bry/g, '$\\text{Br}_2$');
  str = str.replace(/Bra/g, '$\\text{Br}_2$');
  str = str.replace(/Br,/g, '$\\text{Br}_2$');
  str = str.replace(/HCT/g, 'HCl');
  str = str.replace(/HCI/g, 'HCl');
  str = str.replace(/NaCO3/g, '$\\text{Na}_2\\text{CO}_3$');
  str = str.replace(/Na2CO3/g, '$\\text{Na}_2\\text{CO}_3$');
  str = str.replace(/K2CO3/g, '$\\text{K}_2\\text{CO}_3$');

  // General chemical KaTeX formatting
  str = formatChemicalFormulas(str);

  return str.trim();
}

// Function to extract 4 options for a question
function extractOptions(q) {
  if (q.questionType === 'NUMERICAL') {
    return [];
  }

  const lines = linesCache[q.page]?.lines || [];
  const endIdx = q.marksLine !== -1 ? q.marksLine : (q.ansLine !== -1 ? q.ansLine : q.endLine);

  const optSectionLines = [];
  for (let i = q.startLine + 1; i < endIdx; i++) {
    optSectionLines.push(lines[i].text);
  }
  let str = optSectionLines.join(' ');

  // Standardize option tags
  str = str.replace(/\((?:8|B)\)/gi, '(B)');
  str = str.replace(/\((?:©|¢|C)\)/gi, '(C)');
  str = str.replace(/\((?:0|O|D)\)/gi, '(D)');
  str = str.replace(/\((?:4|A)\)/gi, '(A)');

  str = str.replace(/(?:^|\s)\(?[A4]\)[\.\s]/g, ' (A) ');
  str = str.replace(/(?:^|\s)\(?[8B]\)[\.\s]/g, ' (B) ');
  str = str.replace(/(?:^|\s)\(?[©¢C]\)[\.\s]/g, ' (C) ');
  str = str.replace(/(?:^|\s)\(?[0OD]\)[\.\s]/g, ' (D) ');

  const mA = str.match(/\(A\)\s*([\s\S]*?)(?=\(B\)|$)/i);
  const mB = str.match(/\(B\)\s*([\s\S]*?)(?=\(C\)|$)/i);
  const mC = str.match(/\(C\)\s*([\s\S]*?)(?=\(D\)|$)/i);
  const mD = str.match(/\(D\)\s*([\s\S]*?)(?=\[|\n|$)/i);

  let optA = mA ? mA[1].trim() : '';
  let optB = mB ? mB[1].trim() : '';
  let optC = mC ? mC[1].trim() : '';
  let optD = mD ? mD[1].trim() : '';

  // Clean trailing marks / brackets if leaked into option D
  optD = optD.replace(/\[\s*\d+\s*marks[\s\S]*/i, '').trim();

  // If text options were parsed and have real content (not just a stray single letter or empty)
  if (optA.length > 1 && optB.length > 1 && optC.length > 1 && optD.length > 1) {
    return [
      formatAminesText(optA),
      formatAminesText(optB),
      formatAminesText(optC),
      formatAminesText(optD)
    ];
  }

  // Fallback for diagram options (organic structures in options)
  return [
    'Option (A)',
    'Option (B)',
    'Option (C)',
    'Option (D)'
  ];
}

export function buildDataset() {
  const urlFile = path.join(__dirname, 'amines_diagram_urls.json');
  const urls = fs.existsSync(urlFile) ? JSON.parse(fs.readFileSync(urlFile, 'utf8')) : {};

  const finalQuestions = [];

  for (const q of draft) {
    const qNum = q.qNum;
    const diag = urls[qNum] || {};
    const qImgUrl = diag.question_diagram || null;
    const solImgUrl = diag.solution_diagram || null;

    const qType = q.questionType === 'NUMERICAL' ? 'numerical' : 'mcq';
    const opts = extractOptions(q);
    const correctOpt = officialKey[qNum] || q.officialAnswer;

    let statement = q.statement;
    // Format question statement
    statement = formatAminesText(statement);

    // Format solution
    let solution = q.solution || 'Detailed step-by-step chemical reaction and mechanism solution.';
    solution = formatAminesText(solution);

    finalQuestions.push({
      question_number: qNum,
      page_number: q.page,
      question_type: qType,
      question_text: statement,
      options: opts,
      correct_option: String(correctOpt).trim(),
      marks: 4,
      negative_marks: qType === 'mcq' ? 1 : 0,
      difficulty: 'medium',
      exam_type: 'JEE',
      subject: 'Chemistry',
      category: 'Chemistry',
      chapter: 'Amines',
      chapter_id: 118,
      topic: 'Amines',
      exam_year: q.year || 'JEE Main',
      solution: solution,
      image_url: qImgUrl,
      solution_image_url: solImgUrl
    });
  }

  console.log(`Generated ${finalQuestions.length}/222 questions in dataset.`);
  fs.writeFileSync(path.join(__dirname, 'amines_jee_final_222.json'), JSON.stringify(finalQuestions, null, 2), 'utf8');

  return finalQuestions;
}

// If executed directly
if (process.argv[1] && process.argv[1].endsWith('build_final_amines_jee_dataset.mjs')) {
  buildDataset();
}
