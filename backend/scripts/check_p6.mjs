import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

console.log(pages[5].text); // page 6

