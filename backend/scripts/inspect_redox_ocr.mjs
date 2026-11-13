import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/redox_ocr.json', 'utf8'));

for (let i = 1; i <= 36; i++) {
  console.log(`==================== Q${i} ====================`);
  console.log(ocr[i]);
}

