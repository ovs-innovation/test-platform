import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/biomolecules_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./scripts/biomolecules_official_keys.json', 'utf8'));

// Reconstruct lines per page (pages 2 to 34)
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 34)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
  }
}

// Find questions
const qIndices = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\./);
  if (m) {
    qIndices.push({ qNum: parseInt(m[1]), lineIdx: i, page: linesWithMeta[i].page });
  }
}

console.log(`Found ${qIndices.length} questions in lines dump.`);
const foundNums = qIndices.map(q => q.qNum);
const missing = [];
for (let i = 1; i <= 142; i++) {
  if (!foundNums.includes(i)) missing.push(i);
}
console.log('Missing question numbers:', missing);

