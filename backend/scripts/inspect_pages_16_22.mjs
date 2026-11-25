import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

for (let p = 16; p <= 22; p++) {
  console.log(`\n================ PAGE ${p} ================`);
  console.log(cache[String(p)]);
}
