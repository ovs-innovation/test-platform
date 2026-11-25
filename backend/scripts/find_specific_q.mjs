import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/fluids_ocr_cache.json', 'utf8'));

for (const qNum of [9, 89, 138, 156]) {
  console.log(`\n=== Finding Q${qNum} ===`);
  for (const [pageStr, text] of Object.entries(cache)) {
    // Check if the page has the question number followed by dot
    const match = text.match(new RegExp(`(^|\\n)\\s*${qNum}\\.\\s*([^\\n]+)`, 'i'));
    if (match) {
      console.log(`Page ${pageStr}: ${match[0].slice(0, 100)}`);
    }
  }
}
