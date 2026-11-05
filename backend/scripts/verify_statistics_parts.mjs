import fs from 'fs';
import { STATISTICS_PART1 } from './data/statistics_part1.mjs';
import { STATISTICS_PART2 } from './data/statistics_part2.mjs';
import { STATISTICS_PART3 } from './data/statistics_part3.mjs';
import { STATISTICS_PART4 } from './data/statistics_part4.mjs';

const ansKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_statistics.json', 'utf8').replace(/^\uFEFF/, ''));

const allQuestions = [
  ...STATISTICS_PART1,
  ...STATISTICS_PART2,
  ...STATISTICS_PART3,
  ...STATISTICS_PART4
];

console.log("=== VERIFYING ALL 160 STATISTICS QUESTIONS ===");
console.log(`Total questions loaded: ${allQuestions.length}`);

if (allQuestions.length !== 160) {
  console.error(`ERROR: Expected 160 questions, got ${allQuestions.length}`);
  process.exit(1);
}

let errors = 0;
const letters = ['A', 'B', 'C', 'D'];

for (let i = 0; i < 160; i++) {
  const q = allQuestions[i];
  const expectedNum = i + 1;
  const officialAns = ansKey[String(expectedNum)];

  if (q.q_num !== expectedNum) {
    console.error(`Error at index ${i}: expected q_num ${expectedNum}, got ${q.q_num}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length < 10) {
    console.error(`Error at Q${q.q_num}: question_text missing or too short`);
    errors++;
  }

  if (!q.solution || q.solution.trim().length < 10) {
    console.error(`Error at Q${q.q_num}: solution missing or too short`);
    errors++;
  }

  if (q.question_type === 'mcq') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Error at Q${q.q_num}: options must be array of 4, got ${q.options?.length}`);
      errors++;
    } else {
      for (let optIdx = 0; optIdx < 4; optIdx++) {
        if (!q.options[optIdx] || String(q.options[optIdx]).trim().length === 0) {
          console.error(`Error at Q${q.q_num}: option ${optIdx} is empty`);
          errors++;
        }
      }
    }

    if (![0, 1, 2, 3].includes(q.correct_index)) {
      console.error(`Error at Q${q.q_num}: correct_index must be 0-3, got ${q.correct_index}`);
      errors++;
    } else {
      const actualLetter = letters[q.correct_index];
      if (actualLetter !== officialAns) {
        console.error(`Error at Q${q.q_num}: correct_index gives letter ${actualLetter}, but official answer key is ${officialAns}`);
        errors++;
      }
    }
  } else if (q.question_type === 'numerical') {
    if (typeof q.numeric_answer !== 'number' && typeof q.numeric_answer !== 'string') {
      console.error(`Error at Q${q.q_num}: numeric_answer missing or invalid`);
      errors++;
    } else {
      const actualNum = String(q.numeric_answer).trim();
      const expectedNumStr = String(officialAns).trim();
      if (actualNum !== expectedNumStr) {
        console.error(`Error at Q${q.q_num}: numeric_answer is ${actualNum}, but official answer key is ${expectedNumStr}`);
        errors++;
      }
    }
  } else {
    console.error(`Error at Q${q.q_num}: unknown question_type ${q.question_type}`);
    errors++;
  }
}

if (errors === 0) {
  console.log("SUCCESS: All 160 questions passed all validation checks with 100% accuracy!");
} else {
  console.error(`FAILED with ${errors} errors!`);
  process.exit(1);
}

