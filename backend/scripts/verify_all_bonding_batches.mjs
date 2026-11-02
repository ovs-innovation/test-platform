import { batch1_bonding_mcq } from './batch1_bonding_mcq.mjs';
import { batch2_bonding_mcq } from './batch2_bonding_mcq.mjs';
import { batch3_bonding_mcq } from './batch3_bonding_mcq.mjs';
import { batch4_bonding_mcq } from './batch4_bonding_mcq.mjs';
import { batch5_bonding_ar } from './batch5_bonding_ar.mjs';

const allQuestions = [
  ...batch1_bonding_mcq,
  ...batch2_bonding_mcq,
  ...batch3_bonding_mcq,
  ...batch4_bonding_mcq,
  ...batch5_bonding_ar
];

console.log('--- Chemical Bonding Batches Verification ---');
console.log(`Batch 1 MCQs: ${batch1_bonding_mcq.length}`);
console.log(`Batch 2 MCQs: ${batch2_bonding_mcq.length}`);
console.log(`Batch 3 MCQs: ${batch3_bonding_mcq.length}`);
console.log(`Batch 4 MCQs: ${batch4_bonding_mcq.length}`);
console.log(`Batch 5 ARs:  ${batch5_bonding_ar.length}`);
console.log(`Total Questions: ${allQuestions.length}`);

let errors = 0;
let mcqCount = 0;
let arCount = 0;
let diagramCount = 0;

allQuestions.forEach((q, idx) => {
  const num = idx + 1;
  if (!q.question_text || q.question_text.trim() === '') {
    console.error(`[Error Q${num}] Empty question_text`);
    errors++;
  }
  if (q.question_text && q.question_text.includes('<img')) {
    console.error(`[Error Q${num}] Contains <img tag in question_text`);
    errors++;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`[Error Q${num}] Options length is not 4`);
    errors++;
  }
  if (q.correct_option === undefined || q.correct_option < 0 || q.correct_option > 3) {
    console.error(`[Error Q${num}] Invalid correct_option: ${q.correct_option}`);
    errors++;
  }
  if (!q.solution || q.solution.trim() === '') {
    console.error(`[Error Q${num}] Empty solution`);
    errors++;
  }
  if (q.question_type === 'assertion_reason') {
    arCount++;
    if (!q.assertion_text || !q.reason_text) {
      console.error(`[Error Q${num}] AR missing assertion_text or reason_text`);
      errors++;
    }
  } else if (q.question_type === 'single_choice') {
    mcqCount++;
  } else {
    console.error(`[Error Q${num}] Unknown question_type: ${q.question_type}`);
    errors++;
  }
  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      console.error(`[Error Q${num}] Invalid image_url: ${q.image_url}`);
      errors++;
    }
  }
});

console.log(`MCQ count: ${mcqCount}`);
console.log(`AR count: ${arCount}`);
console.log(`Diagram count: ${diagramCount}`);
console.log(`Total errors: ${errors}`);

if (errors === 0 && allQuestions.length === 168 && arCount === 12 && mcqCount === 156) {
  console.log('✅ ALL 168 QUESTIONS VALIDATED PERFECTLY WITH ZERO ERRORS!');
} else {
  console.error('❌ VALIDATION FAILED!');
  process.exit(1);
}

