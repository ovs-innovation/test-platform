import fs from 'fs';
const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));
console.log(pages[21].rawText);

