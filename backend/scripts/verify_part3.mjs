import fs from 'fs';
import { BINOMIAL_THEOREM_PART3 } from './data/binomial_theorem_part3.mjs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));
const letters = ['A', 'B', 'C', 'D'];

let errors = 0;
for (const q of BINOMIAL_THEOREM_PART3) {
  const expected = String(key[q.q_num]).trim();
  if (q.question_type === 'mcq') {
    const actual = letters[q.correct_index];
    if (expected !== actual) {
      console.error(`Mismatch at Q${q.q_num}: expected ${expected}, got ${actual}`);
      errors++;
    }
  } else {
    const actual = String(q.numeric_answer).trim();
    if (expected !== actual) {
      console.error(`Mismatch at Q${q.q_num}: expected ${expected}, got ${actual}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log(`Part 3 Verified: All ${BINOMIAL_THEOREM_PART3.length}/65 questions match official key 100%!`);
} else {
  console.error(`Part 3 had ${errors} errors!`);
}

