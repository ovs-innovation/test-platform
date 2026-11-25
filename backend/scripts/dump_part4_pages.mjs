import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

const out = [];
for (let p = 151; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  out.push(`=== PAGE ${p} ===`);
  out.push(lines.slice(0, 8).join('\n'));
}

fs.writeFileSync(path.resolve(__dirname, 'part4_page_snippets.txt'), out.join('\n\n'));
console.log('Saved part4_page_snippets.txt');
