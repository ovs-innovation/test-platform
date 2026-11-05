import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

const startQ = parseInt(process.argv[2] || '151');
const endQ = parseInt(process.argv[3] || '160');

// Map page numbers roughly: 85 to 118
for (let p = 85; p <= 118; p++) {
  const page = data[p - 1];
  console.log(`\n================ PAGE ${p} ================`);
  console.log(page.text);
}

