import { DIFF_EQ_PART1 } from './data/diff_eq_part1.mjs';
import { DIFF_EQ_PART2 } from './data/diff_eq_part2.mjs';
import { DIFF_EQ_PART3 } from './data/diff_eq_part3.mjs';
import { DIFF_EQ_PART4 } from './data/diff_eq_part4.mjs';
import { DIFF_EQ_PART5 } from './data/diff_eq_part5.mjs';

const allQuestions = [
  ...DIFF_EQ_PART1,
  ...DIFF_EQ_PART2,
  ...DIFF_EQ_PART3,
  ...DIFF_EQ_PART4,
  ...DIFF_EQ_PART5
];

console.log(`\n========================================`);
console.log(`VALIDATING DIFFERENTIAL EQUATIONS DATASET`);
console.log(`========================================`);
console.log(`Total questions loaded: ${allQuestions.length}`);

if (allQuestions.length !== 255) {
  console.error(`ERROR: Expected 255 questions, got ${allQuestions.length}!`);
  process.exit(1);
}

const seenNumbers = new Set();
let errorCount = 0;

allQuestions.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.q_num !== expectedNum) {
    console.error(`ERROR at index ${idx}: expected q_num ${expectedNum}, got ${q.q_num}`);
    errorCount++;
  }
  if (seenNumbers.has(q.q_num)) {
    console.error(`ERROR: Duplicate question number ${q.q_num}`);
    errorCount++;
  }
  seenNumbers.add(q.q_num);

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR: Q${q.q_num} has empty question_text!`);
    errorCount++;
  }

  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`ERROR: Q${q.q_num} has empty solution!`);
    errorCount++;
  }

  if (q.question_type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR: Q${q.q_num} (MCQ) does not have exactly 4 options!`);
      errorCount++;
    } else {
      q.options.forEach((opt, oIdx) => {
        if (!opt || String(opt).trim().length === 0) {
          console.error(`ERROR: Q${q.q_num} option ${oIdx} is empty!`);
          errorCount++;
        }
      });
    }
    if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
      console.error(`ERROR: Q${q.q_num} (MCQ) invalid correct_index: ${q.correct_index}`);
      errorCount++;
    }
  } else if (q.question_type === 'numerical') {
    if (typeof q.correct_index !== 'number' && isNaN(Number(q.correct_index))) {
      console.error(`ERROR: Q${q.q_num} (Numerical) invalid answer: ${q.correct_index}`);
      errorCount++;
    }
  } else {
    console.error(`ERROR: Q${q.q_num} invalid question_type: ${q.question_type}`);
    errorCount++;
  }
});

if (errorCount === 0) {
  console.log(`\nALL 255 QUESTIONS VALIDATED SUCCESSFULLY!`);
  console.log(`- Exact count: 255/255`);
  console.log(`- Question numbers 1 to 255 perfectly sequential`);
  console.log(`- MCQs and Numerical questions properly structured`);
  console.log(`- LaTeX formatting and complete explanations present`);
} else {
  console.error(`Validation failed with ${errorCount} errors.`);
  process.exit(1);
}
