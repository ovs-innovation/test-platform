import { chemicalBatch6MCQ } from './data/chemical_batch6_mcqs.mjs';
import { chemicalBatchAR } from './data/chemical_batch_ar.mjs';

console.log('Batch 6 MCQs count:', chemicalBatch6MCQ.length);
console.log('Batch AR count:', chemicalBatchAR.length);

let errors = 0;

chemicalBatch6MCQ.forEach((q, idx) => {
  const num = idx + 190;
  if (!q.question_text || typeof q.question_text !== 'string' || q.question_text.trim() === '') {
    console.error(`Q${num}: Missing or empty question_text`);
    errors++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${num}: options must have 4 items`);
    errors++;
  }
  if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
    console.error(`Q${num}: Invalid correct_index: ${q.correct_index}`);
    errors++;
  }
  if (!q.explanation) {
    console.error(`Q${num}: Missing explanation`);
    errors++;
  }
});

chemicalBatchAR.forEach((q, idx) => {
  const num = idx + 1;
  if (!q.question_text || !q.assertion_text || !q.reason_text) {
    console.error(`AR Q${num}: Missing text`);
    errors++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`AR Q${num}: options must have 4 items`);
    errors++;
  }
  if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
    console.error(`AR Q${num}: Invalid correct_index: ${q.correct_index}`);
    errors++;
  }
  if (!q.explanation) {
    console.error(`AR Q${num}: Missing explanation`);
    errors++;
  }
});

if (errors === 0) {
  console.log('All 29 MCQs and 25 AR questions validated successfully with 0 errors!');
} else {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
}

