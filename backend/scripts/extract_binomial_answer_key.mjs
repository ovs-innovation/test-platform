import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const lastPage = pages.find(p => p.page === 169);
console.log("Page 169 text snippet:");
console.log(lastPage.text.slice(0, 1000));
console.log("\nLast 500 chars of Page 169:");
console.log(lastPage.text.slice(-500));

