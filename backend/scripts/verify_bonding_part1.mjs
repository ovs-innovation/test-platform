import fs from 'fs';
import { BONDING_PART1 } from './clean_bonding_part1.mjs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/bonding_official_keys.json', 'utf8'));

console.log('Part 1 total questions:', BONDING_PART1.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of BONDING_PART1) {
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
    if (!q.options || q.options.length !== 4) {
      console.error(`Q${q.qNum} does not have 4 options`);
      dummyCount++;
    }
    for (const opt of q.options || []) {
      if (typeof opt === 'string' && (opt.startsWith('Option (') || opt.includes('dummy') || opt === '')) {
        console.error(`Q${q.qNum} has invalid/dummy option: ${opt}`);
        dummyCount++;
      }
    }
  }
}

console.log(`Dummy options count: ${dummyCount}`);
console.log(`Key mismatches count: ${keyMismatch}`);

if (dummyCount === 0 && keyMismatch === 0 && BONDING_PART1.length === 55) {
  console.log('PART 1 VERIFIED: 55/55 QUESTIONS PERFECT!');
} else {
  process.exit(1);
}
