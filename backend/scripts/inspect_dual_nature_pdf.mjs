import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795498332786_e0d22a96.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  // Inspect page 1
  const page1 = await doc.getPage(1);
  const textContent1 = await page1.getTextContent();
  const page1Text = textContent1.items.map(item => item.str).join(' ');
  console.log('Page 1 snippet:\n', page1Text.slice(0, 500));

  // Inspect last page
  const lastPage = await doc.getPage(doc.numPages);
  const lastTextContent = await lastPage.getTextContent();
  const lastPageText = lastTextContent.items.map(item => item.str).join('\n');
  console.log('\nLast Page text:\n', lastPageText);

  // If last page doesn't have answer key, check second to last
  if (!/answer\s*key/i.test(lastPageText) && doc.numPages > 1) {
    const prevPage = await doc.getPage(doc.numPages - 1);
    const prevTextContent = await prevPage.getTextContent();
    const prevText = prevTextContent.items.map(item => item.str).join('\n');
    console.log('\nPage ' + (doc.numPages - 1) + ' snippet:\n', prevText.slice(0, 500));
  }
}

main().catch(console.error);
