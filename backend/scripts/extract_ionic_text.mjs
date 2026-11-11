import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794391262984_3e6c4a17.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const allItems = [];

  for (let pageNum = 2; pageNum <= 17; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();

    for (const item of textContent.items) {
      if (!item.str || !item.str.trim()) continue;
      // Convert pdf coords (origin bottom-left) to image coords (origin top-left)
      const tx = item.transform;
      const x = tx[4] * 2.0;
      const y = viewport.height - (tx[5] * 2.0);
      allItems.push({
        page: pageNum,
        str: item.str,
        x,
        y,
        width: item.width * 2.0,
        height: item.height * 2.0
      });
    }
  }

  fs.writeFileSync('backend/scripts/ionic_pdf_items.json', JSON.stringify(allItems, null, 2));
  console.log(`Saved ${allItems.length} text items to backend/scripts/ionic_pdf_items.json`);
}

main().catch(console.error);
