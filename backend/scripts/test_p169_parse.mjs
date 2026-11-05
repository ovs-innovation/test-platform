import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
console.log(`Page 169 has ${p169.lines.length} lines.`);

// Let's inspect how the lines or words are distributed
const items = [];
for (const line of p169.lines) {
  for (const word of line.Words) {
    items.push({ text: word.Text, x: Math.round(word.X), y: Math.round(word.Y) });
  }
}

console.log(`Total words: ${items.length}`);
// Let's sort items by X then Y to see columns, or let's find all question numbers like "1.", "2.", "3.", etc.
const qNumMatches = [];
for (const line of p169.lines) {
  const matches = [...line.Text.matchAll(/(?:^|\s)(\d+)[.:\s]+([A-D]|\d+)(?:\s|$)/gi)];
  for (const m of matches) {
    qNumMatches.push({ qNum: parseInt(m[1]), ans: m[2], full: m[0] });
  }
}

console.log(`Direct regex matches from line text: ${qNumMatches.length}`);
const qMap = new Map();
for (const m of qNumMatches) {
  qMap.set(m.qNum, m.ans);
}

const missing = [];
for (let i = 1; i <= 260; i++) {
  if (!qMap.has(i)) missing.push(i);
}
console.log(`Found ${qMap.size} questions directly. Missing ${missing.length}:`, missing.slice(0, 30));

