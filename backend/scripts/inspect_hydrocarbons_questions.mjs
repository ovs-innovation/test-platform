import fs from 'fs';

const pdfItems = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_text_items.json', 'utf8'));
const ocrItems = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_ocr.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_official_key.json', 'utf8'));

console.log('Sample comparison for Q1 to Q10:');
for (let q = 1; q <= 10; q++) {
  console.log(`\n--- Q${q} (Ans: ${keys[q]}) ---`);
  console.log(`PDF Text: ${pdfItems[q]?.slice(0, 150)}...`);
  console.log(`OCR Text: ${ocrItems[q]?.split('\n')[0]}...`);
}
