import { batch1Questions } from './batch1_breathing_mcq.mjs';
import { batch2Questions } from './batch2_breathing_mcq.mjs';
import { batch3Questions } from './batch3_breathing_mcq.mjs';
import { batch4Questions } from './batch4_breathing_mcq.mjs';
import { batch5Questions } from './batch5_breathing_mcq.mjs';
import { batch6Questions } from './batch6_breathing_ar.mjs';

function verifyQuestions(name, list, expectedType) {
  console.log(`\nVerifying ${name}: ${list.length} questions`);
  let errors = 0;
  list.forEach((q, idx) => {
    if (!q.question_text || q.question_text.trim() === '') {
      console.error(`[${name}] Q#${idx + 1}: Missing question_text`);
      errors++;
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`[${name}] Q#${idx + 1}: Options length is not 4`);
      errors++;
    }
    if (!q.correct_answer || !q.options.includes(q.correct_answer)) {
      console.error(`[${name}] Q#${idx + 1}: correct_answer "${q.correct_answer}" not in options!`);
      errors++;
    }
    if (!q.explanation || q.explanation.trim() === '') {
      console.error(`[${name}] Q#${idx + 1}: Missing explanation`);
      errors++;
    }
    if (expectedType === 'assertion_reason') {
      if (q.question_type !== 'assertion_reason') {
        console.error(`[${name}] Q#${idx + 1}: Expected question_type = 'assertion_reason'`);
        errors++;
      }
      if (!q.assertion_text || !q.reason_text) {
        console.error(`[${name}] Q#${idx + 1}: Missing assertion_text or reason_text`);
        errors++;
      }
    }
  });

  if (errors === 0) {
    console.log(`[PASS] ${name} (${list.length} questions) is valid!`);
  } else {
    console.error(`[FAIL] ${name} has ${errors} errors!`);
    process.exit(1);
  }
}

verifyQuestions('Batch 1 (MCQs)', batch1Questions, 'single_choice');
verifyQuestions('Batch 2 (MCQs)', batch2Questions, 'single_choice');
verifyQuestions('Batch 3 (MCQs)', batch3Questions, 'single_choice');
verifyQuestions('Batch 4 (MCQs)', batch4Questions, 'single_choice');
verifyQuestions('Batch 5 (MCQs)', batch5Questions, 'single_choice');
verifyQuestions('Batch 6 (ARs)', batch6Questions, 'assertion_reason');

const total = batch1Questions.length + batch2Questions.length + batch3Questions.length +
              batch4Questions.length + batch5Questions.length + batch6Questions.length;

console.log(`\n======================================================`);
console.log(`ALL 6 BATCHES VERIFIED: ${total} TOTAL QUESTIONS (117 MCQs + 7 ARs)!`);
console.log(`======================================================`);
