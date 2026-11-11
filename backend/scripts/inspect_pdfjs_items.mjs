import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794385913376_b2bcabf2.pdf';

async function check() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(2);
  const content = await page.getTextContent();
  for (let i = 40; i <= 95; i++) {
    const item = content.items[i];
    console.log(i, JSON.stringify(item?.str), item?.fontName);
  }
}
check().catch(console.error);
