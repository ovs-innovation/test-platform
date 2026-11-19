import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_ocr_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_official_key.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_diagram_urls.json'), 'utf8'));

// Test parsing page 1 to 5
for (let p = 1; p <= 5; p++) {
  const pad = String(p).padStart(3, '0');
  console.log(`=== Page ${p} ===`);
  const text = ocrCache[pad];
  console.log(text);
}
