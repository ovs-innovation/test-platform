import fs from 'fs';

const pages = [];
for (let p = 40; p <= 53; p++) {
  pages.push(`\n<<<PAGE_${p}>>>\n` + fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8'));
}

const fullText = pages.join('\n');
fs.writeFileSync('backend/scripts/preview_76_100.txt', fullText);
console.log('Saved preview_76_100.txt, length:', fullText.length);

