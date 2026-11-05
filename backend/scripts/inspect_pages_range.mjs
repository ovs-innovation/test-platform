import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

// Print page 1 to 10 summary
for (let i = 0; i < 10; i++) {
  const p = pages[i];
  console.log(`==================== PAGE ${p.page} ====================`);
  console.log(p.text);
}

