import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

for (let p = 1; p <= 5; p++) {
  const pg = pages.find(item => item.page === p);
  console.log(`\n=================== PAGE ${p} ===================`);
  console.log(pg.text);
}

