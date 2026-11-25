import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Official keys for Q101..Q150:');
for (let i = 101; i <= 150; i++) {
  process.stdout.write(`Q${i}:${keys[i]} `);
  if (i % 10 === 0) console.log();
}
