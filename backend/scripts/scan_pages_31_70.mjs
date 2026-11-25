import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

for (let p = 31; p <= 70; p++) {
  const text = cache[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const first3 = lines.slice(0, 2).join(' ');
  console.log(`Page ${p}: "${first3.slice(0, 90)}"`);
}
