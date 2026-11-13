import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_official_key.json', 'utf8'));
const urls = JSON.parse(fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/scripts/semi_diagram_urls.json', 'utf8'));

for (let i = 46; i <= 90; i++) {
  const qKey = `q_${i}`;
  const text = ocr[qKey] || '';
  const firstLine = text.split('\n').filter(l => l.trim()).slice(0, 2).join(' ');
  const hasDiag = Boolean(urls[`semi_q${i}`]);
  console.log(`Q${i} (Ans: ${key[i]}, Diag: ${hasDiag}): ${firstLine.substring(0, 80)}`);
}

