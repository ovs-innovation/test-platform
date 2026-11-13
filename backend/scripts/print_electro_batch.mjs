import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/electro_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/electro_official_key.json', 'utf8'));

const fromQ = parseInt(process.argv[2] || '1', 10);
const toQ = parseInt(process.argv[3] || '25', 10);

console.log(`=== Inspecting Q${fromQ} to Q${toQ} ===`);
for (let q = fromQ; q <= toQ; q++) {
  console.log(`\n----------------- Q${q} [Official Key: ${key[q]}] -----------------`);
  console.log(ocr[q] || '(no OCR)');
}

