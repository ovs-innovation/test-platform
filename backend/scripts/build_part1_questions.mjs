import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Concatenate text from pages 1 to 36
let textPart1 = '';
for (let p = 1; p <= 36; p++) {
  const pad = String(p).padStart(3, '0');
  textPart1 += `\n<<<PAGE_${p}>>>\n` + (cache[pad] || '');
}

fs.writeFileSync(path.resolve(__dirname, 'part1_raw_text.txt'), textPart1);
console.log('Part 1 raw text length:', textPart1.length);
