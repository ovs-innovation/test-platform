import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/mole_ocr.json', 'utf8'));

for (let i = 46; i <= 84; i++) {
  console.log(`==================== Q${i} OCR ====================`);
  console.log(ocr[i]);
}

