import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/hydro_jee_ocr_cache.json', 'utf8'));

// Check each page 60 to 94
for (let p = 60; p <= 94; p++) {
  const text = ocr[String(p)] || '';
  console.log(`=== PAGE ${p} ===`);
  const lines = text.split('\n').filter(Boolean);
  lines.forEach(l => {
    if (/—|->|H2|HNO3|H2SO4|AlCl3|KMnO4|O3|Zn|product|major|structure|reagent/i.test(l)) {
      console.log('  ', l.trim().slice(0, 100));
    }
  });
}
