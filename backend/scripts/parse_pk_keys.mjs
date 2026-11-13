import fs from 'fs';

const text = fs.readFileSync('./backend/scripts/plant_kingdom_raw_text.txt', 'utf8');

// The answer key is on pages 34 and 35
const answerKeyIndex = text.indexOf('Answer Key');
const keyText = text.slice(answerKeyIndex);

const keyRegex = /(\d+)\.\s*([A-D])/g;
let match;
const keys = {};

while ((match = keyRegex.exec(keyText)) !== null) {
  const qNum = parseInt(match[1], 10);
  const opt = match[2];
  keys[qNum] = opt;
}

console.log('Total keys extracted:', Object.keys(keys).length);
fs.writeFileSync('./backend/scripts/pk_official_keys.json', JSON.stringify(keys, null, 2));

// Check if any numbers from 1 to 176 are missing
const missing = [];
for (let i = 1; i <= 176; i++) {
  if (!keys[i]) missing.push(i);
}
console.log('Missing keys:', missing);

