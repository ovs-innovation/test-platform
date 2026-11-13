import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794393936511_91fc9ef0.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const page = await doc.getPage(18);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map(i => ({ str: i.str, x: i.transform[4], y: i.transform[5] }));
  const q83Items = strings.filter(s => s.y >= 380 && s.y <= 470);
  console.log(q83Items);
}

main().catch(console.error);
