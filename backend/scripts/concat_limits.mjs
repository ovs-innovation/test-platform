import fs from 'fs';
import path from 'path';

const baseDir = fs.existsSync('backend/scripts') ? 'backend/scripts' : 'scripts';
const ocrDir = path.join(baseDir, 'limits_ocr');
const outFile = path.join(baseDir, 'limits_concat.txt');

let fullText = '';
for (let i = 1; i <= 71; i++) {
  const file = path.join(ocrDir, `page_${i}.txt`);
  if (fs.existsSync(file)) {
    fullText += `\n\n=== PAGE ${i} ===\n\n` + fs.readFileSync(file, 'utf8');
  }
}

fs.writeFileSync(outFile, fullText);
console.log(`Concatenated 71 pages into ${outFile} (${fullText.length} characters)`);
