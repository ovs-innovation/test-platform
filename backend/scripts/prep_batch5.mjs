import fs from 'fs';

const pages = [];
for (let p = 53; p <= 76; p++) {
  pages.push(`\n<<<PAGE_${p}>>>\n` + fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8'));
}

const fullText = pages.join('\n');
fs.writeFileSync('backend/scripts/preview_101_135.txt', fullText);
console.log('Saved preview_101_135.txt, length:', fullText.length);

