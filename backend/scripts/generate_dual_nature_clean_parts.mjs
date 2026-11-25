import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));

const diagramMap = {
  13: diagramUrls['dual_nature_q13_diagram.png'],
  14: diagramUrls['dual_nature_q14_diagram.png'],
  15: diagramUrls['dual_nature_q15_diagram.png'],
  27: diagramUrls['dual_nature_q27_diagram.png'],
  35: diagramUrls['dual_nature_q35_diagram.png'],
  62: diagramUrls['dual_nature_q62_diagram.png'],
  75: diagramUrls['dual_nature_q75_diagram.png'],
  76: diagramUrls['dual_nature_q76_diagram.png'],
  153: diagramUrls['dual_nature_q153_diagram.png'],
  164: diagramUrls['dual_nature_q164_diagram.png'],
  172: diagramUrls['dual_nature_q172_diagram.png'],
  195: diagramUrls['dual_nature_q195_diagram.png'],
  210: diagramUrls['dual_nature_q210_diagram.png']
};

const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

function cleanKaTeX(text) {
  if (!text) return '';
  let s = text.trim();
  s = s.replace(/AcadXL™[\s\S]*?ACADXL\s*-\s*EDUCATION\s*WITH\s*DISCIPLINE/gi, '');
  s = s.replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com[^\n]*/gi, '');
  s = s.replace(/Dual Nature of Matter\s*—\s*JEE[^\n]*/gi, '');
  s = s.replace(/Time:\s*\d+\s*minutes[^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*-\d+\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*1\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/ANSWER\s*:\s*[A-D0-9\.\-]+/gi, '');

  s = s.replace(/(\d+)\s*x\s*10\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\^([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\s*\^\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/10\s*\^\s*([–\-\+−]?\d+)/g, '10^{$1}');
  s = s.replace(/([0-9])\s*eV\b/gi, '$1\\text{ eV}');
  s = s.replace(/([0-9])\s*nm\b/gi, '$1\\text{ nm}');
  s = s.replace(/([0-9])\s*m\/s\b/gi, '$1\\text{ m/s}');
  s = s.replace(/([0-9])\s*J\.?s\b/gi, '$1\\text{ J}\\cdot\\text{s}');
  s = s.replace(/([0-9])\s*kg\b/gi, '$1\\text{ kg}');
  s = s.replace(/([0-9])\s*V\b/g, '$1\\text{ V}');
  s = s.replace(/([0-9])\s*Hz\b/g, '$1\\text{ Hz}');
  s = s.replace(/([0-9])\s*Å\b/g, '$1\\text{ \\AA}');
  s = s.replace(/\bA\s*°/g, '\\text{\\AA}');
  s = s.replace(/\\text\{ \\AA\}/g, '\\text{\\AA}');
  s = s.replace(/\bde\s*-\s*Broglie\b/gi, 'de Broglie');
  s = s.replace(/\bdeBroglie\b/gi, 'de Broglie');
  s = s.replace(/photo\s*-\s*electric/gi, 'photoelectric');
  s = s.replace(/photo\s*-\s*electrons/gi, 'photoelectrons');
  s = s.replace(/photo\s*-\s*cathode/gi, 'photocathode');
  s = s.replace(/--+/g, '—');
  return s.trim();
}

function extractOptionsAndText(rawText, qNum) {
  let text = rawText.trim();
  // Normalize option markers
  text = text.replace(/®\s*\)/g, '(B)');
  text = text.replace(/®/g, '(B)');
  text = text.replace(/©\s*\)/g, '(C)');
  text = text.replace(/©/g, '(C)');
  text = text.replace(/\bW\s*([0-9a-zA-Z\$\\])/g, '(A) $1');
  text = text.replace(/(?:^|\n|\s)\(?[aA]\)\s*/g, '\n(A) ');
  text = text.replace(/(?:^|\n|\s)\(?[bB]\)\s*/g, '\n(B) ');
  text = text.replace(/(?:^|\n|\s)\(?[cC]\)\s*/g, '\n(C) ');
  text = text.replace(/(?:^|\n|\s)\(?[dD0]\)\s*/g, '\n(D) ');

  const aIdx = text.search(/\(A\)\s*/);
  const bIdx = text.search(/\(B\)\s*/);
  const cIdx = text.search(/\(C\)\s*/);
  const dIdx = text.search(/\(D\)\s*/);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    const qBody = cleanKaTeX(text.slice(0, aIdx));
    const optA = cleanKaTeX(text.slice(aIdx + 4, bIdx));
    const optB = cleanKaTeX(text.slice(bIdx + 4, cIdx));
    const optC = cleanKaTeX(text.slice(cIdx + 4, dIdx));
    const optD = cleanKaTeX(text.slice(dIdx + 4));
    return { qBody, options: [optA, optB, optC, optD] };
  }

  // If no 4-way split, return cleaned text and fallback
  return { qBody: cleanKaTeX(text), options: [] };
}

const cleanedDataset = [];
let missingOptionsCount = 0;

for (let q = 1; q <= 217; q++) {
  const item = parsed[q];
  const isNumeric = NUMERICAL_QUESTIONS.has(q);
  const key = officialKeys[q];

  let qBody = '';
  let options = [];

  if (isNumeric) {
    qBody = cleanKaTeX(item.rawQuestion);
    options = [];
  } else {
    const res = extractOptionsAndText(item.rawQuestion, q);
    qBody = res.qBody;
    options = res.options;
    if (options.length !== 4 || options.some(o => !o || o.trim().length === 0)) {
      missingOptionsCount++;
    }
  }

  cleanedDataset.push({
    q_num: q,
    question_text: qBody,
    options: options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: isNumeric ? parseFloat(key) : null,
    tolerance: isNumeric ? 0 : null,
    correct_option: key,
    correct_index: isNumeric ? null : ({ A: 0, B: 1, C: 2, D: 3 }[key] ?? 0),
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty: q > 150 ? 'hard' : (q > 70 ? 'medium' : 'easy'),
    image_url: diagramMap[q] || null,
    solution_image_url: null,
    solution: cleanKaTeX(item.rawSolution) || `Official Answer: ${key}`
  });
}

console.log(`Initial parse: ${cleanedDataset.length} questions.`);
console.log(`Questions still needing options: ${missingOptionsCount}`);
fs.writeFileSync(path.resolve(__dirname, 'dual_nature_cleaned_prelim.json'), JSON.stringify(cleanedDataset, null, 2));
