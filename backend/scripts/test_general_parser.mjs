import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_official_keys.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 43)) {
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

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2].trim()
    });
  }
}

const failed = [];
const success = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const num = cur.num;

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text.replace(/Open solution/gi, '').trim())
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|Out of syllabus|These questions are on topics/i.test(t));

  const contentLines = rawLines.slice(1);
  let combined = contentLines.join(' ').trim();

  // Find options
  // Notice: Some options are formatted as (A) or (a) or (A) (B) (C) (D)
  const aIdx = combined.search(/\(A\)\s+/);
  const bIdx = combined.search(/\(B\)\s+/);
  const cIdx = combined.search(/\(C\)\s+/);
  const dIdx = combined.search(/\(D\)\s+/);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    success.push(num);
  } else {
    failed.push({ num, aIdx, bIdx, cIdx, dIdx });
  }
}

console.log(`Success: ${success.length}, Failed: ${failed.length}`);
console.log('Failed nums:', failed.map(f => f.num));
