import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794548038310_babd284c.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  // Let's find which page has Q20
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const str = content.items.map(i => i.str).join(' ');
    if (str.includes('Q20.')) {
      console.log(`Q20 is on page ${p}`);
      for (const it of content.items) {
        if (it.str.trim()) {
          console.log(`x=${it.transform[4].toFixed(1)}, y=${it.transform[5].toFixed(1)}: "${it.str}"`);
        }
      }
    }
  }
}

main().catch(console.error);
