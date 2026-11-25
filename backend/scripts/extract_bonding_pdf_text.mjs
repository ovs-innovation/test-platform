import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795171694158_dbdb3f14.pdf';
const outFile = path.resolve(__dirname, 'bonding_pdf_pages_99_121_text.txt');

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages in PDF:', doc.numPages);
  let fullText = '';
  for (let i = 99; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const items = content.items.map(it => ({
      str: it.str,
      x: it.transform[4],
      y: it.transform[5]
    }));
    items.sort((a,b) => Math.abs(b.y - a.y) > 4 ? b.y - a.y : a.x - b.x);
    let pageStr = '';
    let lastY = null;
    for (const it of items) {
      if (lastY !== null && Math.abs(lastY - it.y) > 4) {
        pageStr += '\n';
      } else if (pageStr.length > 0 && !pageStr.endsWith('\n') && !pageStr.endsWith(' ')) {
        pageStr += ' ';
      }
      pageStr += it.str;
      lastY = it.y;
    }
    fullText += `=== PAGE ${i} ===\n${pageStr}\n\n`;
  }
  fs.writeFileSync(outFile, fullText, 'utf8');
  console.log(`Successfully wrote ${fullText.length} chars to ${outFile}`);
}

extract().catch(console.error);
