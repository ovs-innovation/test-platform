import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const pages = text.split(/===\s*PAGE\s*(\d+)\s*===/i);

const target = [129, 130, 131, 132, 133, 149, 150];
for (let i = 1; i < pages.length; i += 2) {
  const p = parseInt(pages[i], 10);
  if (target.includes(p)) {
    console.log(`\n==================== PAGE ${p} ====================`);
    console.log(pages[i + 1]);
  }
}
