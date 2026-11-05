import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

for (const p of [1, 2]) {
  const pg = pages.find(x => x.page === p);
  console.log(`\n=================== PAGE ${p} ===================`);
  pg.lines.forEach((l, idx) => {
    console.log(`[${idx}] ${l.Text}`);
  });
}

