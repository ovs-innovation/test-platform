import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function test() {
  const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795416679950_32045922.pdf';
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(3);
  const content = await page.getTextContent();
  console.log('Items on page 3:', content.items.length);
  const text = content.items.map(it => it.str).join(' ');
  console.log('Page 3 text preview:');
  console.log(text.substring(0, 500));
}

test().catch(console.error);
