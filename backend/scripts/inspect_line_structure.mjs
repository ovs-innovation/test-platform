import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 22)) {
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

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const line = linesWithMeta[i].text;
  const m = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      firstLine: line
    });
  }
}

for (const q of qStarts) {
  const next = qStarts.find(x => x.num === q.num + 1);
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const rawLines = linesWithMeta.slice(q.lineIndex, endIdx).map(l => l.text);
  console.log(`Q${q.num}: Line 0 = "${rawLines[0]}", Line 1 = "${rawLines[1]}"`);
}

