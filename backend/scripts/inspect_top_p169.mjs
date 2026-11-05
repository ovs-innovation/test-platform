import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
console.log("Lines on page 169 with y < 250:");
for (const l of p169.lines) {
  const wList = Array.isArray(l.Words) ? l.Words : (l.Words ? [l.Words] : []);
  const minY = Math.min(...wList.map(w => w.Y));
  const minX = Math.min(...wList.map(w => w.X));
  if (minY < 250) {
    console.log(`x=${minX}, y=${minY}: "${l.Text}"`);
  }
}

