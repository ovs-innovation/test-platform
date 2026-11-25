import fs from 'fs';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795165081041_b5ef98c4.pdf';

async function extractText() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total pages: ${doc.numPages}`);

  const pageTexts = {};
  let totalChars = 0;

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    pageTexts[i] = text;
    totalChars += text.length;
  }

  console.log(`Total characters extracted: ${totalChars}`);
  fs.writeFileSync('backend/scripts/ionic_pdf_text.json', JSON.stringify(pageTexts, null, 2), 'utf8');

  // Let's sample page 1 text
  console.log('Page 1 sample:', pageTexts[1]?.slice(0, 300));
}

extractText().catch(console.error);
