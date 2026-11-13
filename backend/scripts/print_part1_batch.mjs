import fs from 'fs';

const start = parseInt(process.argv[2] || '1', 10);
const end = parseInt(process.argv[3] || '35', 10);

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/organic_ocr.json', 'utf8'));
const items = JSON.parse(fs.readFileSync('./backend/scripts/organic_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/organic_official_key.json', 'utf8'));

for (let q = start; q <= end; q++) {
  console.log(`\n================ Q${q} [Official Key: ${key[q]}] ================`);
  console.log(`PDF Text: ${items[q]}`);
  console.log(`OCR Text:\n${ocr[q]}`);
}

