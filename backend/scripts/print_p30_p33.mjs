import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

for (let p = 30; p <= 33; p++) {
  const pg = pages.find(x => x.page === p);
  console.log(`\n================ PAGE ${p} ================`);
  pg.lines.forEach((l, idx) => {
    if (/ANSWER/i.test(l.Text) || /^\d+\.?$/.test(l.Text.trim()) || /marks/i.test(l.Text) || /^\([A-D]\)/.test(l.Text.trim())) {
      console.log(`  [${idx}] ${l.Text}`);
    }
  });
}

