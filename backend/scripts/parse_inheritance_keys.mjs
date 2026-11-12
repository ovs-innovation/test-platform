import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/inheritance_extracted_lines.txt', 'utf8').split('\n');

const p55_56_lines = lines.filter(l => l.startsWith('[P55]') || l.startsWith('[P56]'));

const keyMap = {};

for (const line of p55_56_lines) {
  // Matches e.g. "1.   B   2.   A   3.   C"
  // or "156.   A   157.   A"
  const cleanLine = line.replace(/^\[P\d+\]\s*/, '').trim();
  const matches = cleanLine.matchAll(/(\d+)\.\s*([A-D])/g);
  for (const m of matches) {
    keyMap[parseInt(m[1])] = m[2];
  }
}

console.log('Total answer keys parsed:', Object.keys(keyMap).length);

// Verify 1 to 272
const missing = [];
for (let i = 1; i <= 272; i++) {
  if (!keyMap[i]) missing.push(i);
}

console.log('Missing keys:', missing);

fs.writeFileSync('./backend/scripts/inheritance_official_keys.json', JSON.stringify(keyMap, null, 2));
console.log('Saved to backend/scripts/inheritance_official_keys.json');
