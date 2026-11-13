import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794413604532_4c277658.pdf';

async function extractItems() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;

  const allItems = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();

    for (const item of textContent.items) {
      if (!item.str || item.str.trim() === '') continue;
      const tx = item.transform;
      const pdfX = tx[4];
      const pdfY = tx[5];
      const x = pdfX * 2.0;
      const y = (page.view[3] - pdfY) * 2.0;

      allItems.push({
        pageNum,
        str: item.str,
        x,
        y,
        width: item.width * 2.0,
        height: item.height * 2.0
      });
    }
  }

  console.log(`Extracted ${allItems.length} text items across ${doc.numPages} pages.`);
  fs.writeFileSync('./backend/scripts/organic_pdf_items.json', JSON.stringify(allItems, null, 2));
  console.log('Saved to backend/scripts/organic_pdf_items.json');
}

extractItems().catch(err => {
  console.error(err);
  process.exit(1);
});

