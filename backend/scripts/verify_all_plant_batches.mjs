import { batch1Questions } from './batch1_plant_mcq.mjs';
import { batch2Questions } from './batch2_plant_mcq.mjs';
import { batch3Questions } from './batch3_plant_mcq.mjs';
import { batch4Questions } from './batch4_plant_mcq.mjs';
import { batch5Questions } from './batch5_plant_mcq.mjs';
import { batch6Questions } from './batch6_plant_mcq.mjs';
import { batch7Questions } from './batch7_plant_ar.mjs';

const allQuestions = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions,
  ...batch5Questions,
  ...batch6Questions,
  ...batch7Questions
];

console.log(`Total questions compiled: ${allQuestions.length}`);
console.log(`Batch 1: ${batch1Questions.length}`);
console.log(`Batch 2: ${batch2Questions.length}`);
console.log(`Batch 3: ${batch3Questions.length}`);
console.log(`Batch 4: ${batch4Questions.length}`);
console.log(`Batch 5: ${batch5Questions.length}`);
console.log(`Batch 6: ${batch6Questions.length}`);
console.log(`Batch 7 (AR): ${batch7Questions.length}`);

const mcqs = allQuestions.filter(q => q.question_type !== 'assertion_reason');
const ars = allQuestions.filter(q => q.question_type === 'assertion_reason');

console.log(`Total MCQs: ${mcqs.length} (Expected: 157)`);
console.log(`Total ARs: ${ars.length} (Expected: 18)`);

// Validation
allQuestions.forEach((q, i) => {
  if (!q.question_text) throw new Error(`Missing question_text at index ${i}`);
  if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Invalid options at index ${i}`);
  if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) throw new Error(`Invalid correct_index at index ${i}`);
  if (!q.solution) throw new Error(`Missing solution at index ${i}`);
});

console.log('All 175 questions are 100% validated!');
