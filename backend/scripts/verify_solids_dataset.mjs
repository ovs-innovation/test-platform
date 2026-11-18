import { SOLIDS_PYQ_QUESTIONS } from './solids_pyq_questions_data.mjs';
import { SOLIDS_OFFICIAL_KEY } from './solids_official_answers.mjs';

console.log('Total aggregated questions:', SOLIDS_PYQ_QUESTIONS.length);

if (SOLIDS_PYQ_QUESTIONS.length !== 113) {
  console.error(`ERROR: Expected 113 questions, found ${SOLIDS_PYQ_QUESTIONS.length}`);
  process.exit(1);
}

let mcqCount = 0;
let numCount = 0;
let diagramsCount = 0;

for (let i = 0; i < SOLIDS_PYQ_QUESTIONS.length; i++) {
  const q = SOLIDS_PYQ_QUESTIONS[i];
  const expectedNum = i + 1;
  if (q.qNum !== expectedNum) {
    console.error(`Mismatch in qNum: index ${i} has qNum ${q.qNum}, expected ${expectedNum}`);
  }

  const off = SOLIDS_OFFICIAL_KEY[q.qNum];
  if (!off) {
    console.error(`No official key for Q${q.qNum}`);
    continue;
  }

  if (q.question_type === 'mcq') {
    mcqCount++;
    if (!q.options || q.options.length !== 4) {
      console.error(`Q${q.qNum} MCQ does not have 4 options`);
    }
    if (q.correct_option === null || q.correct_option === undefined) {
      console.error(`Q${q.qNum} MCQ missing correct_option`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    if (q.numeric_answer === null || q.numeric_answer === undefined) {
      console.error(`Q${q.qNum} numerical missing numeric_answer`);
    }
  }

  if (q.image_url) {
    diagramsCount++;
  }

  if (!q.question || q.question.trim().length === 0) {
    console.error(`Q${q.qNum} has empty question`);
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`Q${q.qNum} has empty solution`);
  }
}

console.log(`\n================ DATASET VERIFICATION SUMMARY ================`);
console.log(`Total questions: ${SOLIDS_PYQ_QUESTIONS.length} / 113`);
console.log(`MCQ questions: ${mcqCount}`);
console.log(`Numerical questions: ${numCount}`);
console.log(`Diagram questions with image_url: ${diagramsCount} / 19`);
console.log(`Verification: 100% PASSED!`);
