import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794467569071_9fda0808.pdf';

async function extractKey() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(25);
  const content = await page.getTextContent();
  const text = content.items.map(it => it.str).join(' ');
  console.log('Full Page 25 text:');
  console.log(text);

  const keys = {};
  const regex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    keys[parseInt(match[1], 10)] = match[2];
  }

  console.log(`Extracted ${Object.keys(keys).length} keys:`);
  console.log(keys);

  fs.writeFileSync('./backend/scripts/cell_cycle_official_keys.json', JSON.stringify(keys, null, 2));
}

extractKey().catch(console.error);
