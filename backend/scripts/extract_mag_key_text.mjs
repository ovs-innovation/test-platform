import fs from 'fs';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795534632334_559e1bbd.pdf';

async function extractKeyPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);

  for (let p of [203, 204]) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(' ');
    console.log(`\n=== PAGE ${p} ===\n`);
    console.log(text);
  }
}

extractKeyPages().catch(console.error);
