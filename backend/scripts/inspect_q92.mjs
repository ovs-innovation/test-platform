import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

for (let p = 74; p <= 78; p++) {
  console.log(`\n=== PAGE ${p} ===`);
  console.log(ocrCache[String(p)]);
}
