import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/emw_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/emw_official_key.json', 'utf8'));

for (let q = 46; q <= 56; q++) {
  console.log(`=== Q${q} (Key: ${key[q]}) ===`);
  console.log(ocr[`Q${q}`]);
}

