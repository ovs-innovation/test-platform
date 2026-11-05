import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
console.log("Lines on page 169 containing 91, 92, 93, 94, 97, 99, 100:");
for (const l of p169.lines) {
  if (/\b(?:91|92|93|94|97|99|100)\b/.test(l.Text)) {
    console.log(l.Text);
  }
}

