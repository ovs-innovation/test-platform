import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

for (let p = 121; p <= 211; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const start = lines.slice(0, 2).join(' ').slice(0, 95);
  console.log(`P.${p}: "${start}"`);
}
