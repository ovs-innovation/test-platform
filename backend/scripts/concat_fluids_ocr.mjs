import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocr = JSON.parse(fs.readFileSync(path.join(__dirname, 'fluids_ocr_cache.json'), 'utf8'));

let fullText = '';
for (let p = 1; p <= 93; p++) {
  const pStr = String(p).padStart(3, '0');
  fullText += `\n\n--- PAGE ${p} ---\n\n` + (ocr[pStr] || '');
}

fs.writeFileSync(path.join(__dirname, 'fluids_full_ocr_concat.txt'), fullText, 'utf8');
console.log('Saved fluids_full_ocr_concat.txt with length:', fullText.length);
