import fs from 'fs';
import { batch1 } from './data/func_batch1.mjs';
import { batch2 } from './data/func_batch2.mjs';
import { batch3 } from './data/func_batch3.mjs';
import { batch4 } from './data/func_batch4.mjs';

const allQuestions = [...batch1, ...batch2, ...batch3, ...batch4];
console.log(`Total questions loaded: ${allQuestions.length}`);

const key = JSON.parse(fs.readFileSync('./backend/scripts/func_answer_key.json', 'utf8'));

let mismatches = 0;
let errors = 0;

for (let i = 1; i <= 216; i++) {
  const q = allQuestions.find(x => x.question_number === i);
  if (!q) {
    console.error(`Missing question Q${i}`);
    errors++;
    continue;
  }

  const expectedAns = key[String(i)];
  if (!expectedAns) {
    console.error(`No official key found for Q${i}`);
    errors++;
    continue;
  }

  if (q.type === 'mcq' || q.question_type === 'single_choice') {
    if (q.correct_option !== expectedAns) {
      console.error(`Q${i} MCQ mismatch: got ${q.correct_option}, expected ${expectedAns}`);
      mismatches++;
    }
    if (!q.options || q.options.length !== 4) {
      console.error(`Q${i} MCQ options length invalid: ${q.options ? q.options.length : 0}`);
      errors++;
    }
  } else if (q.type === 'integer' || q.question_type === 'integer') {
    if (String(q.numeric_answer).trim() !== String(expectedAns).trim()) {
      console.error(`Q${i} Integer mismatch: got ${q.numeric_answer}, expected ${expectedAns}`);
      mismatches++;
    }
  } else {
    console.error(`Q${i} unknown type: ${q.type || q.question_type}`);
    errors++;
  }

  if (!q.question_text || q.question_text.length < 5) {
    console.error(`Q${i} missing question_text`);
    errors++;
  }
  if (!q.solution || q.solution.length < 5) {
    console.error(`Q${i} missing solution`);
    errors++;
  }
}

console.log(`Verification Complete:`);
console.log(`Total: ${allQuestions.length}/216`);
console.log(`Mismatches: ${mismatches}`);
console.log(`Errors: ${errors}`);

if (mismatches === 0 && errors === 0 && allQuestions.length === 216) {
  console.log('✅ ALL 216 QUESTIONS PASSED FULL VERIFICATION!');
} else {
  console.error('❌ Verification failed with issues.');
  process.exit(1);
}

