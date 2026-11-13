import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

for (const p of [5, 10, 24, 25]) {
  console.log(`\n================ PAGE ${p} ================`);
  console.log(pages[p - 1].rawText);
}
