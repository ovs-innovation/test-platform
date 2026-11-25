import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_ocr_cache.json'), 'utf8'));

const mentions = [];
for (let p = 1; p <= 56; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');

  for (const line of lines) {
    if (/(?:graph|plot|shown\s+below|figure|diagram|schematic|curve|represented\s+by)/i.test(line)) {
      mentions.push({ page: p, line: line.trim() });
    }
  }
}

console.log('Diagram / figure mentions found:');
mentions.forEach(m => console.log(`Page ${m.page}: ${m.line}`));
