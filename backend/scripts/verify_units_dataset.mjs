
import { ALL_UNITS_PYQ_QUESTIONS } from './units_pyq_questions_data.mjs';

const KEY = [
  'B', 'A', 'D', 'D', 'C', 'A', 'A', 'A', 'B', 'B',
  'C', 'B', 'A', 'B', 'C', 'D', 'C', 'B', 'D', 'D',
  'C', 'A', 'D', 'B', 'A', 'C', 'A', 'B', 'B', 'A',
  'C', 'B', 'D', 'A', 'D', 'D', 'A', 'C', 'A', 'D',
  'C', 'C', 'C', 'C', 'C', 'C', 'B', 'B', 'D', 'D',
  'A', 'C', 'B', 'B', 'A', 'C', 'C', 'B', 'A', 'C',
  'D', 'B', 'A', 'B', 'C', 'A', 'B', 'D', 'B', 'C',
  'A', 'B', 'A', 'B', 'D', 'D', 'C', 'D', 'C', 'A',
  'A', 'D'
];

console.log('Total questions loaded:', ALL_UNITS_PYQ_QUESTIONS.length);
if (ALL_UNITS_PYQ_QUESTIONS.length !== 82) throw new Error('Expected 82 questions!');

let mismatchCount = 0;
ALL_UNITS_PYQ_QUESTIONS.forEach((q, idx) => {
  const expectedKey = KEY[idx];
  const expectedIdx = expectedKey.charCodeAt(0) - 65;
  if (q.qNum !== idx + 1) {
    console.error(`Mismatch in qNum: q.qNum=${q.qNum}, expected=${idx + 1}`);
    mismatchCount++;
  }
  if (q.options.length !== 4) {
    console.error(`Q${q.qNum} does not have 4 options! Has ${q.options.length}`);
    mismatchCount++;
  }
  if (q.correctIndex !== expectedIdx) {
    console.error(`Q${q.qNum} key mismatch! Got ${q.correctIndex} (${String.fromCharCode(65 + q.correctIndex)}), expected ${expectedIdx} (${expectedKey})`);
    mismatchCount++;
  }
  if (!q.solution || q.solution.length < 10) {
    console.error(`Q${q.qNum} missing valid solution!`);
    mismatchCount++;
  }
});

if (mismatchCount === 0) {
  console.log('SUCCESS: All 82 questions verified PERFECTLY against official Answer Key!');
} else {
  console.error(`Found ${mismatchCount} errors!`);
}
