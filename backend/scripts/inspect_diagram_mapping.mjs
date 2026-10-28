import { SEMICONDUCTOR_BATCH1_QUESTIONS } from './seed_semiconductor_part1.mjs';
import { SEMICONDUCTOR_BATCH2_QUESTIONS } from './seed_semiconductor_part2.mjs';
import { SEMICONDUCTOR_BATCH3_QUESTIONS } from './seed_semiconductor_part3.mjs';
import { SEMICONDUCTOR_BATCH4_QUESTIONS } from './seed_semiconductor_part4.mjs';
import { SEMICONDUCTOR_BATCH5_QUESTIONS } from './seed_semiconductor_part5.mjs';
import { SEMICONDUCTOR_BATCH6_QUESTIONS } from './seed_semiconductor_part6.mjs';

const allQuestions = [];
function addBatch(batch, startNum, isAR = false) {
  batch.forEach((q, idx) => {
    allQuestions.push({
      batchNum: isAR ? 'AR' + (idx + 1) : 'Q' + (startNum + idx),
      question_text: q.question_text,
      options: q.options,
      raw: q
    });
  });
}

addBatch(SEMICONDUCTOR_BATCH1_QUESTIONS, 1);
addBatch(SEMICONDUCTOR_BATCH2_QUESTIONS, 21);
addBatch(SEMICONDUCTOR_BATCH3_QUESTIONS, 41);
addBatch(SEMICONDUCTOR_BATCH4_QUESTIONS, 61);
addBatch(SEMICONDUCTOR_BATCH5_QUESTIONS, 81);
addBatch(SEMICONDUCTOR_BATCH6_QUESTIONS.slice(0, 3), 98);
addBatch(SEMICONDUCTOR_BATCH6_QUESTIONS.slice(3), 1, true);

console.log('Total mapped questions:', allQuestions.length);

const testIds = [14, 19, 20, 22, 23, 24, 25, 26, 27, 29, 31, 32, 34, 35, 36, 37, 38, 43, 44, 47, 51, 53, 54, 55, 56, 57, 58, 59, 60, 69, 70, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 91, 92, 98, 99, 100];

testIds.forEach(id => {
  const q = allQuestions.find(item => item.batchNum === 'Q' + id);
  if (q) {
    console.log(`[Q${id}] => ${q.question_text.slice(0, 80).replace(/\n/g, ' ')}...`);
  } else {
    console.log(`[Q${id}] => NOT FOUND`);
  }
});
