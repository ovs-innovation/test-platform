import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794494446199_528ce5b4.pdf';

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

  fs.writeFileSync('./backend/scripts/animal_kingdom_pages_dump.json', JSON.stringify(pagesDump, null, 2), 'utf8');
  console.log('Saved dump to ./backend/scripts/animal_kingdom_pages_dump.json');

  // Extract answer keys from pages 44, 45, 46
  const p44 = pagesDump.find(p => p.page === 44);
  const p45 = pagesDump.find(p => p.page === 45);
  const p46 = pagesDump.find(p => p.page === 46);

  const text44 = p44 ? p44.items.map(i => i.str).join(' ') : '';
  const text45 = p45 ? p45.items.map(i => i.str).join(' ') : '';
  const text46 = p46 ? p46.items.map(i => i.str).join(' ') : '';
  const fullTextKeys = text44 + ' ' + text45 + ' ' + text46;

  console.log('Text from p44-p46 sample:', fullTextKeys.slice(0, 300));

  const keys = {};

  // Match: e.g. "1. B", "102. A"
  const regex = /(\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)/g;
  let match;
  while ((match = regex.exec(fullTextKeys)) !== null) {
    keys[match[1]] = match[2].replace(/\s+/g, '');
  }

  console.log(`Found ${Object.keys(keys).length} answer keys.`);
  fs.writeFileSync('./backend/scripts/animal_kingdom_official_keys.json', JSON.stringify(keys, null, 2), 'utf8');
  console.log('Saved keys to ./backend/scripts/animal_kingdom_official_keys.json');

  // Print missing keys between 1 and 202
  const missing = [];
  for (let k = 1; k <= 202; k++) {
    if (!keys[k]) missing.push(k);
  }
  if (missing.length > 0) {
    console.log('Missing keys:', missing);
  } else {
    console.log('All 202 keys present!');
  }
}

main().catch(console.error);

