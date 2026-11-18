import { ALL_MOTION1D_PYQ_QUESTIONS } from './motion1d_pyq_questions_data.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

console.log('=== VERIFYING MOTION IN ONE DIMENSION DATASET ===');
console.log(`Total questions: ${ALL_MOTION1D_PYQ_QUESTIONS.length}`);

if (ALL_MOTION1D_PYQ_QUESTIONS.length !== 157) {
  throw new Error(`Expected 157 questions, got ${ALL_MOTION1D_PYQ_QUESTIONS.length}`);
}

let mcqCount = 0;
let numCount = 0;
let diagramCount = 0;
const errors = [];

const indexToLetter = ['A', 'B', 'C', 'D'];

for (let i = 0; i < ALL_MOTION1D_PYQ_QUESTIONS.length; i++) {
  const q = ALL_MOTION1D_PYQ_QUESTIONS[i];
  const qNum = i + 1;

  if (q.qNum !== qNum) {
    errors.push(`Q${qNum}: qNum mismatch (${q.qNum})`);
  }

  if (!q.question || q.question.trim().length === 0) {
    errors.push(`Q${qNum}: empty question text`);
  }

  if (!q.solution || q.solution.trim().length === 0) {
    errors.push(`Q${qNum}: empty solution`);
  }

  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      errors.push(`Q${qNum}: invalid image_url (${q.image_url})`);
    }
  }

  const officialAns = MOTION1D_OFFICIAL_ANSWERS[qNum];

  if (q.question_type === 'numerical') {
    numCount++;
    if (q.numeric_answer === null || isNaN(q.numeric_answer)) {
      errors.push(`Q${qNum}: numerical question has null/NaN numeric_answer`);
    }
    if (Number(q.numeric_answer) !== Number(officialAns)) {
      errors.push(`Q${qNum}: numeric_answer ${q.numeric_answer} !== official ${officialAns}`);
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Q${qNum}: MCQ does not have 4 options (${q.options?.length})`);
    }
    const expectedLetter = String(officialAns).toUpperCase();
    const actualLetter = indexToLetter[q.correct_option];
    if (actualLetter !== expectedLetter) {
      errors.push(`Q${qNum}: correct_option ${actualLetter} !== official ${expectedLetter}`);
    }
  } else {
    errors.push(`Q${qNum}: unknown question_type ${q.question_type}`);
  }
}

console.log(`MCQ questions: ${mcqCount}`);
console.log(`Numerical questions: ${numCount}`);
console.log(`Questions with Cloudinary diagrams: ${diagramCount}`);

if (errors.length > 0) {
  console.error(`Found ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error('  ', e));
  process.exit(1);
} else {
  console.log('ALL 157 QUESTIONS VERIFIED 100% ACCURATE AND COMPLETE!');
}
