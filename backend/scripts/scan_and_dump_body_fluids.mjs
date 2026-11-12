import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794496404408_24e468bc.pdf';

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

  fs.writeFileSync('./backend/scripts/body_fluids_pages_dump.json', JSON.stringify(pagesDump, null, 2), 'utf8');
  console.log('Saved dump to ./backend/scripts/body_fluids_pages_dump.json');

  // Extract answer keys from page 26
  const p26 = pagesDump.find(p => p.page === 26);
  const text26 = p26 ? p26.items.map(i => i.str).join(' ') : '';
  console.log('Text from p26 sample:', text26.slice(0, 300));

  const keys = {};

  // Match: e.g. "1. A", "112. C"
  const regex = /(\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)/g;
  let match;
  while ((match = regex.exec(text26)) !== null) {
    keys[match[1]] = match[2].replace(/\s+/g, '');
  }

  console.log(`Found ${Object.keys(keys).length} answer keys.`);
  fs.writeFileSync('./backend/scripts/body_fluids_official_keys.json', JSON.stringify(keys, null, 2), 'utf8');
  console.log('Saved keys to ./backend/scripts/body_fluids_official_keys.json');

  // Print missing keys between 1 and 112
  const missing = [];
  for (let k = 1; k <= 112; k++) {
    if (!keys[k]) missing.push(k);
  }
  if (missing.length > 0) {
    console.log('Missing keys:', missing);
  } else {
    console.log('All 112 keys present!');
  }
}

main().catch(console.error);
