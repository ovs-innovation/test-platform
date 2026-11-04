import fs from 'fs';

for (const p of [7, 8, 26]) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const content = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  console.log(content);
}

