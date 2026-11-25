import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = {};
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages[pNum] = pText;
}

// Let's inspect where Q30, Q31, Q32 are
for (let p = 15; p <= 25; p++) {
  if (pages[p]) {
    const lines = pages[p].split('\n').filter(l => l.trim().length > 0);
    for (const l of lines) {
      if (l.includes('30.') || l.includes('31.') || l.includes('32.') || l.toLowerCase().includes('answer:')) {
        console.log(`Page ${p}: ${l}`);
      }
    }
  }
}
