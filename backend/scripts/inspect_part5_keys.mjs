import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Official keys for Q201..Q245:');
for (let i = 201; i <= 245; i++) {
  process.stdout.write(`Q${i}:${keys[i]} `);
  if (i % 10 === 0) console.log();
}
console.log();
