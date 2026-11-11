import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/kinetics_ocr.json', 'utf8'));
const pdfText = JSON.parse(fs.readFileSync('./backend/scripts/kinetics_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/kinetics_official_key.json', 'utf8'));

const [startStr, endStr] = process.argv.slice(2);
const start = parseInt(startStr || '1', 10);
const end = parseInt(endStr || '10', 10);

for (let i = start; i <= end; i++) {
  console.log(`==================== Q${i} (Ans: ${JSON.stringify(key[i])}) ====================`);
  console.log('--- PDF TEXT ---');
  console.log(pdfText[i]);
  console.log('--- OCR TEXT ---');
  console.log(ocr[i]);
}
