import { GRAVITATION_PART1 } from './clean_gravitation_part1.mjs';
import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/gravitation_official_keys.json', 'utf8'));

console.log('Part 1 total questions:', GRAVITATION_PART1.length);
let dummyCount = 0;
let keyMismatch = 0;

for (const q of GRAVITATION_PART1) {
  const offKey = keys[q.qNum];
  const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
  if (q.correct_option !== offIdx) {
    console.error(`Mismatch for Q${q.qNum}: got ${q.correct_option}, expected ${offIdx} (${offKey})`);
    keyMismatch++;
  }
  for (const opt of q.options) {
    if (typeof opt === 'string' && opt.startsWith('Option (')) dummyCount++;
  }
}

console.log(`Dummy options count: ${dummyCount}`);
console.log(`Key mismatches count: ${keyMismatch}`);
