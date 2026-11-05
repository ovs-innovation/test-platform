import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

// On each page, look for question numbers
// In AcadXL PDFs, question headers are often at the start of a line or after a solution:
// e.g. "41. ", "42. ", "43. "
// Let's search line by line with word coordinates or regex
const qLocations = {};

for (const p of pages) {
  if (p.page === 128) continue;
  const lines = p.lines || [];
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const line = lines[lIdx];
    const text = line.Text;
    // Look for question header at start of line
    const m = text.match(/^(\d{1,3})\s*[\.\•\)]\s*(.*)/);
    if (m) {
      const qNum = parseInt(m[1]);
      if (qNum >= 1 && qNum <= 160) {
        if (!qLocations[qNum]) qLocations[qNum] = [];
        qLocations[qNum].push({ page: p.page, lineIndex: lIdx, lineText: text });
      }
    }
  }
}

const found = Object.keys(qLocations).map(Number).sort((a,b)=>a-b);
console.log(`Found direct question headers: ${found.length}/160`);

const missing = [];
for (let i = 1; i <= 160; i++) {
  if (!qLocations[i]) missing.push(i);
}
console.log('Missing question headers:', missing);

