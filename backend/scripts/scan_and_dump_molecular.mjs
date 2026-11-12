import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794485035660_b43a6e43.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  const pagesDump = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const items = content.items.map(it => ({
      str: it.str,
      x: Math.round(it.transform[4]),
      y: Math.round(it.transform[5]),
      width: Math.round(it.width),
      height: Math.round(it.height)
    }));
    pagesDump.push({ page: i, items });
  }

  fs.writeFileSync('./backend/scripts/molecular_pages_dump.json', JSON.stringify(pagesDump, null, 2), 'utf8');
  console.log('Saved dump to ./backend/scripts/molecular_pages_dump.json');

  // Extract answer keys from pages 49 and 50
  const p49 = pagesDump.find(p => p.page === 49);
  const p50 = pagesDump.find(p => p.page === 50);

  const text49 = p49 ? p49.items.map(i => i.str).join(' ') : '';
  const text50 = p50 ? p50.items.map(i => i.str).join(' ') : '';
  const fullTextKeys = text49 + ' ' + text50;

  const keys = {};

  // Match Single Correct: e.g. "1. B", "102. A"
  const regexSingle = /(\d+)\.\s*([A-D])(?![,\s]*[A-D])/g;
  let match;
  while ((match = regexSingle.exec(fullTextKeys)) !== null) {
    keys[match[1]] = match[2];
  }

  // Check multi-correct on page 50: e.g. "254. A", "255. C, D"
  const multiRegex = /(\d+)\.\s*([A-D](?:\s*,\s*[A-D])+)/g;
  while ((match = multiRegex.exec(fullTextKeys)) !== null) {
    keys[match[1]] = match[2].replace(/\s+/g, '');
  }

  console.log(`Found ${Object.keys(keys).length} answer keys.`);
  fs.writeFileSync('./backend/scripts/molecular_official_keys.json', JSON.stringify(keys, null, 2), 'utf8');
  console.log('Saved keys to ./backend/scripts/molecular_official_keys.json');
}

main().catch(console.error);
