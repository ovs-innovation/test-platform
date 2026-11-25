import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Assemble all text from pages 1 to 60 for Part 1
const textLines = [];
for (let p = 1; p <= 65; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');
  for (const l of lines) {
    textLines.push({ page: p, text: l.trim() });
  }
}

console.log(`Loaded ${textLines.length} lines for pages 1..65`);
