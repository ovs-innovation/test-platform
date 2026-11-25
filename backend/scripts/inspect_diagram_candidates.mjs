import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qPageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_q_page_map.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));

const candidates = [13, 14, 15, 27, 35, 62, 75, 76, 153, 164, 170, 172, 195, 210];

candidates.forEach(q => {
  const pList = qPageMap[q] || [];
  const p = pList[0];
  console.log(`\n================ Q${q} (Page ${p}) ================`);
  if (p && cache[p]) {
    const text = cache[p];
    // Find Qq in text
    const idx = text.indexOf(`${q}.`) !== -1 ? text.indexOf(`${q}.`) : text.indexOf(`${q})`);
    if (idx !== -1) {
      console.log(text.slice(idx, idx + 400));
    } else {
      console.log(text.slice(0, 400));
    }
  }
});
