import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Specific pages to inspect
const candidatePages = [
  7, 10, 13, 14, 15, 18, 20, 22, 23, 25, 35, 37, 54, 56, 57, 58, 63, 66, 70, 74, 78, 80, 120, 128, 136, 137
];

console.log('--- Inspecting candidate diagram pages ---');
for (const p of candidatePages) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const firstLines = text.split('\n').filter(l => l.trim()).slice(0, 5).join(' | ');
  console.log(`\n=== Page ${p} ===\n${firstLines}`);
}
