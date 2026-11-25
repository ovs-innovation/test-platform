import fs from 'fs';

const keys = JSON.parse(fs.readFileSync('backend/scripts/thermo_official_keys.json', 'utf8'));

console.log('Official keys for Q51..Q100:');
for (let i = 51; i <= 100; i++) {
  process.stdout.write(`Q${i}:${keys[i]} `);
  if (i % 10 === 0) console.log();
}
