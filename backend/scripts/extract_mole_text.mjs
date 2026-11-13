import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794385913376_b2bcabf2.pdf';

async function extract() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Number of pages: ${doc.numPages}`);

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += `\n--- PAGE ${i} ---\n` + strings.join(' ');
  }

  fs.writeFileSync('backend/scripts/mole_pdf_text.txt', fullText, 'utf8');
  console.log('Saved full extracted text to backend/scripts/mole_pdf_text.txt');
}

extract().catch(console.error);

