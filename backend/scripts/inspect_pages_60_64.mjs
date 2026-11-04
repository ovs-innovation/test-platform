import fs from 'fs';

for (let p = 60; p <= 64; p++) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const content = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  console.log(content);
}

