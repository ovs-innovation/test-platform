import fs from 'fs';

const ocrDir = 'backend/scripts/hyperbola_ocr';
let fullText = '';

for (let i = 1; i <= 92; i++) {
  const filePath = `${ocrDir}/page_${i}.txt`;
  if (fs.existsSync(filePath)) {
    fullText += `\n\n=== PAGE ${i} ===\n\n` + fs.readFileSync(filePath, 'utf8');
  }
}

fs.writeFileSync('backend/scripts/hyperbola_concat.txt', fullText);
console.log(`Concatenated 92 pages. Total chars: ${fullText.length}`);

