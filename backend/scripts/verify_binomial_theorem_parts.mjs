import fs from 'fs';
import { BINOMIAL_THEOREM_PART1 } from './data/binomial_theorem_part1.mjs';
import { BINOMIAL_THEOREM_PART2 } from './data/binomial_theorem_part2.mjs';
import { BINOMIAL_THEOREM_PART3 } from './data/binomial_theorem_part3.mjs';
import { BINOMIAL_THEOREM_PART4 } from './data/binomial_theorem_part4.mjs';

const allQuestions = [
  ...BINOMIAL_THEOREM_PART1,
  ...BINOMIAL_THEOREM_PART2,
  ...BINOMIAL_THEOREM_PART3,
  ...BINOMIAL_THEOREM_PART4
];

console.log(`Total questions loaded: ${allQuestions.length}`);

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));
const letters = ['A', 'B', 'C', 'D'];

let errors = 0;
const seenQNums = new Set();

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;

  if (q.q_num !== expectedNum) {
    console.error(`Sequence error at index ${i}: expected Q${expectedNum}, got Q${q.q_num}`);
    errors++;
  }

  if (seenQNums.has(q.q_num)) {
    console.error(`Duplicate question number: Q${q.q_num}`);
    errors++;
  }
  seenQNums.add(q.q_num);

  if (!q.question_text || q.question_text.trim() === '') {
    console.error(`Empty question text at Q${q.q_num}`);
    errors++;
  }

  if (!q.solution || q.solution.trim() === '') {
    console.error(`Empty solution at Q${q.q_num}`);
    errors++;
  }

  const expectedAns = String(key[q.q_num]).trim();

  if (q.question_type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Invalid options at Q${q.q_num}: expected array of length 4`);
      errors++;
    }
    if (q.correct_index < 0 || q.correct_index > 3) {
      console.error(`Invalid correct_index at Q${q.q_num}: ${q.correct_index}`);
      errors++;
    }
    const actualAns = letters[q.correct_index];
    if (actualAns !== expectedAns) {
      console.error(`Answer mismatch at Q${q.q_num}: expected ${expectedAns}, got ${actualAns}`);
      errors++;
    }
  } else if (q.question_type === 'numerical') {
    const actualAns = String(q.numeric_answer).trim();
    if (actualAns !== expectedAns) {
      console.error(`Numerical answer mismatch at Q${q.q_num}: expected ${expectedAns}, got ${actualAns}`);
      errors++;
    }
  } else {
    console.error(`Unknown question type at Q${q.q_num}: ${q.question_type}`);
    errors++;
  }
}

if (errors === 0 && allQuestions.length === 260) {
  console.log(`\nALL 260 QUESTIONS VERIFIED PERFECTLY!`);
  console.log(`- Total count: 260 / 260`);
  console.log(`- MCQs count: ${allQuestions.filter(q => q.question_type === 'mcq').length}`);
  console.log(`- Numerical count: ${allQuestions.filter(q => q.question_type === 'numerical').length}`);
  console.log(`- 100% agreement with official answer key`);
  console.log(`- Step-by-step solutions present for all questions`);
} else {
  console.error(`\nFound ${errors} errors during verification!`);
  process.exit(1);
}

