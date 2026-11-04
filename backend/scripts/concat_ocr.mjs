import fs from 'fs';

let fullText = '';
for (let p = 1; p <= 76; p++) {
  const pageText = fs.readFileSync(`backend/scripts/ocr_results/page_${p}.txt`, 'utf8');
  fullText += `\n<<<PAGE_${p}>>>\n` + pageText;
}

fs.writeFileSync('backend/scripts/all_pages_concat.txt', fullText);
console.log('Concatenated all 76 pages. Total characters:', fullText.length);

