import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/organic_ocr.json', 'utf8'));
const items = JSON.parse(fs.readFileSync('./backend/scripts/organic_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/organic_official_key.json', 'utf8'));

for (let q = 1; q <= 10; q++) {
  console.log(`\n================ Q${q} [Official Key: ${key[q]}] ================`);
  console.log(`PDF Text:\n${items[q]}`);
  console.log(`OCR Text:\n${ocr[q]}`);
}

