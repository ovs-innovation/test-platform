import { ellipseBatch1 } from './data/ellipse_batch1.mjs';
import { ellipseBatch2 } from './data/ellipse_batch2.mjs';
import { ellipseBatch3 } from './data/ellipse_batch3.mjs';
import { ellipseBatch4 } from './data/ellipse_batch4.mjs';

const allQuestions = [...ellipseBatch1, ...ellipseBatch2, ...ellipseBatch3, ...ellipseBatch4];
console.log(`Total questions loaded: ${allQuestions.length}`);

let errors = 0;
allQuestions.forEach((q, idx) => {
  const num = idx + 1;
  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q${num}: Missing question_text`);
    errors++;
  }
  if (!q.solution || q.solution.trim().length === 0) {
    console.error(`Q${num}: Missing solution`);
    errors++;
  }
  if (q.marks !== 4) {
    console.error(`Q${num}: Expected marks 4, got ${q.marks}`);
    errors++;
  }
  if (q.type === 'mcq') {
    if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
      console.error(`Q${num}: Invalid correct_option for MCQ: ${q.correct_option}`);
      errors++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`Q${num}: Expected 4 options, got ${q.options ? q.options.length : 0}`);
      errors++;
    }
    if (q.correct_index === undefined || q.correct_index === null || q.correct_index < 0 || q.correct_index > 3) {
      console.error(`Q${num}: Invalid correct_index for MCQ: ${q.correct_index}`);
      errors++;
    }
  } else if (q.type === 'integer' || q.type === 'numerical') {
    if (q.options && q.options.length > 0) {
      console.error(`Q${num}: Numerical question should have 0 options, got ${q.options.length}`);
      errors++;
    }
    if (!q.numeric_answer || isNaN(Number(q.numeric_answer))) {
      console.error(`Q${num}: Numerical answer should be a number, got "${q.numeric_answer}"`);
      errors++;
    }
  } else {
    console.error(`Q${num}: Unknown type ${q.type}`);
    errors++;
  }
});

console.log(`Validation complete. Total errors: ${errors}`);
if (errors === 0) {
  console.log('ALL 134 ELLIPSE QUESTIONS VALIDATED SUCCESSFULLY!');
}
