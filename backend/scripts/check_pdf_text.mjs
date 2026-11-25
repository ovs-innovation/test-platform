import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

async function main() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';
  const buf = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  console.log('Pages:', doc.numPages);
  let totalTextChars = 0;
  for (let i = 1; i <= Math.min(10, doc.numPages); i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    const text = tc.items.map(it => it.str).join(' ');
    totalTextChars += text.trim().length;
    console.log('Page ' + i + ' text length: ' + text.trim().length);
    if (text.trim().length > 0) {
      console.log('Page ' + i + ' sample: ' + text.slice(0, 150));
    }
  }
  console.log('Total text chars across first 10 pages:', totalTextChars);
}

main().catch(console.error);
