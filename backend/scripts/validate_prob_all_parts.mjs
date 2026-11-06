import { PROBABILITY_PART1 } from './data/prob_part1.mjs';
import { PROBABILITY_PART2 } from './data/prob_part2.mjs';
import { PROBABILITY_PART3 } from './data/prob_part3.mjs';
import { PROBABILITY_PART4 } from './data/prob_part4.mjs';
import { PROBABILITY_PART5 } from './data/prob_part5.mjs';

const allQuestions = [
  ...PROBABILITY_PART1,
  ...PROBABILITY_PART2,
  ...PROBABILITY_PART3,
  ...PROBABILITY_PART4,
  ...PROBABILITY_PART5
];

console.log('=== VALIDATING PROBABILITY DATASET (ALL 5 PARTS) ===\n');
console.log(`Total questions loaded: ${allQuestions.length}`);

if (allQuestions.length !== 251) {
  console.error(`ERROR: Expected 251 questions, but found ${allQuestions.length}`);
  process.exit(1);
}

let errors = 0;
const seenQNums = new Set();

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;

  if (q.q_num !== expectedNum) {
    console.error(`ERROR: At index ${i}, expected q_num ${expectedNum}, got ${q.q_num}`);
    errors++;
  }

  if (seenQNums.has(q.q_num)) {
    console.error(`ERROR: Duplicate question number ${q.q_num}`);
    errors++;
  }
  seenQNums.add(q.q_num);

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR: Question ${q.q_num} has empty question_text`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`ERROR: Question ${q.q_num} has empty solution`);
    errors++;
  }

  if (q.question_type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR: Question ${q.q_num} (MCQ) does not have exactly 4 options`);
      errors++;
    }
    if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
      console.error(`ERROR: Question ${q.q_num} has invalid correct_index: ${q.correct_index}`);
      errors++;
    }
  } else if (q.question_type === 'numerical') {
    if (q.numeric_answer === undefined || q.numeric_answer === null) {
      console.error(`ERROR: Question ${q.q_num} (Numerical) has no numeric_answer`);
      errors++;
    }
  } else {
    console.error(`ERROR: Question ${q.q_num} has unknown question_type: ${q.question_type}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 251 Probability questions passed validation with 0 errors!');
  console.log(`- MCQs count: ${allQuestions.filter(q => q.question_type === 'mcq').length}`);
  console.log(`- Numerical count: ${allQuestions.filter(q => q.question_type === 'numerical').length}`);
} else {
  console.error(`Validation failed with ${errors} error(s)!`);
  process.exit(1);
}

