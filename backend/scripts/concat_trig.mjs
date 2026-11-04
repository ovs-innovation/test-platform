import fs from 'fs';

const outDir = 'backend/scripts/trig_ocr';
let combined = '';
for (let p = 1; p <= 53; p++) {
  const content = fs.readFileSync(`${outDir}/page_${p}.txt`, 'utf8');
  combined += `\n<<<PAGE_${p}>>>\n` + content;
}

fs.writeFileSync('backend/scripts/trig_concat.txt', combined);
console.log('Concatenated all 53 pages! Total length:', combined.length);

