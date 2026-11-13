import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/mole_ocr.json', 'utf8'));

for (let i = 11; i <= 25; i++) {
  console.log(`==================== Q${i} OCR ====================`);
  console.log(ocr[i]);
}

