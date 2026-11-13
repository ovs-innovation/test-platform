import { part1Questions } from './hydrocarbons_pyq_part1.mjs';
import { part2Questions } from './hydrocarbons_pyq_part2.mjs';
import { part3Questions } from './hydrocarbons_pyq_part3.mjs';
import { part4Questions } from './hydrocarbons_pyq_part4.mjs';

export const allHydrocarbonsPYQQuestions = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions,
  ...part4Questions
];

console.log(`Loaded ${allHydrocarbonsPYQQuestions.length} Hydrocarbons PYQ questions in total.`);

