import { batch1Questions } from './batch1_morphology_mcq.mjs';
import { batch2Questions } from './batch2_morphology_mcq.mjs';
import { batch3Questions } from './batch3_morphology_mcq.mjs';
import { batch4Questions } from './batch4_morphology_mcq.mjs';
import { batch5ARQuestions } from './batch5_morphology_ar.mjs';

const allQuestions = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions,
  ...batch5ARQuestions
];

console.log(`Total questions across all batches: ${allQuestions.length}`);
console.log(`- Batch 1 (MCQ 1-24): ${batch1Questions.length}`);
console.log(`- Batch 2 (MCQ 25-52): ${batch2Questions.length}`);
console.log(`- Batch 3 (MCQ 53-80): ${batch3Questions.length}`);
console.log(`- Batch 4 (MCQ 81-105): ${batch4Questions.length}`);
console.log(`- Batch 5 (AR 106-128): ${batch5ARQuestions.length}`);

let errors = 0;
const validLetters = ['A', 'B', 'C', 'D'];

allQuestions.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.question_number !== expectedNum) {
    console.error(`Error at index ${idx}: question_number is ${q.question_number}, expected ${expectedNum}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim() === '') {
    console.error(`Error in Q${q.question_number}: empty question_text`);
    errors++;
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Error in Q${q.question_number}: options must be array of 4, got ${q.options?.length}`);
    errors++;
  }

  if (!validLetters.includes(q.correct_option)) {
    console.error(`Error in Q${q.question_number}: invalid correct_option "${q.correct_option}"`);
    errors++;
  }

  if (!q.solution || q.solution.trim() === '') {
    console.error(`Error in Q${q.question_number}: empty solution`);
    errors++;
  }

  if (q.image_url) {
    if (!q.image_url.startsWith('https://res.cloudinary.com')) {
      console.error(`Error in Q${q.question_number}: image_url does not start with https://res.cloudinary.com: ${q.image_url}`);
      errors++;
    }
  }

  if (q.question_type === 'assertion_reason') {
    if (!q.assertion_text || !q.reason_text) {
      console.error(`Error in AR Q${q.question_number}: missing assertion_text or reason_text`);
      errors++;
    }
  }
});

if (errors === 0) {
  console.log('\nSUCCESS: All questions passed verification with 0 errors!');
} else {
  console.error(`\nFAILED: Found ${errors} errors!`);
  process.exit(1);
}
