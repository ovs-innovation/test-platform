import fs from 'fs';

const pdfItems = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_text_items.json', 'utf8'));
const ocr = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_official_key.json', 'utf8'));

let out = '';
for (let q = 1; q <= 103; q++) {
  out += `==================== Q${q} [Key: ${key[q]}] ====================\n`;
  out += `PDF_TEXT: ${pdfItems[q] || ''}\n`;
  out += `OCR_TEXT: ${ocr[q] || ''}\n\n`;
}

fs.writeFileSync('./backend/scripts/hydrocarbons_raw_inspect.txt', out, 'utf8');
console.log('Saved hydrocarbons_raw_inspect.txt');

