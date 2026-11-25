import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_official_keys.json', 'utf8'));

console.log('Total keys:', Object.keys(keys).length);

for (let p = 1; p <= 6; p++) {
  console.log(`\n=================== PAGE ${p} ===================`);
  console.log(cache[String(p)] || '[NO CONTENT]');
}
