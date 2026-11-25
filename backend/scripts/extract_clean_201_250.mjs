import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesText = fs.readFileSync(path.resolve(__dirname, 'p3_pages_112_170.txt'), 'utf8');
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Split pages
const pages = pagesText.split(/==================== PAGE (\d+) ====================/);

for (let i = 1; i < pages.length; i += 2) {
  const pNum = parseInt(pages[i], 10);
  if (pNum >= 112 && pNum <= 140) {
    console.log(`\n--- PAGE ${pNum} ---`);
    const pageContent = pages[i + 1];
    // Find all question headers on this page
    const lines = pageContent.split('\n');
    lines.forEach((l, idx) => {
      if (/^\s*\d{2,3}[\.\:\,\-]\s*/.test(l) || /ANSWER\:/i.test(l) || /\bmarks\b/i.test(l)) {
        console.log(`L${idx}: ${l.slice(0, 100)}`);
      }
    });
  }
}
