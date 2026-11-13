import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794376254043_af9d90fa.pdf';

async function extractText() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Loaded PDF with ${doc.numPages} pages.`);

  let fullText = '';
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += `\n--- PAGE ${p} ---\n` + strings.join(' ') + '\n';
  }

  fs.writeFileSync('backend/scripts/dn_pdf_text.txt', fullText);
  console.log('Saved raw text to backend/scripts/dn_pdf_text.txt');
}

extractText().catch(console.error);

