import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

for (let p = 0; p < 33; p++) {
  const text = pages[p].rawText;
  if (/Assertion/i.test(text)) {
    console.log(`Page ${p + 1} has Assertion:`);
    pages[p].lines.forEach((l, idx) => {
      if (/Assertion|Reason|\(A\)\s+is|\(R\)\s+is|Both\s+.*are correct/i.test(l)) {
        console.log(`  [line ${idx}]: ${l}`);
      }
    });
  }
}

