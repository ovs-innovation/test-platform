import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

// List of candidate pages to inspect
const candidatePages = [
  8, 10, 11, 15, 17, 21, 22, 28, 30, 33, 36, 39, 50, 54, 64, 69, 70, 71, 73, 78, 79, 87, 91, 94, 100, 106, 119, 126
];

for (const p of candidatePages) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const lines = (pages[p] || '').split('\n').map(l => l.trim()).filter(Boolean);
  lines.forEach(l => {
    if (l.match(/^(\d{1,3}[\.:\s]|ANSWER:|\[4\s*marks|\(A\)|\(1\)|Q\.?\s*\d+)/i) || l.toLowerCase().includes('figure') || l.toLowerCase().includes('diagram') || l.toLowerCase().includes('shown')) {
      console.log('  ', l.substring(0, 90));
    }
  });
}
