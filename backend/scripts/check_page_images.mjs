import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [8, 10, 11, 15, 17, 21, 22, 28, 30, 33, 36, 39, 50, 69, 71, 73, 79, 87, 91, 94, 100, 106, 119, 126];

for (const p of pages) {
  const pPad = String(p).padStart(3, '0');
  const imgPath = path.resolve(__dirname, `wave_optics_pages/page_${pPad}.png`);
  console.log(`Page ${p} image exists:`, fs.existsSync(imgPath), `Size: ${fs.statSync(imgPath).size} bytes`);
}
