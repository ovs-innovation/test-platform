import { CAPACITOR_PYQ_PART1 } from './capacitor_pyq_part1.mjs';
import { CAPACITOR_PYQ_PART2 } from './capacitor_pyq_part2.mjs';

export const CAPACITOR_PYQ_QUESTIONS = [
  ...CAPACITOR_PYQ_PART1,
  ...CAPACITOR_PYQ_PART2
];

console.log(`Loaded ${CAPACITOR_PYQ_QUESTIONS.length} Capacitor PYQ questions.`);

