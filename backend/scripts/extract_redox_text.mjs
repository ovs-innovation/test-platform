import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794388964729_94ea8611.pdf';

async function extractText() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const pagesData = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

    const items = textContent.items.map(item => ({
      str: item.str,
      x: Math.round(item.transform[4]),
      y: Math.round(viewport.height - item.transform[5]), // Top-down y
      width: Math.round(item.width),
      height: Math.round(item.height)
    }));

    // Group items into lines
    items.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 3) return a.y - b.y;
      return a.x - b.x;
    });

    pagesData.push({ pageNum, items });
  }

  fs.writeFileSync('backend/scripts/redox_pdf_items.json', JSON.stringify(pagesData, null, 2));
  console.log('Saved redox_pdf_items.json');
}

extractText().catch(console.error);

