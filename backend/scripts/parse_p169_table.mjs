import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);

const linesWithCoords = p169.lines.map((l, idx) => {
  const wList = Array.isArray(l.Words) ? l.Words : (l.Words ? [l.Words] : []);
  const minX = Math.min(...wList.map(w => w.X));
  const minY = Math.min(...wList.map(w => w.Y));
  return { idx, text: l.Text.trim(), x: minX, y: minY };
});

// Remove header
const dataLines = linesWithCoords.filter(l => !l.text.toLowerCase().includes('answer key'));

// Group into 6 columns by X coordinate
// Col 0: X < 280
// Col 1: 280 <= X < 480
// Col 2: 480 <= X < 680
// Col 3: 680 <= X < 880
// Col 4: 880 <= X < 1080
// Col 5: 1080 <= X
const cols = [[], [], [], [], [], []];

for (const line of dataLines) {
  if (line.x < 280) cols[0].push(line);
  else if (line.x < 480) cols[1].push(line);
  else if (line.x < 680) cols[2].push(line);
  else if (line.x < 880) cols[3].push(line);
  else if (line.x < 1080) cols[4].push(line);
  else cols[5].push(line);
}

for (let c = 0; c < 6; c++) {
  cols[c].sort((a, b) => a.y - b.y);
  console.log(`Column ${c} length: ${cols[c].length}`);
}

// Print all lines of each column to see if any line was split or merged
for (let c = 0; c < 6; c++) {
  console.log(`\n--- COLUMN ${c} (first 10) ---`);
  cols[c].slice(0, 10).forEach(l => console.log(`  y=${l.y}: "${l.text}"`));
}

