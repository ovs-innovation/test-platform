import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

// Combine all pages with explicit page delimiters
let fullText = '';
for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  fullText += `\n<<<PAGE_${p}>>>\n` + pageText;
}

fs.writeFileSync(path.resolve(__dirname, 'gravitation_full_ocr_combined.txt'), fullText);

console.log('Combined OCR text length:', fullText.length);
