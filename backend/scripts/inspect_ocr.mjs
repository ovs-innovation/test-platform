import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

console.log('Total pages in OCR cache:', Object.keys(ocr).length);
console.log('Sample Page 1:');
console.log(ocr[1]?.slice(0, 500));
console.log('---');
console.log('Sample Page 20:');
console.log(ocr[20]?.slice(0, 500));

// Find regex patterns matching question starts
const questionsFound = [];
for (let p = 1; p <= 120; p++) {
  const text = ocr[p] || '';
  const matches = [...text.matchAll(/(?:^|\n)\s*(?:Q\.?\s*|Question\s*)?(\d{1,3})\s*[\.:\)]/gi)];
  for (const m of matches) {
    questionsFound.push({ qNum: parseInt(m[1]), page: p, raw: m[0] });
  }
}

console.log('Total regex question matches found:', questionsFound.length);
console.log('First 10 matches:', questionsFound.slice(0, 10));
