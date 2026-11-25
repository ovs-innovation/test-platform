import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

for (let p = 47; p <= 55; p++) {
  console.log(`\n=== PAGE ${p} ===`);
  const lines = (pages[String(p)] || '').split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 5).join('\n'));
}
