import fs from 'fs';

for (let p = 1; p <= 25; p++) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const content = fs.readFileSync(`backend/scripts/heights_ocr/page_${p}.txt`, 'utf8');
  console.log(content.slice(0, 1000));
}

