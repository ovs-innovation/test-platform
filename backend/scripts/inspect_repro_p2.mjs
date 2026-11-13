import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/repro_pages_dump.json', 'utf8'));

console.log('--- PAGE 2 LINES ---');
pages[1].lines.forEach((l, idx) => console.log(`${idx}: ${l}`));
