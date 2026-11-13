import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_official_key.json', 'utf8'));
const urls = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_diagram_urls.json', 'utf8'));

for (let i = 91; i <= 130; i++) {
  const qKey = `Q${i}`;
  const text = (ocr[qKey] || '').replace(/\r/g, '');
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const diagUrl = urls[`semi_q${i}_diagram`] || null;
  console.log(`=== Q${i} (Official: ${key[i]}, Diag: ${diagUrl ? 'YES' : 'NO'}) ===`);
  console.log(lines.join(' // '));
  console.log('');
}

