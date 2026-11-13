import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/bond_ocr.json', 'utf8'));
const pdfText = JSON.parse(fs.readFileSync('backend/scripts/bond_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/bond_official_key.json', 'utf8'));

const startQ = parseInt(process.argv[2] || '1', 10);
const endQ = parseInt(process.argv[3] || '20', 10);

console.log(`=== Inspecting Q${startQ} to Q${endQ} ===\n`);

for (let q = startQ; q <= endQ; q++) {
  console.log(`----------------------------------------`);
  console.log(`Q${q} | Official Key: ${key[q]}`);
  console.log(`PDF Text: ${pdfText[q] || 'NONE'}`);
  console.log(`OCR Text:\n${ocr[q] || 'NONE'}`);
}

