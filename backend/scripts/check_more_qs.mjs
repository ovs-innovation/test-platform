import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_ocr.json', 'utf8'));
const textItems = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_text_items.json', 'utf8'));

const qs = [25, 35, 41, 62, 69, 77];
for (const q of qs) {
  console.log(`================ Q${q} ================`);
  console.log('TEXT ITEMS:', textItems[q]);
  console.log('OCR:\n', ocr[q]);
}

