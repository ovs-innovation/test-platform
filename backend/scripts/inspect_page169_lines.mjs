import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
console.log(`Total lines on page 169: ${p169.lines.length}`);
for (let i = 0; i < Math.min(25, p169.lines.length); i++) {
  console.log(`Line ${i}: ${p169.lines[i].Text}`);
}

