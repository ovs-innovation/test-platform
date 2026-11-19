import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

const targets = [6, 7, 9, 12, 13, 17, 19, 22, 25, 27, 34, 37, 39, 48, 61, 62, 64, 78, 81, 102, 110, 121, 125, 134, 138, 143, 149, 156, 175];

const results = {};

for (const qNum of targets) {
  for (let p = 1; p <= 93; p++) {
    const pStr = String(p).padStart(3, '0');
    const text = ocr[pStr] || '';
    // Look for question start like "6." or "6 " or "Q. 6" or "Q6"
    const re = new RegExp(`(?:^|\\n)\\s*${qNum}\\s*\\.\\s+`, 'i');
    if (re.test(text)) {
      results[qNum] = p;
      break;
    }
  }
}

console.log('Found question pages:', results);
for (const qNum of targets) {
  if (!results[qNum]) {
    console.log(`Missing page for Q${qNum}! Searching fuzzily...`);
    for (let p = 1; p <= 93; p++) {
      const pStr = String(p).padStart(3, '0');
      const text = ocr[pStr] || '';
      if (text.includes(`${qNum}.`) || text.includes(`${qNum} .`) || text.includes(` ${qNum} `)) {
        console.log(`  Candidate for Q${qNum}: page ${p}`);
      }
    }
  }
}
