import { batch5Questions } from './batch5_zoo_mcq.mjs';
import { batch6Questions } from './batch6_zoo_mcq.mjs';
import { batch7Questions } from './batch7_zoo_ar.mjs';

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

verifyQuestions('Batch 5 (MCQs)', batch5Questions, 'single_choice');
verifyQuestions('Batch 6 (MCQs)', batch6Questions, 'single_choice');
verifyQuestions('Batch 7 (ARs)', batch7Questions, 'assertion_reason');

console.log(`\nALL 3 BATCHES VERIFIED: ${batch5Questions.length + batch6Questions.length + batch7Questions.length} TOTAL QUESTIONS!`);
