import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794464450803_b2764650.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const page = await doc.getPage(3);
  const content = await page.getTextContent();
  content.items.filter(it => it.transform[5] > 250 && it.transform[5] < 300).forEach(it => {
    console.log(`[${Math.round(it.transform[4])}, ${Math.round(it.transform[5])}] "${it.str}"`);
  });
}

main().catch(console.error);

