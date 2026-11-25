import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Print question stems and options for pages 1 to 20
for (let p = 1; p <= 20; p++) {
  console.log(`\n================ PAGE ${p} ================`);
  console.log(ocrCache[String(p)]);
}
