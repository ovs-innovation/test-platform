import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/semi_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/semi_official_key.json', 'utf8'));
const diags = JSON.parse(fs.readFileSync('backend/scripts/semi_diagram_urls.json', 'utf8'));

const [startStr, endStr] = process.argv.slice(2);
const start = parseInt(startStr || '1');
const end = parseInt(endStr || '10');

for (let i = start; i <= end; i++) {
  console.log(`==================== Q${i} (Key: ${key[i]}) ====================`);
  console.log(`Diagram: ${diags[`semi_q${i}_diagram`] || 'none'}`);
  console.log(ocr[`Q${i}`] || '[No OCR]');
}

