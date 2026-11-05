import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

for (let p = 85; p <= 118; p++) {
  const page = data[p - 1];
  const qNums = [];
  const lines = page.lines.map(l => l.Text.trim());
  for (let i = 0; i < lines.length; i++) {
    // Check various patterns for 151-200
    const m = lines[i].match(/^(?:Q\.?|Question)?\s*(\d{3})\s*[\.\•\)]/i) || 
              lines[i].match(/^(\d{3})\b/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 150 && n <= 200) {
        qNums.push({ q: n, line: lines[i] });
      }
    }
  }
  console.log(`Page ${p}: ${qNums.map(x => `${x.q} ("${x.line}")`).join(', ')}`);
}

