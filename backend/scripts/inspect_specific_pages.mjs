import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

for (const pNum of [31, 32, 60, 61, 62]) {
  console.log(`\n=================== PAGE ${pNum} ===================`);
  console.log(pages[pNum - 1].text);
}

