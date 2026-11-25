import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));
const found = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_found_questions_map.json'), 'utf8'));

// Check Q34:
const p33 = found['33'] ? found['33'][0].page : null;
const p35 = found['35'] ? found['35'][0].page : null;
console.log(`Q33 is on page ${p33}, Q35 is on page ${p35}`);

for (let p = p33; p <= p35; p++) {
  console.log(`\n=== PAGE ${p} ===`);
  console.log(ocrCache[String(p)]);
}
