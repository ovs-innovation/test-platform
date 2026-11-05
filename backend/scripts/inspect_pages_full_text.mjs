import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

for (let p = 1; p <= 3; p++) {
  const pg = pages.find(x => x.page === p);
  console.log(`\n=================== FULL TEXT PAGE ${p} ===================`);
  console.log(pg.text);
}

