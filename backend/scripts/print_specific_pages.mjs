import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

function printPageLines(p) {
  console.log(`\n================ PAGE ${p} ================`);
  const pg = pages.find(x => x.page === p);
  pg.lines.forEach((l, idx) => {
    console.log(`  [${idx}] ${l.Text}`);
  });
}

printPageLines(30);
printPageLines(49);
printPageLines(52);
printPageLines(65);
printPageLines(105);
printPageLines(125);
printPageLines(153);

