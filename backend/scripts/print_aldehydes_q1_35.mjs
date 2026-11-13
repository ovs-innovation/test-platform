import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_ocr.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_official_key.json', 'utf8'));

for (let i = 1; i <= 35; i++) {
  console.log(`=== Q${i} (Ans: ${keys[i]}) ===`);
  console.log(ocr[i]?.rawText || 'MISSING');
}

