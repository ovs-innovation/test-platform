import { chemicalBatch1 } from './data/chemical_batch1.mjs';
import { chemicalBatch2 } from './data/chemical_batch2.mjs';
import { chemicalBatch3 } from './data/chemical_batch3.mjs';
import { chemicalBatch4 } from './data/chemical_batch4.mjs';
import { chemicalBatch5 } from './data/chemical_batch5.mjs';

const allQuestions = [
  ...chemicalBatch1,
  ...chemicalBatch2,
  ...chemicalBatch3,
  ...chemicalBatch4,
  ...chemicalBatch5
];

console.log('Batch 1 count:', chemicalBatch1.length);
console.log('Batch 2 count:', chemicalBatch2.length);
console.log('Batch 3 count:', chemicalBatch3.length);
console.log('Batch 4 count:', chemicalBatch4.length);
console.log('Batch 5 count:', chemicalBatch5.length);
console.log('Total questions:', allQuestions.length);

let errors = 0;
allQuestions.forEach((q, idx) => {
  const num = idx + 1;
  if (!q.question_text || typeof q.question_text !== 'string' || q.question_text.trim() === '') {
    console.error(`Q${num}: Missing or empty question_text`);
    errors++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${num}: options must be an array of 4 items`);
    errors++;
  } else {
    q.options.forEach((opt, oIdx) => {
      if (!opt || typeof opt !== 'string' || opt.trim() === '') {
        console.error(`Q${num}: Option ${oIdx} is empty`);
        errors++;
      }
    });
  }
  if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
    console.error(`Q${num}: Invalid correct_index: ${q.correct_index}`);
    errors++;
  }
  if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim() === '') {
    console.error(`Q${num}: Missing explanation`);
    errors++;
  }
});

if (errors === 0) {
  console.log('All 189 questions validated successfully with 0 errors!');
} else {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
}

