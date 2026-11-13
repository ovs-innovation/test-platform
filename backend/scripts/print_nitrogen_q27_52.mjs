import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/nitrogen_ocr.json', 'utf8'));

for (let q = 27; q <= 52; q++) {
  console.log(`\n=================== Q${q} ===================`);
  console.log(ocr[q].ocrText);
}

