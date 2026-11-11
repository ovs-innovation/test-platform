import { molePyqPart1 } from './mole_pyq_part1.mjs';
import { molePyqPart2 } from './mole_pyq_part2.mjs';

export const allMoleQuestions = [
  ...molePyqPart1,
  ...molePyqPart2
];

console.log(`Total mole questions loaded: ${allMoleQuestions.length}`);
