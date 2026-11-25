// Master consolidated questions data for Some Basic Concepts of Chemistry (JEE Main PYQ)
import { BASIC_CHEM_PART1 } from './clean_basic_chem_part1.mjs';
import { BASIC_CHEM_PART2 } from './clean_basic_chem_part2.mjs';
import { BASIC_CHEM_PART3 } from './clean_basic_chem_part3.mjs';
import { BASIC_CHEM_PART4 } from './clean_basic_chem_part4.mjs';

export const ALL_BASIC_CHEM_QUESTIONS = [
  ...BASIC_CHEM_PART1,
  ...BASIC_CHEM_PART2,
  ...BASIC_CHEM_PART3,
  ...BASIC_CHEM_PART4
];

console.log(`Loaded ${ALL_BASIC_CHEM_QUESTIONS.length} questions for Some Basic Concepts of Chemistry.`);
