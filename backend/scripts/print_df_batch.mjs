import fs from 'fs';

const pdfText = JSON.parse(fs.readFileSync('./backend/scripts/df_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/df_official_key.json', 'utf8'));

let ocr = {};
if (fs.existsSync('./backend/scripts/df_ocr.json')) {
  try { ocr = JSON.parse(fs.readFileSync('./backend/scripts/df_ocr.json', 'utf8')); } catch(e){}
}

const [startStr, endStr] = process.argv.slice(2);
const start = parseInt(startStr || '1', 10);
const end = parseInt(endStr || '10', 10);

for (let i = start; i <= end; i++) {
  console.log(`==================== Q${i} (Ans: ${JSON.stringify(key[i])}) ====================`);
  console.log('--- PDF TEXT ---');
  console.log(pdfText[i]);
  if (ocr[i]) {
    console.log('--- OCR TEXT ---');
    console.log(ocr[i]);
  }
}

