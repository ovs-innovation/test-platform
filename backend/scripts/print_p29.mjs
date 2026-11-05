import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const pg = pages.find(x => x.page === 29);
console.log("PAGE 29:");
pg.lines.forEach((l, idx) => console.log(`  [${idx}] ${l.Text}`));

