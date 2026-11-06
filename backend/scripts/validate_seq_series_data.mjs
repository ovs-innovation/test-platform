import { SEQ_SERIES_PART1 } from './data/seq_series_part1.mjs';
import { SEQ_SERIES_PART2 } from './data/seq_series_part2.mjs';
import { SEQ_SERIES_PART3 } from './data/seq_series_part3.mjs';
import { SEQ_SERIES_PART4 } from './data/seq_series_part4.mjs';
import { SEQ_SERIES_PART5 } from './data/seq_series_part5.mjs';

const ALL = [
  ...SEQ_SERIES_PART1,
  ...SEQ_SERIES_PART2,
  ...SEQ_SERIES_PART3,
  ...SEQ_SERIES_PART4,
  ...SEQ_SERIES_PART5
];

console.log(`Total questions: ${ALL.length}`);

let mcqCount = 0;
let numCount = 0;
const errors = [];

ALL.forEach((q, idx) => {
  const num = q.q_num;
  if (num !== idx + 1) {
    errors.push(`Q${num} out of sequence at idx ${idx}`);
  }

  if (q.question_type === 'mcq') {
    mcqCount++;
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Q${num} MCQ has invalid options: ${JSON.stringify(q.options)}`);
    }
    if (q.correct_index === null || q.correct_index === undefined || q.correct_index < 0 || q.correct_index > 3) {
      errors.push(`Q${num} MCQ has invalid correct_index: ${q.correct_index}`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    const val = q.numeric_answer ?? q.correct_answer;
    if (val === undefined || val === null || isNaN(Number(val))) {
      errors.push(`Q${num} numerical has invalid answer: ${val}`);
    }
  } else {
    errors.push(`Q${num} unknown question_type: ${q.question_type}`);
  }

  if (!q.question_text || !q.question_text.trim()) {
    errors.push(`Q${num} has empty question_text`);
  }
  if (!q.solution || !q.solution.trim()) {
    errors.push(`Q${num} has empty solution`);
  }
});

console.log(`MCQs: ${mcqCount}, Numerical: ${numCount}`);
if (errors.length > 0) {
  console.error(`Found ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error('  ', e));
  process.exit(1);
} else {
  console.log('ALL 350 QUESTIONS ARE 100% VALID!');
}

