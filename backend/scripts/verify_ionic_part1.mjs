import fs from 'fs';
import { IONIC_PART1 } from './clean_ionic_part1.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/ionic_official_keys.json', 'utf8'));

console.log('Part 1 total questions:', IONIC_PART1.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of IONIC_PART1) {
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

if (dummyCount === 0 && keyMismatch === 0 && IONIC_PART1.length === 40) {
  console.log('PART 1 VERIFIED: 40/40 QUESTIONS PERFECT!');
} else {
  process.exit(1);
}
