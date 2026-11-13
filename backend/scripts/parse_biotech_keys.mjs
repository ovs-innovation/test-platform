import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

const keyPage34 = pagesDump[33].rawText;
const keyPage35 = pagesDump[34].rawText;

const fullKeyText = keyPage34 + '\n' + keyPage35;

// Regex to match e.g. "1. B", "143. B, D"
const regex = /(\d+)\.\s+([A-D](?:\s*,\s*[A-D])*)/g;
let match;
const keys = {};

while ((match = regex.exec(fullKeyText)) !== null) {
  const num = parseInt(match[1]);
  const ans = match[2].trim();
  keys[num] = ans;
}

console.log(`Parsed ${Object.keys(keys).length} keys.`);
for (let i = 1; i <= 143; i++) {
  if (!keys[i]) {
    console.error(`Missing key for question ${i}!`);
  }
}

fs.writeFileSync('backend/scripts/biotech_official_keys.json', JSON.stringify(keys, null, 2));
console.log('Saved official keys to backend/scripts/biotech_official_keys.json');

