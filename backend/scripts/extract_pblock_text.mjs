import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403811238_c2ef5fdf.pdf';

async function extractItems() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;

  const allItems = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    for (const item of textContent.items) {
      if (!item.str || item.str.trim() === '') continue;
      // In PDF coordinate system, (0,0) is bottom-left. We convert y to top-down at scale 2.0.
      const tx = item.transform; // [scaleX, skewY, skewX, scaleY, tx, ty]
      const pdfX = tx[4];
      const pdfY = tx[5];
      // Convert to canvas scale 2.0 coordinates:
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
  fs.writeFileSync('./backend/scripts/pblock_pdf_items.json', JSON.stringify(allItems, null, 2));
  console.log('Saved to backend/scripts/pblock_pdf_items.json');
}

extractItems().catch(err => {
  console.error(err);
  process.exit(1);
});

