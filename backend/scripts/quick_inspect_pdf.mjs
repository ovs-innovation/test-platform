import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';

async function inspectPDF() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages in PDF:', doc.numPages);

  // Check last 5 pages for Answer Key
  for (let p = Math.max(1, doc.numPages - 4); p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str).join(' ');
    console.log(`\n=== PAGE ${p} TEXT ===`);
    console.log(strings.substring(0, 500));
  }
}

inspectPDF().catch(console.error);
