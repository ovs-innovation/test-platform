// NEET Oscillations PYQ Full Dataset: 85 Questions (Q1 to Q85)
import { OSCILLATIONS_PYQ_PART1 } from './oscillations_pyq_part1.mjs';
import { OSCILLATIONS_PYQ_PART2 } from './oscillations_pyq_part2.mjs';
import { OSCILLATIONS_PYQ_PART3 } from './oscillations_pyq_part3.mjs';

export const ALL_OSCILLATIONS_PYQ_QUESTIONS = [
  ...OSCILLATIONS_PYQ_PART1.map(q => ({
    ...q,
    correctIndex: q.correctIndex !== undefined ? q.correctIndex : q.correct_option
  })),
  ...OSCILLATIONS_PYQ_PART2.map(q => ({
    ...q,
    correctIndex: q.correctIndex !== undefined ? q.correctIndex : q.correct_option
  })),
  ...OSCILLATIONS_PYQ_PART3.map(q => ({
    ...q,
    correctIndex: q.correctIndex !== undefined ? q.correctIndex : q.correct_option
  }))
];
