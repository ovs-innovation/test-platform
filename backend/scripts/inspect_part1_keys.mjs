import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/thermo_part1_raw.txt', 'utf8');

// We know the official keys for Part 1 (Q1 to Q50)
const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Official keys for Q1..Q50:');
for (let i = 1; i <= 50; i++) {
  process.stdout.write(`Q${i}:${keys[i]} `);
  if (i % 10 === 0) console.log();
}
