import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

for (let p = 89; p <= 101; p++) {
  console.log(`\n=================== Page ${p} ===================`);
  console.log(pages[String(p)]);
}
