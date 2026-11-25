import fs from 'fs';
import { ALL_IONIC_JEE_PYQ_QUESTIONS } from './ionic_jee_pyq_questions_data.mjs';

const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/ionic_official_keys.json', 'utf8'));

console.log('====================================================');
console.log(`TOTAL QUESTIONS LOADED: ${ALL_IONIC_JEE_PYQ_QUESTIONS.length}`);
console.log('====================================================');

if (ALL_IONIC_JEE_PYQ_QUESTIONS.length !== 159) {
  console.error(`Expected exactly 159 questions, found ${ALL_IONIC_JEE_PYQ_QUESTIONS.length}`);
  process.exit(1);
}

let errors = 0;
let dummyOptionsCount = 0;
let numericalCount = 0;
let mcqCount = 0;
let imageCount = 0;
let solutionImageCount = 0;

for (let i = 0; i < ALL_IONIC_JEE_PYQ_QUESTIONS.length; i++) {
  const q = ALL_IONIC_JEE_PYQ_QUESTIONS[i];
  const expectedQNum = i + 1;

  if (q.qNum !== expectedQNum) {
    console.error(`Sequence broken: index ${i} has qNum ${q.qNum}, expected ${expectedQNum}`);
    errors++;
  }

  const offKey = officialKeys[expectedQNum];
  if (!offKey) {
    console.error(`Missing official key for Q${expectedQNum}`);
    errors++;
  }

  if (q.image_url) imageCount++;
  if (q.solution_image_url) solutionImageCount++;

  const isNumerical = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);

  if (isNumerical) {
    numericalCount++;
    if (Number(q.numeric_answer) !== Number(offKey)) {
      console.error(`Numerical answer mismatch for Q${q.qNum}: got ${q.numeric_answer}, official ${offKey}`);
      errors++;
    }
    if (Array.isArray(q.options) && q.options.length !== 0) {
      console.error(`Numerical Q${q.qNum} has non-empty options array`);
      errors++;
    }
  } else {
    mcqCount++;
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    if (q.correct_option !== offIdx) {
      console.error(`MCQ key mismatch for Q${q.qNum}: got ${q.correct_option}, official ${offIdx} (${offKey})`);
      errors++;
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`MCQ Q${q.qNum} does not have exactly 4 options`);
      errors++;
    }
    for (const opt of (q.options || [])) {
      if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
        console.error(`Empty option in Q${q.qNum}`);
        dummyOptionsCount++;
        errors++;
      }
      if (opt.startsWith('Option (') || opt.includes('Dummy') || opt.includes('Option A')) {
        console.error(`Suspicious dummy option in Q${q.qNum}: "${opt}"`);
        dummyOptionsCount++;
        errors++;
      }
    }
  }

  if (!q.question_text || q.question_text.trim().length < 10) {
    console.error(`Too short/empty question_text for Q${q.qNum}`);
    errors++;
  }
}

console.log(`MCQ Questions: ${mcqCount}`);
console.log(`Numerical Questions: ${numericalCount}`);
console.log(`Questions with question diagrams: ${imageCount}`);
console.log(`Questions with solution diagrams: ${solutionImageCount}`);
console.log(`Total dummy options: ${dummyOptionsCount}`);
console.log(`Total errors: ${errors}`);

if (errors === 0 && dummyOptionsCount === 0) {
  console.log('ALL 159 QUESTIONS VERIFIED 100% PERFECT WITH 0 ERRORS AND 0 DUMMY OPTIONS!');
} else {
  console.error('FAILED MASTER VERIFICATION!');
  process.exit(1);
}
