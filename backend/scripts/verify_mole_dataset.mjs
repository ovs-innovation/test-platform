import fs from 'fs';
import { allMoleQuestions } from './mole_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/mole_official_key.json', 'utf8'));

console.log('Verifying Some Basic Concepts of Chemistry Dataset...');
console.log(`Total questions in dataset: ${allMoleQuestions.length}`);

if (allMoleQuestions.length !== 84) {
  console.error(`ERROR: Expected 84 questions, but found ${allMoleQuestions.length}`);
  process.exit(1);
}

let errors = 0;

for (let i = 0; i < allMoleQuestions.length; i++) {
  const q = allMoleQuestions[i];
  const expectedNum = i + 1;

  if (q.question_number !== expectedNum) {
    console.error(`Question sequence error at index ${i}: expected Q${expectedNum}, got Q${q.question_number}`);
    errors++;
  }

  if (!q.question_text || q.question_text.trim().length === 0) {
    console.error(`Q${q.question_number}: empty question_text`);
    errors++;
  }

  // Check for leaked exam prefixes
  if (/^\[?(?:NEET|RE-NEET|AIPMT)\s+\d{4}/i.test(q.question_text)) {
    console.error(`Q${q.question_number}: question_text contains leaked exam prefix: "${q.question_text.slice(0, 30)}"`);
    errors++;
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Q${q.question_number}: options must have 4 items, found ${q.options?.length}`);
    errors++;
  } else {
    for (let oIdx = 0; oIdx < 4; oIdx++) {
      if (!q.options[oIdx] || q.options[oIdx].trim().length === 0) {
        console.error(`Q${q.question_number}: option [${oIdx}] is empty`);
        errors++;
      }
    }
  }

  const expectedAnswer = officialKey[String(q.question_number)];
  if (q.correct_option !== expectedAnswer) {
    console.error(`Q${q.question_number} answer mismatch: dataset has "${q.correct_option}", official key has "${expectedAnswer}"`);
    errors++;
  }

  if (!q.solution_text || q.solution_text.trim().length === 0) {
    console.error(`Q${q.question_number}: empty solution_text`);
    errors++;
  }

  // Check KaTeX dollar signs balance
  const singleDollars = (q.question_text.match(/(?<!\\)\$/g) || []).length;
  if (singleDollars % 2 !== 0) {
    console.warn(`WARNING: Q${q.question_number} question_text has unbalanced $ (count: ${singleDollars})`);
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 84 questions passed verification! 100% agreement with official answer key.');
} else {
  console.error(`Verification FAILED with ${errors} errors.`);
  process.exit(1);
}

