import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794314927151_0fe43097.pdf';

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Extracting text from ${doc.numPages} pages...`);

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    const pageText = tc.items.map(it => it.str).join(' ');
    fullText += `\n\n=== PAGE ${i} ===\n\n` + pageText;
  }

  fs.writeFileSync('backend/scripts/thermo_pdf_text.txt', fullText, 'utf8');
  console.log('Saved backend/scripts/thermo_pdf_text.txt');
}

extract().catch(console.error);

