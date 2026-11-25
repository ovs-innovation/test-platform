import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_sliced_questions.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_crop_manifest.json'), 'utf8'));
const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_diagram_urls.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_official_keys.json'), 'utf8'));

// Helper to format chemistry formulas and math to clean LaTeX
function formatOrganicChemistryLatex(text) {
  if (!text) return '';
  let s = text;

  // Fix common PDF line breaks inside chemical names or terms
  s = s.replace(/(\b\w+)-\s*\n\s*(\w+\b)/g, '$1-$2');
  s = s.replace(/pK\s*\n\s*b/gi, '$\\text{p}K_b$');
  s = s.replace(/pK\s*\n\s*a/gi, '$\\text{p}K_a$');
  s = s.replace(/\bpKb\b/gi, '$\\text{p}K_b$');
  s = s.replace(/\bpKa\b/gi, '$\\text{p}K_a$');
  s = s.replace(/\bsp\^3\b/gi, '$sp^3$');
  s = s.replace(/\bsp\^2\b/gi, '$sp^2$');
  s = s.replace(/\bsp\^1\b|\bsp\b(?!\w)/gi, '$sp$');
  s = s.replace(/\bR_f\b/g, '$R_f$');

  // Degree symbol
  s = s.replace(/(\d+)\s*°\s*C/g, '$$$1^\\circ\\text{C}$$');

  return s;
}

const finalQuestions = [];

for (const q of questions) {
  const qNum = q.qNum;
  const keyInfo = officialKeys[qNum] || q.officialKey || {};
  const m = manifest[qNum] || {};

  const yearMatch = (q.rawHeader || '').match(/20\d\d/);
  const year = yearMatch ? parseInt(yearMatch[0]) : 2026;

  let questionType = q.type === 'numerical' ? 'numerical' : 'mcq';
  let formattedStem = '';
  let optionsArray = [];
  let stemImageUrl = '';

  // Stem Diagram
  if (m.stemDiag) {
    const key = m.stemDiag.replace(/\.png$/, '');
    stemImageUrl = urls[key] || '';
  }

  if (questionType === 'numerical') {
    formattedStem = formatOrganicChemistryLatex(q.fullText.trim());
    if (stemImageUrl) {
      formattedStem = `${formattedStem}\n\n![Question Diagram](${stemImageUrl})\n\n`;
    }
    optionsArray = [];
  } else {
    // MCQ
    const stemMatch = q.fullText.match(/^([\s\S]*?)(?:\(A\)(?:[\s\S]*?)\(B\)(?:[\s\S]*?)\(C\)(?:[\s\S]*?)\(D\)(?:[\s\S]*))$/);
    let rawStem = stemMatch ? stemMatch[1].trim() : q.fullText.trim();
    formattedStem = formatOrganicChemistryLatex(rawStem);

    if (stemImageUrl) {
      formattedStem = `${formattedStem}\n\n![Question Diagram](${stemImageUrl})\n\n`;
    }

    // Check if options are diagrams
    if (m.optA && m.optB && m.optC && m.optD) {
      const urlA = urls[m.optA.replace(/\.png$/, '')] || '';
      const urlB = urls[m.optB.replace(/\.png$/, '')] || '';
      const urlC = urls[m.optC.replace(/\.png$/, '')] || '';
      const urlD = urls[m.optD.replace(/\.png$/, '')] || '';

      optionsArray = [
        { key: 'A', text: `![Option A](${urlA})`, image_url: urlA },
        { key: 'B', text: `![Option B](${urlB})`, image_url: urlB },
        { key: 'C', text: `![Option C](${urlC})`, image_url: urlC },
        { key: 'D', text: `![Option D](${urlD})`, image_url: urlD }
      ];
    } else {
      // Text options
      const optMatch = q.fullText.match(/\(A\)([\s\S]*?)\(B\)([\s\S]*?)\(C\)([\s\S]*?)\(D\)([\s\S]*)$/);
      if (optMatch) {
        optionsArray = [
          { key: 'A', text: formatOrganicChemistryLatex(optMatch[1].replace(/\n/g, ' ').trim()), image_url: '' },
          { key: 'B', text: formatOrganicChemistryLatex(optMatch[2].replace(/\n/g, ' ').trim()), image_url: '' },
          { key: 'C', text: formatOrganicChemistryLatex(optMatch[3].replace(/\n/g, ' ').trim()), image_url: '' },
          { key: 'D', text: formatOrganicChemistryLatex(optMatch[4].replace(/\n/g, ' ').trim()), image_url: '' }
        ];
      } else {
        console.warn(`Could not parse text options for MCQ Q${qNum}!`);
      }
    }
  }

  const rawAns = String(keyInfo.ans || '').trim();
  const correctOption = questionType === 'mcq' ? rawAns.toUpperCase() : rawAns;
  let correctIndex = null;
  let correctIndices = [];

  if (questionType === 'mcq') {
    if (correctOption.length === 1 && correctOption >= 'A' && correctOption <= 'D') {
      correctIndex = correctOption.charCodeAt(0) - 65;
      correctIndices = [correctIndex];
    } else {
      // Multiple correct letters if any
      const letters = correctOption.split(/[\s,]+/).filter(l => l >= 'A' && l <= 'D');
      correctIndices = letters.map(l => l.charCodeAt(0) - 65);
      correctIndex = correctIndices[0] ?? 0;
    }
  }

  // Solution
  const solutionText = `Official Answer: ${correctOption}. Exam: ${q.examShift || 'JEE Main'}. Chapter: Basics of Organic Chemistry.`;

  finalQuestions.push({
    question_number: qNum,
    page_number: q.pageNumber,
    raw_header: q.rawHeader,
    exam_shift: q.examShift,
    year,
    exam_name: 'JEE Main',
    exam_type: 'JEE',
    subject: 'Chemistry',
    chapter: 'Basics of Organic Chemistry',
    topic: 'Basics of Organic Chemistry',
    question_type: questionType,
    question_text: formattedStem,
    options: optionsArray,
    correct_option: correctOption,
    correct_index: correctIndex,
    correct_indices: correctIndices,
    numeric_answer: questionType === 'numerical' ? rawAns : null,
    solution: solutionText,
    image_url: stemImageUrl || '',
    marks: 4,
    difficulty: 'medium',
    category: 'PYQ',
    status: 'available'
  });
}

console.log(`Successfully built ${finalQuestions.length} complete questions!`);
const mcqCount = finalQuestions.filter(q => q.question_type === 'mcq').length;
const numCount = finalQuestions.filter(q => q.question_type === 'numerical').length;
const stemDiagCount = finalQuestions.filter(q => q.image_url).length;
const optDiagCount = finalQuestions.filter(q => q.options.some(o => o.image_url)).length;

console.log(`Summary:`);
console.log(`- MCQs: ${mcqCount}`);
console.log(`- Numerical: ${numCount}`);
console.log(`- Questions with Stem Diagram: ${stemDiagCount}`);
console.log(`- Questions with Option Diagrams: ${optDiagCount}`);

fs.writeFileSync(path.resolve(__dirname, 'goc_final_questions.json'), JSON.stringify(finalQuestions, null, 2));
console.log('Saved to backend/scripts/goc_final_questions.json');
