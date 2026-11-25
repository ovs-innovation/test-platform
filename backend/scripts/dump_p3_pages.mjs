import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');
const pages = text.split(/===\s*PAGE\s*(\d+)\s*===/i);

const p3Text = [];
for (let i = 1; i < pages.length; i += 2) {
  const pNum = parseInt(pages[i], 10);
  if (pNum >= 112 && pNum <= 170) {
    p3Text.push(`\n==================== PAGE ${pNum} ====================\n` + pages[i + 1]);
  }
}

fs.writeFileSync(path.resolve(__dirname, 'p3_pages_112_170.txt'), p3Text.join('\n'));
console.log('Saved Part 3 pages 112 to 170 to p3_pages_112_170.txt');
