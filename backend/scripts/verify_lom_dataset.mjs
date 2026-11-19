import { ALL_LOM_PYQ_QUESTIONS } from './lom_pyq_questions_data.mjs';
import { LOM_OFFICIAL_ANSWERS } from './lom_official_answers.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'lom_diagram_urls.json'), 'utf8'));

console.log('=== VERIFYING LAWS OF MOTION PYQ DATASET ===');
console.log(`Total questions: ${ALL_LOM_PYQ_QUESTIONS.length}`);

if (ALL_LOM_PYQ_QUESTIONS.length !== 188) {
  throw new Error(`Expected exactly 188 questions, got ${ALL_LOM_PYQ_QUESTIONS.length}`);
}

const mapIndexToLetter = ['A', 'B', 'C', 'D'];
let mcqCount = 0;
let numericalCount = 0;
let diagramCount = 0;

for (let i = 0; i < ALL_LOM_PYQ_QUESTIONS.length; i++) {
  const q = ALL_LOM_PYQ_QUESTIONS[i];
  const expectedNum = i + 1;
  const officialAns = LOM_OFFICIAL_ANSWERS[expectedNum];

  if (q.qNum !== expectedNum) {
    throw new Error(`Question index mismatch at index ${i}: expected qNum ${expectedNum}, got ${q.qNum}`);
  }

  if (!q.question || q.question.trim().length === 0) {
    throw new Error(`Empty question stem for Q${q.qNum}`);
  }

  if (!q.solution || q.solution.trim().length === 0) {
    throw new Error(`Empty solution for Q${q.qNum}`);
  }

  const isNumerical = typeof officialAns === 'number' || /^\d+(\.\d+)?$/.test(String(officialAns).trim());

  if (isNumerical) {
    numericalCount++;
    if (q.question_type !== 'numerical') {
      throw new Error(`Q${q.qNum} expected question_type 'numerical', got '${q.question_type}'`);
    }
    if (q.numeric_answer !== Number(officialAns)) {
      throw new Error(`Q${q.qNum} numeric answer mismatch: expected ${officialAns}, got ${q.numeric_answer}`);
    }
    if (q.correct_option !== null) {
      throw new Error(`Q${q.qNum} numeric question should have correct_option null, got ${q.correct_option}`);
    }
  } else {
    mcqCount++;
    if (q.question_type !== 'mcq') {
      throw new Error(`Q${q.qNum} expected question_type 'mcq', got '${q.question_type}'`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Q${q.qNum} expected 4 options, got ${q.options ? q.options.length : 0}`);
    }
    const actualLetter = mapIndexToLetter[q.correct_option];
    if (actualLetter !== String(officialAns).toUpperCase()) {
      throw new Error(`Q${q.qNum} answer mismatch: official answer ${officialAns}, dataset has index ${q.correct_option} (${actualLetter})`);
    }
  }

  if (diagramUrls[q.qNum]) {
    diagramCount++;
    if (q.image_url !== diagramUrls[q.qNum]) {
      throw new Error(`Q${q.qNum} diagram URL mismatch: expected ${diagramUrls[q.qNum]}, got ${q.image_url}`);
    }
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      throw new Error(`Q${q.qNum} diagram URL is not a valid Cloudinary HTTPS URL: ${q.image_url}`);
    }
  }
}

console.log(`✅ All 188 questions verified successfully!`);
console.log(`- MCQs: ${mcqCount}`);
console.log(`- Numerical: ${numericalCount}`);
console.log(`- Diagrams attached & Cloudinary verified: ${diagramCount} / ${Object.keys(diagramUrls).length}`);
console.log(`- Official Answer Key match rate: 100% (188/188)`);
