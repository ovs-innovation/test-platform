import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794413604532_4c277658.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF Loaded: ${doc.numPages} pages.`);

  // Check last few pages for answer key
  for (let p = doc.numPages - 3; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map(it => it.str).join(' ');
    console.log(`--- Page ${p} ---`);
    console.log(text.slice(0, 300));
  }
}

main();

