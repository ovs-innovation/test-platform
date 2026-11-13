import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/repro_pages_dump.json', 'utf8'));

const keyPage19 = pagesDump[18].rawText;

// Regex to match e.g. "1. D", "68. A, C"
const regex = /(\d+)\.\s+([A-D](?:\s*,\s*[A-D])*)/g;
let match;
const keys = {};

while ((match = regex.exec(keyPage19)) !== null) {
  const num = parseInt(match[1]);
  const ans = match[2].trim();
  keys[num] = ans;
}

console.log(`Parsed ${Object.keys(keys).length} keys.`);
for (let i = 1; i <= 69; i++) {
  if (!keys[i]) {
    console.error(`Missing key for question ${i}!`);
  }
}

fs.writeFileSync('backend/scripts/repro_official_keys.json', JSON.stringify(keys, null, 2));
console.log('Saved official keys to backend/scripts/repro_official_keys.json');
