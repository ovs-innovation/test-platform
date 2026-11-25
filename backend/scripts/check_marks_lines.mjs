import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

let marksCount = 0;
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    if (/marks/i.test(l) && !l.includes('Maximum marks')) {
      marksCount++;
    }
  }
}

console.log(`Total marks lines found: ${marksCount}`);
