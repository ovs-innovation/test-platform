import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

function printQuestionDetails(pStart, pEnd, label) {
  console.log(`\n================== ${label} (Pages ${pStart}-${pEnd}) ==================`);
  for (let p = pStart; p <= pEnd; p++) {
    const pg = pages.find(x => x.page === p);
    console.log(`--- Page ${p} ---`);
    console.log(pg.text);
  }
}

printQuestionDetails(1, 1, 'Q1');
printQuestionDetails(21, 22, 'Q44');
printQuestionDetails(25, 26, 'Q49');
printQuestionDetails(48, 49, 'Q84');
printQuestionDetails(54, 55, 'Q95');

