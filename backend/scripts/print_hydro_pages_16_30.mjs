import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_ocr_cache.json'), 'utf8'));

// Print pages 16 to 30
for (let p = 16; p <= 30; p++) {
  console.log(`\n================ PAGE ${p} ================`);
  console.log(cache[p]);
}
