import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/dn_ocr.json', 'utf8'));
const rawText = fs.readFileSync('backend/scripts/dn_pdf_text.txt', 'utf8');

const diagQs = [];
for (let q = 1; q <= 123; q++) {
  const ocrText = (ocr[`Q${q}`] || '').toLowerCase();
  if (
    ocrText.includes('figure') ||
    ocrText.includes('graph') ||
    ocrText.includes('plot') ||
    ocrText.includes('shown in') ||
    ocrText.includes('curves')
  ) {
    diagQs.push(q);
  }
}

console.log('Detected potential diagram/graph questions:', diagQs);

