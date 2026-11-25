import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the existing part1 overrides
import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';

// Let's audit all 100 questions in part 1
console.log('Auditing Part 1 (1..100)...');
let validCount = 0;
let invalidCount = 0;
for (let q = 1; q <= 100; q++) {
  const item = ELECTRO_PART1_OVERRIDES[q];
  if (!item || !item.options || item.options.length !== 4) {
    invalidCount++;
  } else if (item.options.some(o => /Option [A-D]|^[A-D]$/i.test(o.trim()) || o.length === 0)) {
    invalidCount++;
  } else {
    validCount++;
  }
}

console.log(`Part 1 Valid: ${validCount}, Invalid: ${invalidCount}`);
