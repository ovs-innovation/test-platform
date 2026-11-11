import fs from 'fs';

const start = parseInt(process.argv[2] || '1', 10);
const end = parseInt(process.argv[3] || '35', 10);

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/pblock_ocr.json', 'utf8'));
const pdf = JSON.parse(fs.readFileSync('./backend/scripts/pblock_q_text_items.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('./backend/scripts/pblock_official_key.json', 'utf8'));

for (let q = start; q <= end; q++) {
  console.log(`\n================ Q${q} [Ans: ${key[q]}] ================`);
  console.log('PDF TEXT:\n', pdf[q]);
  console.log('\nOCR TEXT:\n', ocr[q]);
}

