import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);
const officialKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

// Let's inspect the bounding boxes and text of pages 1 to 5
for (let p = 1; p <= 3; p++) {
  const pg = pages.find(x => x.page === p);
  console.log(`\n================ PAGE ${p} ================`);
  // Group words or lines by Y coordinate
  const lines = pg.lines.map(l => {
    const words = Array.isArray(l.Words) ? l.Words : (l.Words ? [l.Words] : []);
    const y = Math.min(...words.map(w => w.Y));
    const x = Math.min(...words.map(w => w.X));
    return { text: l.Text.trim(), x, y };
  });
  lines.sort((a, b) => a.y - b.y || a.x - b.x);
  lines.forEach(l => console.log(`  [y=${Math.round(l.y)}, x=${Math.round(l.x)}] ${l.text}`));
}

