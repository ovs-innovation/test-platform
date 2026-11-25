import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Official keys for Q151..Q200:');
for (let i = 151; i <= 200; i++) {
  process.stdout.write(`Q${i}:${keys[i]} `);
  if (i % 10 === 0) console.log();
}
