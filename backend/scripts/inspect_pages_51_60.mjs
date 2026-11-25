import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Search for Q51 to Q60 in cache
for (let p = 14; p <= 22; p++) {
  console.log(`=== PAGE ${p} ===`);
  console.log(cache[p]);
}
