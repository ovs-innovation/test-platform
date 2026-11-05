import { STRAIGHT_LINES_PART1 } from './data/straight_lines_part1.mjs';
import { STRAIGHT_LINES_PART2 } from './data/straight_lines_part2.mjs';
import { STRAIGHT_LINES_PART3 } from './data/straight_lines_part3.mjs';
import { STRAIGHT_LINES_PART4 } from './data/straight_lines_part4.mjs';
import fs from 'fs';

const all = [...STRAIGHT_LINES_PART1, ...STRAIGHT_LINES_PART2, ...STRAIGHT_LINES_PART3, ...STRAIGHT_LINES_PART4];
console.log('Total questions loaded:', all.length);

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/official_answer_key_straight_lines.json', 'utf8'));

let matchCount = 0;
let mismatchCount = 0;

all.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.q_num !== expectedNum) {
    console.error(`Mismatch in q_num at idx ${idx}: got ${q.q_num}, expected ${expectedNum}`);
  }
  
  const official = officialKey[q.q_num];
  if (!official) {
    console.error(`No official key for Q${q.q_num}`);
    return;
  }
  
  if (q.question_type === 'mcq') {
    const letters = ['A', 'B', 'C', 'D'];
    const ourLetter = letters[q.correct_index];
    if (ourLetter === official) {
      matchCount++;
    } else {
      mismatchCount++;
      console.log(`Q${q.q_num} MCQ answer mismatch: ours=${ourLetter}, official=${official}`);
    }
  } else if (q.question_type === 'numerical') {
    if (String(q.numeric_answer).trim() === String(official).trim()) {
      matchCount++;
    } else {
      mismatchCount++;
      console.log(`Q${q.q_num} Numerical answer mismatch: ours=${q.numeric_answer}, official=${official}`);
    }
  }
});

console.log(`Answer key check: ${matchCount} matching, ${mismatchCount} mismatches out of ${all.length}`);

