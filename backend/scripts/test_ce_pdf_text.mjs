import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';

async function checkPDF() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);
  let hasText = 0;
  for (let i = 1; i <= Math.min(10, doc.numPages); i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const str = content.items.map(it => it.str).join(' ').trim();
    console.log(`Page ${i} text length: ${str.length}`);
    if (str.length > 50) {
      console.log(`Sample: ${str.substring(0, 150)}`);
      hasText++;
    }
  }
  console.log(`Pages with text: ${hasText} / 10`);
}

checkPDF().catch(console.error);
