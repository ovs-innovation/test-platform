import fs from 'fs';

let fullText = '';
for (let p = 1; p <= 51; p++) {
  const pageText = fs.readFileSync(`backend/scripts/heights_ocr/page_${p}.txt`, 'utf8');
  fullText += `\n<<<PAGE_${p}>>>\n` + pageText;
}

fs.writeFileSync('backend/scripts/heights_concat.txt', fullText);
console.log('Concatenated all 51 content pages. Length:', fullText.length);

