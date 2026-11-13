import { part1Questions } from './biomolecules_pyq_part1.mjs';
import { part2Questions } from './biomolecules_pyq_part2.mjs';
import { part3Questions } from './biomolecules_pyq_part3.mjs';

export const allBiomoleculesQuestions = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions
];

console.log(`Total Biomolecules Questions Loaded: ${allBiomoleculesQuestions.length}`);

