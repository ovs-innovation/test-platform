import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Find questions 1 to 60 across pages 1 to 36
for (let q = 1; q <= 60; q++) {
  // Search for question q in cache
  let found = false;
  for (let p = 1; p <= 36; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    const regex = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i');
    if (regex.test(text)) {
      found = true;
      break;
    }
  }
  if (!found) {
    console.log(`Q${q} not found by simple regex in pages 1..36`);
  }
}
console.log('Q1 to Q60 scan complete.');
