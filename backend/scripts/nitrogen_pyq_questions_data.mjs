import { nitrogenPart1 } from './nitrogen_pyq_part1.mjs';
import { nitrogenPart2 } from './nitrogen_pyq_part2.mjs';
import { nitrogenPart3 } from './nitrogen_pyq_part3.mjs';

export const allNitrogenQuestions = [
  ...nitrogenPart1,
  ...nitrogenPart2,
  ...nitrogenPart3
];

console.log(`Loaded ${allNitrogenQuestions.length} total questions.`);
