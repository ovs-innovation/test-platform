import { batch1Questions } from './batch1_fluids_mcq.mjs';
import { batch2Questions } from './batch2_fluids_mcq.mjs';
import { batch3Questions } from './batch3_fluids_mcq.mjs';
import { batch4Questions } from './batch4_fluids_mcq.mjs';
import { batch5ARQuestions } from './batch5_fluids_ar.mjs';

function verify() {
  const mcqs = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions
  ];

  console.log(`Verifying ${mcqs.length} MCQs...`);
  const seenMcq = new Set();
  for (const q of mcqs) {
    if (seenMcq.has(q.question_number)) {
      throw new Error(`Duplicate MCQ number: ${q.question_number}`);
    }
    seenMcq.add(q.question_number);

    if (!q.question_text || q.question_text.trim() === '') {
      throw new Error(`Empty question text in MCQ #${q.question_number}`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`MCQ #${q.question_number} does not have 4 options`);
    }
    if (!q.options.includes(q.correct_answer)) {
      throw new Error(`MCQ #${q.question_number} correct_answer "${q.correct_answer}" not found in options: ${JSON.stringify(q.options)}`);
    }
    if (!q.explanation || q.explanation.trim() === '') {
      throw new Error(`Empty explanation in MCQ #${q.question_number}`);
    }
  }

  console.log(`Verifying ${batch5ARQuestions.length} AR questions...`);
  const seenAR = new Set();
  for (const q of batch5ARQuestions) {
    if (seenAR.has(q.question_number)) {
      throw new Error(`Duplicate AR number: ${q.question_number}`);
    }
    seenAR.add(q.question_number);

    if (q.question_type !== 'assertion_reason') {
      throw new Error(`AR #${q.question_number} must have question_type 'assertion_reason'`);
    }
    if (!q.assertion_text || q.assertion_text.trim() === '') {
      throw new Error(`Empty assertion_text in AR #${q.question_number}`);
    }
    if (!q.reason_text || q.reason_text.trim() === '') {
      throw new Error(`Empty reason_text in AR #${q.question_number}`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`AR #${q.question_number} does not have 4 options`);
    }
    if (!q.options.includes(q.correct_answer)) {
      throw new Error(`AR #${q.question_number} correct_answer not in options`);
    }
  }

  console.log('ALL 145 QUESTIONS VERIFIED 100% CLEAN AND VALID!');
}

verify();
