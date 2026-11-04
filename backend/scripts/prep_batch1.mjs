import fs from 'fs';

// Let's write an extractor for questions 1 to 25
const pages = [];
for (let p = 1; p <= 15; p++) {
  pages.push(fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8'));
}

const fullText = pages.join('\n\n---PAGE---\n\n');
fs.writeFileSync('backend/scripts/preview_1_25.txt', fullText);
console.log('Saved preview_1_25.txt');

