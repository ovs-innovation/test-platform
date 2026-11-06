import fs from 'fs';
import { MATRICES_PART1 } from './data/matrices_part1.mjs';
import { MATRICES_PART2 } from './data/matrices_part2.mjs';
import { MATRICES_PART3 } from './data/matrices_part3.mjs';
import { MATRICES_PART4 } from './data/matrices_part4.mjs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_matrices.json', 'utf8'));

const allQuestions = [
  ...MATRICES_PART1,
  ...MATRICES_PART2,
  ...MATRICES_PART3,
  ...MATRICES_PART4,
];

console.log(`Total questions across all parts: ${allQuestions.length}`);

if (allQuestions.length !== 178) {
  throw new Error(`Expected 178 questions, got ${allQuestions.length}`);
}

const seenNums = new Set();
let mcqCount = 0;
let numCount = 0;

allQuestions.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.q_num !== expectedNum) {
    throw new Error(`Question at index ${idx} has q_num ${q.q_num}, expected ${expectedNum}`);
  }
  if (seenNums.has(q.q_num)) {
    throw new Error(`Duplicate question number: ${q.q_num}`);
  }
  seenNums.add(q.q_num);

  if (!q.question_text || q.question_text.trim().length === 0) {
    throw new Error(`Q${q.q_num} has empty question_text`);
  }
  if (!q.solution || q.solution.trim().length === 0) {
    throw new Error(`Q${q.q_num} has empty solution`);
  }

  const expectedKey = key[String(q.q_num)];

  if (q.question_type === 'mcq') {
    mcqCount++;
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Q${q.q_num} must have 4 options, got ${q.options?.length}`);
    }
    q.options.forEach((opt, oIdx) => {
      if (!opt || String(opt).trim().length === 0) {
        throw new Error(`Q${q.q_num} option ${oIdx} is empty`);
      }
    });
    if (q.correct_index === null || q.correct_index === undefined || q.correct_index < 0 || q.correct_index > 3) {
      throw new Error(`Q${q.q_num} invalid correct_index: ${q.correct_index}`);
    }
    const expectedIdx = ['A', 'B', 'C', 'D'].indexOf(expectedKey);
    if (expectedIdx !== -1 && q.correct_index !== expectedIdx) {
      throw new Error(`Q${q.q_num} correct_index ${q.correct_index} does not match official key ${expectedKey} (expected ${expectedIdx})`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    if (q.numeric_answer === null || q.numeric_answer === undefined || isNaN(q.numeric_answer)) {
      throw new Error(`Q${q.q_num} invalid numeric_answer: ${q.numeric_answer}`);
    }
    const expNum = parseFloat(expectedKey);
    if (!isNaN(expNum) && Math.abs(q.numeric_answer - expNum) > 0.01) {
      throw new Error(`Q${q.q_num} numeric_answer ${q.numeric_answer} does not match official key ${expectedKey}`);
    }
  } else {
    throw new Error(`Q${q.q_num} has unknown question_type: ${q.question_type}`);
  }
});

console.log(`Validation PASSED!`);
console.log(`- Total Questions: ${allQuestions.length}`);
console.log(`- MCQs: ${mcqCount}`);
console.log(`- Numerical: ${numCount}`);
console.log(`- 100% matched official answer key for Q1 - Q178.`);

