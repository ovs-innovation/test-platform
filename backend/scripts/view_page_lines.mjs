import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/straight_lines_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, ''));

function printPage(p) {
  const page = data[p - 1];
  console.log(`\n================ PAGE ${p} ================`);
  page.lines.forEach((l, idx) => {
    console.log(`${idx}: ${l.Text}`);
  });
}

// Check arguments or default to 85-88
const start = parseInt(process.argv[2] || '85');
const end = parseInt(process.argv[3] || '88');

for (let p = start; p <= end; p++) {
  printPage(p);
}

