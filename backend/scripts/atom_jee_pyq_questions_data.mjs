import { ATOM_PART1 } from './clean_atom_part1.mjs';
import { ATOM_PART2 } from './clean_atom_part2.mjs';
import { ATOM_PART3 } from './clean_atom_part3.mjs';
import { ATOM_PART4 } from './clean_atom_part4.mjs';

export const ALL_ATOM_QUESTIONS = [
  ...ATOM_PART1,
  ...ATOM_PART2,
  ...ATOM_PART3,
  ...ATOM_PART4
];

if (process.argv[1] && import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  console.log(`Loaded ${ALL_ATOM_QUESTIONS.length} Structure of Atom JEE questions.`);
}
