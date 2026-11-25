import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

for (let p = 11; p <= 16; p++) {
  console.log(`==================== PAGE ${p} ====================`);
  console.log(ocr[p]);
}
