import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_official_keys.json'), 'utf8'));

// Combine pages 1 to 50 linearly
let combinedText = '';
for (let p = 1; p <= 50; p++) {
  const pad = String(p).padStart(3, '0');
  combinedText += `\n--- PAGE ${p} ---\n` + (cache[pad] || '');
}

fs.writeFileSync(path.resolve(__dirname, 'pblock_ocr_linear.txt'), combinedText);
console.log(`Saved linear OCR text (${combinedText.length} chars).`);
