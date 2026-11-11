import { EMI_PYQ_PART1 } from './emi_pyq_part1.mjs';
import { EMI_PYQ_PART2 } from './emi_pyq_part2.mjs';

export const EMI_PYQ_QUESTIONS = [
  ...EMI_PYQ_PART1,
  ...EMI_PYQ_PART2
];

console.log(`Loaded ${EMI_PYQ_QUESTIONS.length} Electromagnetic Induction PYQ questions.`);

