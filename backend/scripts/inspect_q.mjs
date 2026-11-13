import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/organic_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/organic_official_key.json', 'utf8'));
const qItems = JSON.parse(fs.readFileSync('backend/scripts/organic_q_text_items.json', 'utf8'));

const startQ = parseInt(process.argv[2] || '1', 10);
const endQ = parseInt(process.argv[3] || '10', 10);

for (let i = startQ; i <= endQ; i++) {
  console.log('====================================================');
  console.log('Q' + i + ' (Official Key: ' + key[i] + ')');
  console.log('--- Extracted Text ---');
  console.log(qItems[i]);
  console.log('--- OCR Text ---');
  console.log(ocr[i]);
}
