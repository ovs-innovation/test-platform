import fs from 'fs';
import { batch1 } from './data/parabola_batch1.mjs';
import { batch2 } from './data/parabola_batch2.mjs';
import { batch3 } from './data/parabola_batch3.mjs';

const key = JSON.parse(fs.readFileSync('backend/scripts/parabola_answer_key.json', 'utf8'));

const allQuestions = [...batch1, ...batch2, ...batch3];

console.log(`===============================================`);
console.log(`VERIFYING PARABOLA QUESTION BANK DATA`);
console.log(`Total questions loaded: ${allQuestions.length}`);
console.log(`===============================================\n`);

let errors = 0;

if (allQuestions.length !== 143) {
  console.error(`ERROR: Expected 143 questions, got ${allQuestions.length}`);
  errors++;
}

const seenNumbers = new Set();
const optionKeyToIndex = { A: 0, B: 1, C: 2, D: 3 };

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;

  if (q.question_number !== expectedNum) {
    console.error(`Error at index ${i}: expected question_number ${expectedNum}, got ${q.question_number}`);
    errors++;
  }

  if (seenNumbers.has(q.question_number)) {
    console.error(`Duplicate question_number: ${q.question_number}`);
    errors++;
  }
  seenNumbers.add(q.question_number);

  if (!q.question_text || typeof q.question_text !== 'string' || q.question_text.trim().length === 0) {
    console.error(`Q${q.question_number}: Missing question_text`);
    errors++;
  }

  if (!q.solution || typeof q.solution !== 'string' || q.solution.trim().length === 0) {
    console.error(`Q${q.question_number}: Missing solution`);
    errors++;
  }

  if (q.subject !== 'Mathematics' || q.chapter !== 'Parabola') {
    console.error(`Q${q.question_number}: Invalid subject (${q.subject}) or chapter (${q.chapter})`);
    errors++;
  }

  const expectedKeyAnswer = key[String(q.question_number)];
  if (!expectedKeyAnswer) {
    console.error(`Q${q.question_number}: Missing from official answer key`);
    errors++;
  }

  if (q.type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${q.question_number}: MCQ must have exactly 4 options, got ${q.options?.length}`);
      errors++;
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
      console.error(`Q${q.question_number}: Invalid correct_option: ${q.correct_option}`);
      errors++;
    }
    if (q.correct_index !== optionKeyToIndex[q.correct_option]) {
      console.error(`Q${q.question_number}: correct_index (${q.correct_index}) doesn't match correct_option (${q.correct_option})`);
      errors++;
    }
    if (q.correct_option !== expectedKeyAnswer) {
      console.error(`Q${q.question_number}: Key mismatch! Key=${expectedKeyAnswer}, Data=${q.correct_option}`);
      errors++;
    }
    if (q.numeric_answer !== null) {
      console.error(`Q${q.question_number}: MCQ should have numeric_answer = null`);
      errors++;
    }
  } else if (q.type === 'integer') {
    if (!Array.isArray(q.options) || q.options.length !== 0) {
      console.error(`Q${q.question_number}: Integer question options must be []`);
      errors++;
    }
    if (q.correct_option !== null || q.correct_index !== null) {
      console.error(`Q${q.question_number}: Integer question must have null correct_option and correct_index`);
      errors++;
    }
    if (!q.numeric_answer || typeof q.numeric_answer !== 'string') {
      console.error(`Q${q.question_number}: Missing numeric_answer string`);
      errors++;
    }
    if (String(q.numeric_answer).trim() !== String(expectedKeyAnswer).trim()) {
      console.error(`Q${q.question_number}: Integer mismatch! Key=${expectedKeyAnswer}, Data=${q.numeric_answer}`);
      errors++;
    }
  } else {
    console.error(`Q${q.question_number}: Unknown question type: ${q.type}`);
    errors++;
  }
}

console.log(`\n===============================================`);
if (errors === 0) {
  console.log(`SUCCESS! All 143 questions verified with 0 errors!`);
  console.log(`MCQs: ${allQuestions.filter(q => q.type === 'mcq').length}`);
  console.log(`Integer: ${allQuestions.filter(q => q.type === 'integer').length}`);
  console.log(`===============================================`);
  process.exit(0);
} else {
  console.error(`FAILED! Total errors found: ${errors}`);
  console.log(`===============================================`);
  process.exit(1);
}

