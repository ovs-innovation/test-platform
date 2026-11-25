import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

for (const p of [31, 33, 41, 44, 45, 66]) {
  const pad = String(p).padStart(3, '0');
  console.log(`==================== PAGE ${p} ====================`);
  console.log(cache[pad]);
}
