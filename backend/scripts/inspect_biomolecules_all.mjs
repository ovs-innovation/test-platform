import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_ocr.json', 'utf8'));
const textItems = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_text_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_positions.json', 'utf8'));

console.log('Writing inspection summary to biomolecules_raw_inspect.txt...');
let output = '';

for (let q = 1; q <= 81; q++) {
  const pos = positions.find(p => p.qNum === q);
  output += `====================================================\n`;
  output += `QUESTION ${q} (Page ${pos?.pageNum}, Y: ${pos?.y})\n`;
  output += `----------------- PDF TEXT ITEMS -------------------\n`;
  output += (textItems[q] || '').trim() + '\n';
  output += `----------------- OCR RECOGNITION ------------------\n`;
  output += (ocr[q] || '').trim() + '\n\n';
}

fs.writeFileSync('./backend/scripts/biomolecules_raw_inspect.txt', output);
console.log('Saved inspection to backend/scripts/biomolecules_raw_inspect.txt');

