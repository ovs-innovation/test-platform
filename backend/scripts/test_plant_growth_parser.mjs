import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_official_keys.json', 'utf8'));

// Filter pages 2 to 22
const questionPages = pages.filter(p => p.page >= 2 && p.page <= 22);

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of questionPages) {
  const items = [...p.items];
  items.sort((a, b) => {
    if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
    return a.x - b.x;
  });

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        const text = currentLineItems.map(i => i.str).join(' ').trim();
        linesWithMeta.push({ page: p.page, text });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    const text = currentLineItems.map(i => i.str).join(' ').trim();
    linesWithMeta.push({ page: p.page, text });
  }
}

// Find all Q starts
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const line = linesWithMeta[i].text;
  const m = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2]
    });
  }
}

console.log(`Found ${qStarts.length} question starts.`);
console.log('Question numbers found:', qStarts.map(q => q.num));

// Check missing numbers
const allNums = Array.from({ length: 135 }, (_, i) => i + 1);
const foundNums = new Set(qStarts.map(q => q.num));
const missingNums = allNums.filter(n => !foundNums.has(n));
console.log('Missing question numbers:', missingNums);

