import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794310275209_120f888f.pdf';

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    const pageText = `\n\n=== PAGE ${i} ===\n\n` + strings.join(' ');
    fullText += pageText;
  }

  fs.writeFileSync('backend/scripts/pom_pdf_text.txt', fullText, 'utf8');
  console.log('Saved extracted text to backend/scripts/pom_pdf_text.txt');
}

extract().catch(console.error);

