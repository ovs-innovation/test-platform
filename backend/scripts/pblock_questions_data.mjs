import { pblockQuestionsPart1 } from './pblock_data_part1.mjs';
import { pblockQuestionsPart2 } from './pblock_data_part2.mjs';
import { pblockQuestionsPart3 } from './pblock_data_part3.mjs';
import { pblockQuestionsPart4 } from './pblock_data_part4.mjs';

export const allPBlockQuestions = [
  ...pblockQuestionsPart1,
  ...pblockQuestionsPart2,
  ...pblockQuestionsPart3,
  ...pblockQuestionsPart4
];

console.log(`Total p-Block questions compiled: ${allPBlockQuestions.length}`);
