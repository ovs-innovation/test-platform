import fs from 'fs';
import { allAtomQuestions } from './atom_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/atom_official_key.json', 'utf8'));

console.log('Verifying Structure of Atom Dataset...');
console.log(`Total questions in dataset: ${allAtomQuestions.length}`);

if (allAtomQuestions.length !== 90) {
  console.error(`ERROR: Expected 90 questions, but found ${allAtomQuestions.length}`);
  process.exit(1);
}

let errors = 0;

for (let i = 0; i < allAtomQuestions.length; i++) {
  const q = allAtomQuestions[i];
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
}

if (errors === 0) {
  console.log('SUCCESS: All 90 questions passed verification! 100% agreement with official answer key.');
} else {
  console.error(`Verification FAILED with ${errors} errors.`);
  process.exit(1);
}

