import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/hydro_jee_ocr_cache.json', 'utf8'));
const list = JSON.parse(fs.readFileSync('backend/scripts/hydro_page_ranges.json', 'utf8'));

const qToPage = {};
for (const item of list) {
  for (const q of item.qs) {
    qToPage[q] = item.p;
  }
}

for (let q = 121; q <= 180; q++) {
  const p = qToPage[q];
  const pText = ocr[String(p)] || '';
  const firstLine = pText.split('\n').filter(Boolean).slice(0, 3).join(' | ');
  console.log(`Q${q} (Page ${p}): ${firstLine.slice(0, 100)}`);
}
