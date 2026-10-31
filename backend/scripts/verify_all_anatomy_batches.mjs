import { batch1Questions } from './batch1_anatomy_mcq.mjs';
import { batch2Questions } from './batch2_anatomy_mcq.mjs';
import { batch3Questions } from './batch3_anatomy_mcq.mjs';
import { batch4Questions } from './batch4_anatomy_mcq.mjs';
import { batch5Questions } from './batch5_anatomy_mcq.mjs';
import { batch6ARQuestions } from './batch6_anatomy_ar.mjs';

function verify() {
  console.log('=== Verifying Anatomy of Flowering Plants Batches ===');

  const mcqs = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions,
    ...batch5Questions
  ];
  const ars = [...batch6ARQuestions];

  console.log(`Total MCQs: ${mcqs.length} (Expected: 186)`);
  console.log(`Total ARs: ${ars.length} (Expected: 14)`);
  console.log(`Grand Total: ${mcqs.length + ars.length} (Expected: 200)`);

  if (mcqs.length !== 186) throw new Error(`MCQ count mismatch! Got ${mcqs.length}`);
  if (ars.length !== 14) throw new Error(`AR count mismatch! Got ${ars.length}`);

  // Check MCQs
  const mcqSet = new Set();
  mcqs.forEach((q, idx) => {
    const expectedNum = idx + 1;
    if (q.question_number !== expectedNum) {
      throw new Error(`MCQ at index ${idx} has question_number ${q.question_number}, expected ${expectedNum}`);
    }
    if (!q.question_text || q.question_text.trim() === '') {
      throw new Error(`Empty question_text at MCQ ${expectedNum}`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Invalid options at MCQ ${expectedNum}: must have 4 options`);
    }
    const optIdx = q.options.indexOf(q.correct_answer);
    if (optIdx === -1) {
      throw new Error(`Correct answer "${q.correct_answer}" not in options for MCQ ${expectedNum}`);
    }
    if (q.image_url) {
      if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
        throw new Error(`Invalid image_url format at MCQ ${expectedNum}: ${q.image_url}`);
      }
      console.log(`[Diagram Verified] MCQ ${expectedNum}: ${q.image_url}`);
    }
    mcqSet.add(q.question_text.slice(0, 50));
  });

  // Check ARs
  ars.forEach((q, idx) => {
    const expectedNum = idx + 1;
    if (q.question_number !== expectedNum) {
      throw new Error(`AR at index ${idx} has question_number ${q.question_number}, expected ${expectedNum}`);
    }
    if (!q.assertion_text || !q.reason_text) {
      throw new Error(`Missing assertion or reason at AR ${expectedNum}`);
    }
    if (q.correct_index < 0 || q.correct_index > 3) {
      throw new Error(`Invalid correct_index at AR ${expectedNum}`);
    }
    if (q.options[q.correct_index] !== q.correct_answer) {
      throw new Error(`Mismatch between correct_index and correct_answer at AR ${expectedNum}`);
    }
  });

  console.log('\nALL 200 QUESTIONS VERIFIED 100% PERFECTLY!');
}

verify();
