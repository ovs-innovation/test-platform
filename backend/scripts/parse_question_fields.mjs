import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseRecords = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_base_records.json'), 'utf8'));

// Graph questions where options are images/graphs
const graphQuestions = [20, 37, 41, 43, 123];

function cleanMath(text) {
  if (!text) return '';
  return text
    .replace(/AcadXL[™®\s]*/gi, '')
    .replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS.*?\n/gi, '')
    .replace(/EDUCATION WITH DISCIPLINE/gi, '')
    .replace(/Free to download.*?\n/gi, '')
    .replace(/Practise these online.*?\n/gi, '')
    .replace(/Gravitation — JEE Main PYQ Bank.*?\n/gi, '')
    .replace(/Time: \d+ minutes - Maximum marks: \d+ - Questions: \d+/gi, '')
    .trim();
}

function parseBlock(rec) {
  const qNum = rec.qNum;
  const raw = rec.page_text;
  const isNumerical = rec.question_type === 'numerical';
  const isGraph = graphQuestions.includes(qNum);

  // Split into: [Question + Options] and [Solution]
  const ansSplit = raw.split(/ANSWER\s*:\s*[A-D0-9]+/i);
  const stemAndOpts = ansSplit[0] || '';
  let sol = ansSplit[1] || '';

  // Clean solution
  sol = cleanMath(sol);
  if (!sol || sol.length < 5) {
    sol = isNumerical
      ? `According to the principles of gravitation, the calculated value is ${rec.numeric_answer}.\n\nHence, the correct answer is ${rec.numeric_answer}.`
      : `According to the principles of gravitation, the calculated result corresponds to option (${rec.official_key}).\n\nHence, the correct option is (${rec.official_key}).`;
  } else {
    // Add concluding line if not present
    if (isNumerical) {
      if (!sol.includes('correct answer')) {
        sol += `\n\nHence, the correct answer is ${rec.numeric_answer}.`;
      }
    } else {
      if (!sol.includes('correct option')) {
        sol += `\n\nHence, the correct option is (${rec.official_key}).`;
      }
    }
  }

  // Parse Question Stem and Options
  let questionStem = '';
  let options = [];

  if (isGraph) {
    // Question stem is text up to (A)
    const optSplit = stemAndOpts.split(/\(A\)/i);
    questionStem = cleanMath(optSplit[0]).replace(/^(?:Q\.?\s*)?\d+[\.:\-\)]\s*/, '').trim();
    options = ["Figure (A)", "Figure (B)", "Figure (C)", "Figure (D)"];
  } else if (isNumerical) {
    // No options for numerical questions
    const marksSplit = stemAndOpts.split(/\[\d+\s*marks/i);
    questionStem = cleanMath(marksSplit[0]).replace(/^(?:Q\.?\s*)?\d+[\.:\-\)]\s*/, '').trim();
    options = [];
  } else {
    // Regular MCQ: find (A), (B), (C), (D)
    // Regex matching (A) ... (B) ... (C) ... (D) ...
    const aIdx = stemAndOpts.search(/\([A|a]\)/);
    const bIdx = stemAndOpts.search(/\([B|b]\)/);
    const cIdx = stemAndOpts.search(/\([C|c]\)/);
    const dIdx = stemAndOpts.search(/\([D|d]\)/);

    if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
      questionStem = cleanMath(stemAndOpts.slice(0, aIdx)).replace(/^(?:Q\.?\s*)?\d+[\.:\-\)]\s*/, '').trim();
      const optA = cleanMath(stemAndOpts.slice(aIdx + 3, bIdx));
      const optB = cleanMath(stemAndOpts.slice(bIdx + 3, cIdx));
      const optC = cleanMath(stemAndOpts.slice(cIdx + 3, dIdx));
      
      // Opt D ends at [4 marks or end of stemAndOpts
      let optD = stemAndOpts.slice(dIdx + 3);
      const marksIdx = optD.search(/\[\d+\s*marks/i);
      if (marksIdx !== -1) optD = optD.slice(0, marksIdx);
      optD = cleanMath(optD);

      options = [optA, optB, optC, optD];
    } else {
      // Fallback
      const marksSplit = stemAndOpts.split(/\[\d+\s*marks/i);
      questionStem = cleanMath(marksSplit[0]).replace(/^(?:Q\.?\s*)?\d+[\.:\-\)]\s*/, '').trim();
      options = [];
    }
  }

  // Ensure options are non-empty for MCQs
  if (!isNumerical && (!options || options.length !== 4 || options.some(o => !o || o.trim().length === 0))) {
    options = [
      `Option (${rec.official_key === 'A' ? 'A - Correct' : 'A'})`,
      `Option (${rec.official_key === 'B' ? 'B - Correct' : 'B'})`,
      `Option (${rec.official_key === 'C' ? 'C - Correct' : 'C'})`,
      `Option (${rec.official_key === 'D' ? 'D - Correct' : 'D'})`
    ];
  }

  return {
    qNum: rec.qNum,
    exam: rec.exam,
    question: questionStem || `Gravitation question ${rec.qNum}`,
    options: options,
    correct_option: rec.correct_option,
    numeric_answer: rec.numeric_answer,
    question_type: rec.question_type,
    marks: 4,
    difficulty: rec.difficulty,
    image_url: rec.image_url,
    solution: sol
  };
}

const parsedAll = baseRecords.map(parseBlock);

// Check dummy options
let dummyCount = 0;
for (const q of parsedAll) {
  if (q.options && q.options.some(o => o.includes('Option (A)'))) {
    dummyCount++;
    console.warn(`Dummy option in Q${q.qNum}`);
  }
}
console.log(`Total questions: ${parsedAll.length}`);
console.log(`Dummy option questions: ${dummyCount}`);

fs.writeFileSync(path.resolve(__dirname, 'gravitation_parsed_initial.json'), JSON.stringify(parsedAll, null, 2));
