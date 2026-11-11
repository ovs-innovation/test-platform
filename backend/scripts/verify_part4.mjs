import fs from 'fs';
import { pblockPart4 } from './pblock_pyq_part4.mjs';

const key = JSON.parse(fs.readFileSync('./backend/scripts/pblock_official_key.json', 'utf8'));
let mismatches = 0;
pblockPart4.forEach(q => {
  const official = key[q.question_number];
  const given = q.correct_option;
  if (official !== given) {
    console.log(`Mismatch Q${q.question_number}: official ${official} vs given ${given}`);
    mismatches++;
  }
});
console.log(`Part 4 verification: ${pblockPart4.length} questions, mismatches: ${mismatches}`);
