import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/bonding_ocr_cache.json', 'utf8'));

for (let p = 48; p <= 60; p++) {
  const text = ocr[p] || '';
  const firstLine = text.split('\n').filter(l => l.trim().length > 0).slice(0, 3).join(' | ');
  console.log(`Page ${p}: ${firstLine.slice(0, 100)}`);
}
