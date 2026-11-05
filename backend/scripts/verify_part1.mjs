import fs from 'fs';
import { BINOMIAL_THEOREM_PART1 } from './data/binomial_theorem_part1.mjs';

const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));
const letters = ['A', 'B', 'C', 'D'];

let errors = 0;
for (const q of BINOMIAL_THEOREM_PART1) {
  const expected = key[q.q_num];
  const actual = letters[q.correct_index];
  if (expected !== actual) {
    console.error(`Mismatch at Q${q.q_num}: expected ${expected}, got ${actual}`);
    errors++;
  }
}

if (errors === 0) {
  console.log(`Part 1 Verified: All ${BINOMIAL_THEOREM_PART1.length}/65 questions match official key 100%!`);
} else {
  console.error(`Part 1 had ${errors} errors!`);
}

