import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

let out = '';
for (let p = 85; p <= 118; p++) {
  out += `\n==================== PAGE ${p} ====================\n`;
  out += data[p - 1].text;
  out += '\n';
}

fs.writeFileSync('backend/scripts/pages_85_118_text.txt', out, 'utf8');
console.log('Saved backend/scripts/pages_85_118_text.txt, length:', out.length);

