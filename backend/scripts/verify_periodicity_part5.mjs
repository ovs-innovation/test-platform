import fs from 'fs';
import { PERIODICITY_PART5 } from './clean_periodicity_part5.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/periodicity_official_keys.json', 'utf8'));

console.log('Part 5 total questions:', PERIODICITY_PART5.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of PERIODICITY_PART5) {
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
