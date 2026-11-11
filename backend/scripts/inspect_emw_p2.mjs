import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/emw_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/emw_official_key.json', 'utf8'));

for (let q = 16; q <= 30; q++) {
  console.log(`=== Q${q} (Key: ${key[q]}) ===`);
  console.log(ocr[`Q${q}`]);
}

