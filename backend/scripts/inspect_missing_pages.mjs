import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const pages = text.split(/===\s*PAGE\s*(\d+)\s*===/i);

const targetPages = [115, 116, 117, 118, 127, 128, 129, 130, 131, 132, 133, 142, 143, 148, 149];

for (let i = 1; i < pages.length; i += 2) {
  const pNum = parseInt(pages[i], 10);
  if (targetPages.includes(pNum)) {
    console.log(`\n==================== PAGE ${pNum} ====================`);
    console.log(pages[i + 1]);
  }
}
