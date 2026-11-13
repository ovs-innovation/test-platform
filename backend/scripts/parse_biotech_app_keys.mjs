import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));

// Find page 21 (or whichever page has Answer Key)
const p21 = pagesDump.find(p => p.page === 21);
console.log('--- Page 21 Text Dump ---');
const textLines = [];
let currentLine = [];
let lastY = null;

for (const it of p21.items) {
  if (lastY === null || Math.abs(it.y - lastY) > 3) {
    if (currentLine.length > 0) {
      textLines.push(currentLine.map(x => x.str).join(' '));
    }
    currentLine = [it];
    lastY = it.y;
  } else {
    currentLine.push(it);
  }
}
if (currentLine.length > 0) {
  textLines.push(currentLine.map(x => x.str).join(' '));
}

console.log(textLines.join('\n'));

// Now extract keys Q1 to Q99
const fullP21Text = textLines.join(' ');
const keyMatches = [...fullP21Text.matchAll(/(\d{1,3})\s*[\.\-\)]\s*([A-D])/g)];
console.log(`Found ${keyMatches.length} keys`);

const keysMap = {};
for (const m of keyMatches) {
  const qNum = parseInt(m[1], 10);
  const opt = m[2];
  keysMap[qNum] = opt;
}

console.log('Sample keys 1..10:', Object.fromEntries(Object.entries(keysMap).slice(0, 10)));
console.log('Sample keys 90..99:', Object.fromEntries(Object.entries(keysMap).slice(89, 99)));
console.log('Total extracted keys count:', Object.keys(keysMap).length);

// Save keys
fs.writeFileSync('backend/scripts/biotech_app_official_keys.json', JSON.stringify(keysMap, null, 2));
