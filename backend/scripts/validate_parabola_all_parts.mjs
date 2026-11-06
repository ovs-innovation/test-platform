import fs from 'fs';
import { PARABOLA_PART1 } from './data/parabola_part1.mjs';
import { PARABOLA_PART2 } from './data/parabola_part2.mjs';
import { PARABOLA_PART3 } from './data/parabola_part3.mjs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_parabola.json', 'utf8'));

const allQuestions = [...PARABOLA_PART1, ...PARABOLA_PART2, ...PARABOLA_PART3];

console.log(`Total questions across all parts: ${allQuestions.length}`);

if (allQuestions.length !== 143) {
  throw new Error(`Expected 143 questions, got ${allQuestions.length}`);
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
    const actualLetter = ['A', 'B', 'C', 'D'][q.correct_index];
    if (actualLetter !== expectedKey) {
      throw new Error(`Q${q.q_num} answer mismatch: expected ${expectedKey}, got ${actualLetter}`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    if (q.numeric_answer === null || q.numeric_answer === undefined || Number.isNaN(Number(q.numeric_answer))) {
      throw new Error(`Q${q.q_num} invalid numeric_answer: ${q.numeric_answer}`);
    }
    const actualNum = String(q.numeric_answer);
    if (actualNum !== expectedKey) {
      throw new Error(`Q${q.q_num} numerical answer mismatch: expected ${expectedKey}, got ${actualNum}`);
    }
  } else {
    throw new Error(`Q${q.q_num} unknown question_type: ${q.question_type}`);
  }
});

console.log(`Validation passed 100%!`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numerical: ${numCount}`);
console.log(`All 143 questions verified against official answer key!`);

