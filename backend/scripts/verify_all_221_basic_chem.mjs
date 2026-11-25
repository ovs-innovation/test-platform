import fs from 'fs';
import { ALL_BASIC_CHEM_QUESTIONS } from './basic_chem_jee_pyq_questions_data.mjs';

const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/basic_chem_official_keys.json', 'utf8'));

console.log('=== MASTER VERIFICATION FOR ALL 221 QUESTIONS ===');
let errors = 0;

if (ALL_BASIC_CHEM_QUESTIONS.length !== 221) {
  console.error(`ERROR: Expected 221 questions, got ${ALL_BASIC_CHEM_QUESTIONS.length}`);
  errors++;
}

const seenNums = new Set();
let mcqCount = 0;
let numericalCount = 0;
let diagramsCount = 0;

for (let i = 0; i < ALL_BASIC_CHEM_QUESTIONS.length; i++) {
  const q = ALL_BASIC_CHEM_QUESTIONS[i];
  const expectedNum = i + 1;

  if (q.qNum !== expectedNum) {
    console.error(`ERROR at index ${i}: Expected qNum ${expectedNum}, got ${q.qNum}`);
    errors++;
  }

  if (seenNums.has(q.qNum)) {
    console.error(`ERROR: Duplicate question number ${q.qNum}`);
    errors++;
  }
  seenNums.add(q.qNum);

  const off = officialKeys[q.qNum];
  if (!off) {
    console.error(`ERROR: Missing official key for Q${q.qNum}`);
    errors++;
  }

  if (q.question_type === 'mcq') {
    mcqCount++;
    const letters = ['A', 'B', 'C', 'D'];
    const myLetter = letters[q.correct_option];
    if (myLetter !== off) {
      console.error(`ERROR Key mismatch Q${q.qNum}: ours=${myLetter}, official=${off}`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`ERROR Options length != 4 for Q${q.qNum}`);
      errors++;
    }
    for (const opt of q.options) {
      if (typeof opt !== 'string' || opt.startsWith('Option (')) {
        console.error(`ERROR Dummy option in Q${q.qNum}: ${opt}`);
        errors++;
      }
    }
  } else if (q.question_type === 'numerical') {
    numericalCount++;
    if (String(q.numeric_answer).trim() !== String(off).trim()) {
      console.error(`ERROR Numerical answer mismatch Q${q.qNum}: ours=${q.numeric_answer}, official=${off}`);
      errors++;
    }
  } else {
    console.error(`ERROR Unknown question type for Q${q.qNum}: ${q.question_type}`);
    errors++;
  }

  if (!q.question || q.question.trim().length < 5) {
    console.error(`ERROR Question stem too short or empty for Q${q.qNum}`);
    errors++;
  }
  if (!q.solution || q.solution.trim().length < 5) {
    console.error(`ERROR Solution too short or empty for Q${q.qNum}`);
    errors++;
  }

  if (q.image_url) {
    diagramsCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      console.error(`ERROR Invalid diagram URL for Q${q.qNum}: ${q.image_url}`);
      errors++;
    }
  }
  if (q.solution_image_url) {
    diagramsCount++;
    if (!q.solution_image_url.startsWith('https://res.cloudinary.com/')) {
      console.error(`ERROR Invalid solution diagram URL for Q${q.qNum}: ${q.solution_image_url}`);
      errors++;
    }
  }
}

console.log('--- Summary ---');
console.log(`Total questions: ${ALL_BASIC_CHEM_QUESTIONS.length}`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numericals: ${numericalCount}`);
console.log(`Diagram references: ${diagramsCount}`);
console.log(`Total verification errors: ${errors}`);

if (errors === 0) {
  console.log('SUCCESS: All 221 questions passed master verification flawlessly!');
} else {
  console.error(`FAILURE: ${errors} errors detected.`);
  process.exit(1);
}
