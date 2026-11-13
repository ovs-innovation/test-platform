import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_ocr.json', 'utf8'));

for (let q = 53; q <= 78; q++) {
  console.log(`\n=================== Q${q} ===================`);
  console.log(ocr[q].ocrText);
}

