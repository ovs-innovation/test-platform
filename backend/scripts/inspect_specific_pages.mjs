import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

const testPages = [1, 49, 50, 69, 70, 73, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 106, 107, 115, 116, 136, 137, 139];

for (const p of testPages) {
  console.log(`\n================ PAGE ${p} ================`);
  const lines = cache[String(p)].split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 15).join('\n'));
}
