import { atomPyqPart1 } from './atom_pyq_part1.mjs';
import { atomPyqPart2 } from './atom_pyq_part2.mjs';

export const allAtomQuestions = [
  ...atomPyqPart1,
  ...atomPyqPart2
];

console.log(`Total Structure of Atom questions loaded: ${allAtomQuestions.length}`);

