import fs from 'fs';
import { THERMO_PART3 } from './clean_thermo_part3.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Part 3 total questions:', THERMO_PART3.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of THERMO_PART3) {
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

if (dummyCount === 0 && keyMismatch === 0 && THERMO_PART3.length === 50) {
  console.log('PART 3 VERIFIED: 50/50 QUESTIONS PERFECT!');
} else {
  process.exit(1);
}
