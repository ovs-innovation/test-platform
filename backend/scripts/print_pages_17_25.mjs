import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

for (let p = 17; p <= 25; p++) {
  console.log(`==================== PAGE ${p} ====================`);
  console.log(ocr[p]);
}
