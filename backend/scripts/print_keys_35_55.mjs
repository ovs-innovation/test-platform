import fs from 'fs';
const keys = JSON.parse(fs.readFileSync('backend/scripts/gravitation_official_keys.json', 'utf8'));
for (let q = 35; q <= 55; q++) {
  console.log(`Q${q}: ${keys[q]}`);
}
