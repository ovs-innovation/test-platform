import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p168 = pages.find(p => p.page === 168);
console.log("Page 168 lines:");
p168.lines.forEach((l, idx) => console.log(`[${idx}] ${l.Text}`));

