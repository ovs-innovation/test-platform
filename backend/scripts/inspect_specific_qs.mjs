import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

function inspectQ(qNum, approxPage) {
  console.log(`\n================ INSPECT Q${qNum} around page ${approxPage} ================`);
  for (let p = Math.max(1, approxPage - 1); p <= Math.min(168, approxPage + 1); p++) {
    const text = pages.find(x => x.page === p).text;
    const re = new RegExp(`(?:^|\\n|\\s)${qNum}\\.\\s+`, 'i');
    if (re.test(text)) {
      console.log(`--- FOUND Q${qNum} on Page ${p} ---`);
      console.log(text.slice(0, 1000));
    }
  }
}

inspectQ(57, 30);
inspectQ(85, 49);
inspectQ(90, 52);
inspectQ(111, 65);
inspectQ(170, 104);
inspectQ(195, 125);
inspectQ(244, 153);

