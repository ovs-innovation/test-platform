import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));

// Let's inspect page 138 to 144 to see where the extra ANSWER lines are!
for (let p = 138; p <= 144; p++) {
  console.log(`\n================ PAGE ${p} ================`);
  console.log(cache[String(p)]);
}
