import fs from 'fs';

const ocrDir = 'backend/scripts/perm_comb_ocr';
const outFile = 'backend/scripts/perm_comb_concat.txt';

let fullText = '';
for (let i = 1; i <= 81; i++) {
  const file = `${ocrDir}/page_${i}.txt`;
  if (fs.existsSync(file)) {
    fullText += `\n\n=== PAGE ${i} ===\n\n` + fs.readFileSync(file, 'utf8');
  }
}

fs.writeFileSync(outFile, fullText, 'utf8');
console.log(`Concatenated ${81} pages into ${outFile} (${fullText.length} chars).`);

