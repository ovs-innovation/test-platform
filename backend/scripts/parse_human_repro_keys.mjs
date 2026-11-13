import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/human_repro_pages_dump.json', 'utf8'));

const keyPage35 = pagesDump[34].rawText;
const keyPage36 = pagesDump[35].rawText;
const fullKeyText = keyPage35 + '\n' + keyPage36;

// Regex to match e.g. "1. D", "149. A"
const regex = /(\d+)\.\s+([A-D](?:\s*,\s*[A-D])*)/g;
let match;
const keys = {};

while ((match = regex.exec(fullKeyText)) !== null) {
  const num = parseInt(match[1]);
  const ans = match[2].trim();
  keys[num] = ans;
}

console.log(`Parsed ${Object.keys(keys).length} keys.`);
for (let i = 1; i <= 149; i++) {
  if (!keys[i]) {
    console.error(`Missing key for question ${i}!`);
  }
}

fs.writeFileSync('backend/scripts/human_repro_official_keys.json', JSON.stringify(keys, null, 2));
console.log('Saved official keys to backend/scripts/human_repro_official_keys.json');
