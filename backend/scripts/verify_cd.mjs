import fs from 'fs';
import { batch1 } from './data/cd_batch1.mjs';
import { batch2 } from './data/cd_batch2.mjs';
import { batch3 } from './data/cd_batch3.mjs';
import { batch4 } from './data/cd_batch4.mjs';

const allQuestions = [...batch1, ...batch2, ...batch3, ...batch4];
const key = JSON.parse(fs.readFileSync('backend/scripts/cd_answer_key.json', 'utf8'));

console.log('=== CONTINUITY AND DIFFERENTIABILITY DATA VERIFICATION ===');
console.log('Total questions loaded:', allQuestions.length);

let errors = 0;

if (allQuestions.length !== 156) {
  console.error(`ERROR: Expected 156 questions, got ${allQuestions.length}`);
  errors++;
}

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;

  if (q.question_number !== expectedNum) {
    console.error(`ERROR at index ${i}: expected question_number ${expectedNum}, got ${q.question_number}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`ERROR Q${q.question_number}: empty question_text`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`ERROR Q${q.question_number}: empty solution`);
    errors++;
  }

  if (q.marks !== 4) {
    console.error(`ERROR Q${q.question_number}: marks should be 4, got ${q.marks}`);
    errors++;
  }

  const expectedAns = key[q.question_number];

  if (q.type === 'mcq') {
    if (!q.options || q.options.length !== 4) {
      console.error(`ERROR Q${q.question_number}: MCQ must have 4 options, got ${q.options ? q.options.length : 0}`);
      errors++;
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
      console.error(`ERROR Q${q.question_number}: invalid correct_option ${q.correct_option}`);
      errors++;
    }
    const expectedIdx = ['A', 'B', 'C', 'D'].indexOf(q.correct_option);
    if (q.correct_index !== expectedIdx) {
      console.error(`ERROR Q${q.question_number}: correct_index mismatch (expected ${expectedIdx}, got ${q.correct_index})`);
      errors++;
    }
    if (q.negative_marks !== 1) {
      console.error(`ERROR Q${q.question_number}: MCQ negative marks should be 1, got ${q.negative_marks}`);
      errors++;
    }
    if (q.correct_option !== expectedAns) {
      console.error(`ERROR Q${q.question_number}: Answer key mismatch! Got ${q.correct_option}, expected ${expectedAns}`);
      errors++;
    }
  } else if (q.type === 'integer') {
    if (q.options && q.options.length > 0) {
      console.error(`ERROR Q${q.question_number}: integer question should have empty options, got ${q.options.length}`);
      errors++;
    }
    if (!q.numeric_answer || q.numeric_answer.trim().length === 0) {
      console.error(`ERROR Q${q.question_number}: integer question missing numeric_answer`);
      errors++;
    }
    if (q.negative_marks !== 0) {
      console.error(`ERROR Q${q.question_number}: integer question negative marks should be 0, got ${q.negative_marks}`);
      errors++;
    }
    if (q.numeric_answer !== expectedAns) {
      console.error(`ERROR Q${q.question_number}: Answer key mismatch! Got ${q.numeric_answer}, expected ${expectedAns}`);
      errors++;
    }
  } else {
    console.error(`ERROR Q${q.question_number}: unknown question type ${q.type}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 156 questions verified with ZERO errors!');
} else {
  console.error(`FAILED: Found ${errors} errors.`);
  process.exit(1);
}

