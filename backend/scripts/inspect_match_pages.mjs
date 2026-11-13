import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

for (const pNum of [2, 3, 11, 12]) {
  console.log(`\n================ PAGE ${pNum} ================`);
  console.log(pages[pNum - 1].rawText);
}
