import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

// Let's print the OCR text around each target question to see if it mentions "figure", "shown in the figure", "(see figure)"
const targets = [6, 7, 9, 12, 13, 17, 19, 22, 25, 27, 34, 37, 39, 48, 61, 62, 64, 78, 81, 102, 110, 121, 125, 134, 138, 143, 149, 156, 175];

for (const [page, text] of Object.entries(ocr)) {
  for (const qNum of targets) {
    if (text.includes(`figure`) || text.includes(`shown`) || text.includes(`diagram`)) {
      // check if this page is likely for qNum
    }
  }
}

// Let's check which questions actually say "figure" or "shown" in the entire OCR
for (let p = 1; p <= 93; p++) {
  const pStr = String(p).padStart(3, '0');
  const text = ocr[pStr] || '';
  const lines = text.split('\n');
  lines.forEach(l => {
    if (/(?:figure|shown|diagram|see fig)/i.test(l) && !/answer|solution|hence|option/i.test(l)) {
      console.log(`P${pStr}: ${l.slice(0, 100)}`);
    }
  });
}
