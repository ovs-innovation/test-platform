import { GRAVITATION_PART4 } from './clean_gravitation_part4.mjs';
import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/gravitation_official_keys.json', 'utf8'));

console.log('Part 4 total questions:', GRAVITATION_PART4.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of GRAVITATION_PART4) {
  const offKey = keys[q.qNum];
  if (q.question_type === 'numerical') {
    if (String(q.numeric_answer) !== String(offKey)) {
      console.error(`Numerical mismatch for Q${q.qNum}: got ${q.numeric_answer}, expected ${offKey}`);
      keyMismatch++;
    }
  } else {
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    if (q.correct_option !== offIdx) {
      console.error(`MCQ mismatch for Q${q.qNum}: got ${q.correct_option}, expected ${offIdx} (${offKey})`);
      keyMismatch++;
    }
  }
  for (const opt of q.options) {
    if (typeof opt === 'string' && opt.startsWith('Option (')) dummyCount++;
  }
}

console.log(`Dummy options count: ${dummyCount}`);
console.log(`Key mismatches count: ${keyMismatch}`);
