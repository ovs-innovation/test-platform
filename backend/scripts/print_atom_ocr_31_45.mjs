import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/atom_ocr.json', 'utf8'));

for (let i = 31; i <= 45; i++) {
  console.log(`==================== Q${i} OCR ====================`);
  console.log(ocr[i]);
}

