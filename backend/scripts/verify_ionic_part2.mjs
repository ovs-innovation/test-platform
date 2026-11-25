import fs from 'fs';
import { IONIC_PART2 } from './clean_ionic_part2.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/ionic_official_keys.json', 'utf8'));

console.log('Part 2 total questions:', IONIC_PART2.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of IONIC_PART2) {
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
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Invalid options array for Q${q.qNum}`);
      dummyCount++;
    }
  }
  for (const opt of (q.options || [])) {
    if (typeof opt === 'string' && (opt.startsWith('Option (') || opt.includes('Dummy'))) dummyCount++;
  }
}

console.log(`Dummy options count: ${dummyCount}`);
console.log(`Key mismatches count: ${keyMismatch}`);

if (dummyCount === 0 && keyMismatch === 0 && IONIC_PART2.length === 40) {
  console.log('PART 2 VERIFIED: 40/40 QUESTIONS PERFECT!');
} else {
  process.exit(1);
}
