import fs from 'fs';

for (const p of [1, 2, 3, 10, 25, 50, 74, 75, 76]) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const content = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  console.log(content.slice(0, 800));
}

