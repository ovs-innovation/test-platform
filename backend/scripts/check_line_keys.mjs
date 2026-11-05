import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);
console.log('Sample line object:', JSON.stringify(p169.lines[0], null, 2));
console.log('Sample line 1:', JSON.stringify(p169.lines[1], null, 2));

