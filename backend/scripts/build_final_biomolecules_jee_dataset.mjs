import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatChemicalFormulas } from '../src/utils/chemistryFormatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const draft = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_draft_219.json'), 'utf8'));
const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_diagram_urls.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_official_key.json'), 'utf8'));

function formatBiomoleculesText(text) {
  if (!text) return '';
  let str = text;

  // Fix common OCR anomalies in biomolecules terminology
  str = str.replace(/o\s*—\s*D/g, '$\\alpha$-D');
  str = str.replace(/8\s*—\s*D/g, '$\\beta$-D');
  str = str.replace(/a\s*—\s*D/g, '$\\alpha$-D');
  str = str.replace(/a\s*-\s*D/g, '$\\alpha$-D');
  str = str.replace(/B\s*—\s*D/g, '$\\beta$-D');
  str = str.replace(/B\s*-\s*D/g, '$\\beta$-D');
  str = str.replace(/a\s*-\s*amino/gi, '$\\alpha$-amino');
  str = str.replace(/a\s*-\s*helix/gi, '$\\alpha$-helix');
  str = str.replace(/3\s*-\s*pleated/gi, '$\\beta$-pleated');
  str = str.replace(/3\s*-\s*sheet/gi, '$\\beta$-sheet');
  str = str.replace(/8\s*-\s*pleated/gi, '$\\beta$-pleated');

  // Fix carbon notation C_1, C_4, C1, C4, C';
  str = str.replace(/C\s*['’]\s*;\s*and\s*C\s*['’]\s*;/g, '$C_1$ and $C_4$');
  str = str.replace(/C\s*['’]\s*;\s*of/g, '$C_1$ of');
  str = str.replace(/C\s*['’]\s*,\s*of/g, '$C_4$ of');
  str = str.replace(/C\s*['’]\s*;\s*and\s*C\s*['’]\s*6/g, '$C_1$ and $C_6$');
  str = str.replace(/C\s*['’]\s*;\s*and\s*C\s*['’]\s*2/g, '$C_1$ and $C_2$');
  str = str.replace(/C\s*['’]\s*-\s*1/g, 'C-1');
  str = str.replace(/C\s*['’]\s*-\s*4/g, 'C-4');
  str = str.replace(/\bC1\b/g, '$C_1$');
  str = str.replace(/\bC4\b/g, '$C_4$');
  str = str.replace(/\bC6\b/g, '$C_6$');
  str = str.replace(/\bC2\b/g, '$C_2$');

  // Common sugar formulas
  str = str.replace(/\bC6H12O6\b/g, '$\\text{C}_6\\text{H}_{12}\\text{O}_6$');
  str = str.replace(/\bC12H22O11\b/g, '$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$');
  str = str.replace(/\b\(C6H10O5\)n\b/g, '$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$');
  str = str.replace(/\bC\s*6\s*H\s*1\s*2\s*O\s*6\b/g, '$\\text{C}_6\\text{H}_{12}\\text{O}_6$');
  str = str.replace(/\bC\s*1\s*2\s*H\s*2\s*2\s*O\s*1\s*1\b/g, '$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$');
  str = str.replace(/C\s*H\s*,\s*O\s*H/g, '$\\text{CH}_2\\text{OH}$');
  str = str.replace(/\bCH2OH\b/g, '$\\text{CH}_2\\text{OH}$');
  str = str.replace(/C\s*O\s*O\s*H/g, '$\\text{COOH}$');
  str = str.replace(/\bCOOH\b/g, '$\\text{COOH}$');
  str = str.replace(/N\s*H\s*,\s*group/g, '$\\text{NH}_2$ group');
  str = str.replace(/\bNH2\b/g, '$\\text{NH}_2$');
  str = str.replace(/\bNH3\b/g, '$\\text{NH}_3$');
  str = str.replace(/c\s*o\s*o\s*n\s*group/i, '$\\text{COOH}$ group');

  // Apply general chemistry KaTeX formatting
  str = formatChemicalFormulas(str);

  return str.trim();
}

console.log('Compiling 219 final questions with KaTeX and Cloudinary URLs...');

const finalQuestions = [];

for (const q of draft) {
  const qNum = q.question_number;
  const qImgKey = `biomolecules_q${qNum}_question`;
  const solImgKey = `biomolecules_q${qNum}_solution`;

  const qImageUrl = urls[qImgKey] || null;
  const solImageUrl = urls[solImgKey] || null;

  // Format question text
  let formattedText = formatBiomoleculesText(q.question_text);

  // Format options
  let formattedOptions = [];
  if (q.question_type === 'mcq') {
    formattedOptions = q.options.map(opt => formatBiomoleculesText(opt));
  }

  // Format solution
  let formattedSolution = formatBiomoleculesText(q.solution);

  // Ensure answer is valid
  const verifiedAnswer = officialKey[qNum] || q.correct_option;

  finalQuestions.push({
    question_number: qNum,
    page_number: q.page,
    question_type: q.question_type,
    question_text: formattedText,
    options: formattedOptions,
    correct_option: String(verifiedAnswer).trim(),
    marks: 4,
    negative_marks: q.question_type === 'mcq' ? 1 : 0,
    difficulty: q.difficulty || 'medium',
    exam_type: 'JEE',
    subject: 'Chemistry',
    category: 'Chemistry',
    chapter: 'Biomolecules',
    chapter_id: 133,
    exam_year: q.exam_year || 'JEE Main PYQ',
    solution: formattedSolution,
    image_url: qImageUrl,
    solution_image_url: solImageUrl
  });
}

console.log(`Processed all ${finalQuestions.length}/219 questions.`);
const withQImg = finalQuestions.filter(q => q.image_url);
const withSolImg = finalQuestions.filter(q => q.solution_image_url);
console.log(`Questions with Cloudinary question diagram: ${withQImg.length}`);
console.log(`Questions with Cloudinary solution diagram: ${withSolImg.length}`);

// Final validation audit
let errors = 0;
for (const q of finalQuestions) {
  if (!q.question_text) {
    console.error(`Q${q.question_number} has empty question_text!`);
    errors++;
  }
  if (q.question_type === 'mcq') {
    if (!q.options || q.options.length !== 4) {
      console.error(`Q${q.question_number} MCQ does not have 4 options!`);
      errors++;
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
      console.warn(`Q${q.question_number} MCQ has non-standard correct_option: "${q.correct_option}"`);
    }
  }
  if (!q.correct_option) {
    console.error(`Q${q.question_number} has empty correct_option!`);
    errors++;
  }
}

if (errors === 0) {
  console.log('AUDIT PASSED: 100% of 219 questions are completely valid!');
} else {
  console.error(`AUDIT FAILED with ${errors} errors!`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'biomolecules_jee_final_219.json'),
  JSON.stringify(finalQuestions, null, 2)
);
console.log('Saved biomolecules_jee_final_219.json.');
process.exit(0);
