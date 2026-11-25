import fs from 'fs';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795414122028_f2297f57.pdf';

async function check() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);

  for (const p of [1, 2, 3, 144, 145]) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const str = tc.items.map(i => i.str).join(' ');
    console.log(`Page ${p} (items: ${tc.items.length}):`, str.slice(0, 300));
  }
}
check().catch(console.error);
