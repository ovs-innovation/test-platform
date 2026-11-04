import fs from 'fs';

const ocrDir = 'backend/scripts/sets_relations_ocr';
const outFile = 'backend/scripts/sets_relations_concat.txt';

let concat = '';
for (let p = 1; p <= 60; p++) {
  const file = `${ocrDir}/page_${p}.txt`;
  if (fs.existsSync(file)) {
    concat += `\n<<<PAGE_${p}>>>\n` + fs.readFileSync(file, 'utf8');
  }
}

fs.writeFileSync(outFile, concat);
console.log('Concatenated all pages to', outFile);

