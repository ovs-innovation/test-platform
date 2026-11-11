import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794396924735_015f202a.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  const page16 = await doc.getPage(16);
  const textContent = await page16.getTextContent();
  const strings = textContent.items.map(i => i.str).filter(s => s.trim().length > 0);
  console.log('Page 16 strings:');
  console.log(strings.join(' | '));
}

main().catch(console.error);
