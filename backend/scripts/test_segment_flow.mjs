import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

// Let's inspect all question blocks
// In each page, let's identify blocks that have an ANSWER or [4 marks...]
// Let's print the flow of questions from page 1 to 10
for (let p = 1; p <= 10; p++) {
  const pg = pages.find(x => x.page === p);
  console.log(`\n================ PAGE ${p} ================`);
  const lines = pg.lines.map(l => l.Text.trim());
  let qNum = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\d+\.?$/.test(l) || /^\d+\.\s+[A-Za-z]/.test(l)) {
      console.log(`  [Header line ${i}] ${l}`);
    } else if (/ANSWER/i.test(l)) {
      console.log(`  [Answer line ${i}] ${l}`);
    } else if (/marks?/i.test(l)) {
      console.log(`  [Marks line ${i}] ${l}`);
    }
  }
}

