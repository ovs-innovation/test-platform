import { aldehydesPart1 } from './aldehydes_pyq_part1.mjs';
import { aldehydesPart2 } from './aldehydes_pyq_part2.mjs';
import { aldehydesPart3 } from './aldehydes_pyq_part3.mjs';
import { aldehydesPart4 } from './aldehydes_pyq_part4.mjs';

export const allAldehydesQuestions = [
  ...aldehydesPart1,
  ...aldehydesPart2,
  ...aldehydesPart3,
  ...aldehydesPart4
];

console.log(`Loaded ${allAldehydesQuestions.length} total questions.`);

