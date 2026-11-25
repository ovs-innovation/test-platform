import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/gravitation_raw_blocks_verified.json', 'utf8'));

// Check Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12
for (const q of [2, 3, 4, 5, 8, 9, 11, 12, 13, 14, 16]) {
  console.log(`=== Q${q} RAW BLOCK ===`);
  console.log(blocks[q]);
}
