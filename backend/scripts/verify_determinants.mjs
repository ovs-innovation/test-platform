import fs from 'fs';
import { batch1 } from './data/determinants_batch1.mjs';
import { batch2 } from './data/determinants_batch2.mjs';
import { batch3 } from './data/determinants_batch3.mjs';
import { batch4 } from './data/determinants_batch4.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/determinants_answer_key.json', 'utf8'));

const allBatches = [
  { name: 'Batch 1', data: batch1, start: 1, end: 61 },
  { name: 'Batch 2', data: batch2, start: 62, end: 122 },
  { name: 'Batch 3', data: batch3, start: 123, end: 183 },
  { name: 'Batch 4', data: batch4, start: 184, end: 244 }
];

console.log('=== VERIFYING DETERMINANTS CHAPTER (244 QUESTIONS) ===\n');

let totalQuestions = 0;
let errors = 0;
const seenQNums = new Set();
const optionLetters = ['A', 'B', 'C', 'D'];

for (const b of allBatches) {
  console.log(`Checking ${b.name}: ${b.data.length} questions (expected ${b.end - b.start + 1})...`);
  if (b.data.length !== (b.end - b.start + 1)) {
    console.error(`ERROR: ${b.name} has ${b.data.length} questions, expected ${b.end - b.start + 1}`);
    errors++;
  }

  for (const q of b.data) {
    totalQuestions++;
    const qNum = q.question_number;

    if (seenQNums.has(qNum)) {
      console.error(`ERROR: Duplicate question number ${qNum}`);
      errors++;
    }
    seenQNums.add(qNum);

    if (qNum < b.start || qNum > b.end) {
      console.error(`ERROR: Question ${qNum} out of range for ${b.name}`);
      errors++;
    }

    if (!q.question_text || q.question_text.trim().length === 0) {
      console.error(`ERROR: Question ${qNum} has empty question_text`);
      errors++;
    }

    if (!q.solution || q.solution.trim().length === 0) {
      console.error(`ERROR: Question ${qNum} has empty solution`);
      errors++;
    }

    const expectedAnswer = String(officialKey[qNum]);
    const isMcq = (q.type === 'mcq');
    const isInteger = (q.type === 'integer' || q.type === 'numeric');

    if (isMcq) {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`ERROR: Question ${qNum} is MCQ but does not have 4 options`);
        errors++;
      }

      if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
        console.error(`ERROR: Question ${qNum} has invalid correct_option: ${q.correct_option}`);
        errors++;
      }

      if (q.correct_index !== optionLetters.indexOf(q.correct_option)) {
        console.error(`ERROR: Question ${qNum} correct_index mismatch (${q.correct_index} vs ${q.correct_option})`);
        errors++;
      }

      if (q.correct_option !== expectedAnswer) {
        console.error(`MISMATCH: Question ${qNum} MCQ answer ${q.correct_option} !== official ${expectedAnswer}`);
        errors++;
      }
    } else if (isInteger) {
      if (q.numeric_answer === null || q.numeric_answer === undefined) {
        console.error(`ERROR: Question ${qNum} is Integer but numeric_answer is null`);
        errors++;
      }

      if (String(q.numeric_answer).trim() !== expectedAnswer.trim()) {
        console.error(`MISMATCH: Question ${qNum} integer answer ${q.numeric_answer} !== official ${expectedAnswer}`);
        errors++;
      }
    } else {
      console.error(`ERROR: Question ${qNum} has unknown type: ${q.type}`);
      errors++;
    }
  }
}

console.log(`\nVerification Summary:`);
console.log(`- Total Questions checked: ${totalQuestions} / 244`);
console.log(`- Total Errors/Mismatches: ${errors}`);

if (errors === 0 && totalQuestions === 244) {
  console.log('\nSUCCESS! All 244 questions match the official key and pass all schema validations perfectly!');
} else {
  console.error('\nFAILURE! There are verification errors that must be fixed.');
  process.exit(1);
}
