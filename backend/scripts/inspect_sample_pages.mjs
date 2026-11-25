import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));

[1, 2, 28, 42, 81, 110].forEach(p => {
  console.log(`\n=================== PAGE ${p} ===================`);
  console.log(cache[p]);
});
