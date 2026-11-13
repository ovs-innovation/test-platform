import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));

// Filter pages 2 to 20
const qPages = pagesDump.filter(p => p.page >= 2 && p.page <= 20);

// Let's reconstruct lines for each page
const pagesLines = [];
for (const p of qPages) {
  const lines = [];
  let currentLine = [];
  let lastY = null;

  for (const it of p.items) {
    if (lastY === null || Math.abs(it.y - lastY) > 3) {
      if (currentLine.length > 0) {
        lines.push(currentLine.map(x => x.str).join(' '));
      }
      currentLine = [it];
      lastY = it.y;
    } else {
      currentLine.push(it);
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine.map(x => x.str).join(' '));
  }
  pagesLines.push({ page: p.page, lines });
}

// Print first 50 lines of Page 2, 3, 4 to inspect structure
console.log('=== Page 2 Lines ===');
console.log(pagesLines[0].lines.slice(0, 30).join('\n'));

console.log('=== Page 3 Lines ===');
console.log(pagesLines[1].lines.slice(0, 30).join('\n'));

