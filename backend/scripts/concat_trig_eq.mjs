import fs from 'fs';

const outDir = 'backend/scripts/trig_eq_ocr';
let combined = '';
for (let p = 1; p <= 60; p++) {
  const content = fs.readFileSync(`${outDir}/page_${p}.txt`, 'utf8');
  combined += `\n<<<PAGE_${p}>>>\n` + content;
}

fs.writeFileSync('backend/scripts/trig_eq_concat.txt', combined);
console.log('Concatenated all 60 pages! Total length:', combined.length);

