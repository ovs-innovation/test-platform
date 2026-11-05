import fs from 'fs';
import path from 'path';

const baseDir = fs.existsSync('backend/scripts') ? 'backend/scripts' : 'scripts';
const ocrDir = path.join(baseDir, 'integration_ocr');
const outFile = path.join(baseDir, 'integration_concat.txt');

let fullText = '';
for (let i = 1; i <= 77; i++) {
  const file = path.join(ocrDir, `page_${i}.txt`);
  if (fs.existsSync(file)) {
    fullText += `\n\n=== PAGE ${i} ===\n\n` + fs.readFileSync(file, 'utf8');
  }
}

fs.writeFileSync(outFile, fullText);
console.log(`Concatenated 77 pages into ${outFile} (${fullText.length} characters)`);

