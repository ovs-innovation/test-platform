import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794454783306_a4a4c58d.pdf';

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  const allItems = [];
  let fullText = '';

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const content = await page.getTextContent();

    fullText += `\n--- PAGE ${pageNum} (w: ${viewport.width}, h: ${viewport.height}) ---\n`;

    for (const item of content.items) {
      if (!item.str) continue;
      const x = Math.round(item.transform[4]);
      const y = Math.round(viewport.height - item.transform[5]);
      allItems.push({
        page: pageNum,
        text: item.str,
        x,
        y,
        w: Math.round(item.width),
        h: Math.round(item.height)
      });
      fullText += `[P${pageNum} X:${x} Y:${y}] ${item.str}\n`;
    }
  }

  fs.writeFileSync('./backend/scripts/nitrogen_pdf_items.json', JSON.stringify(allItems, null, 2));
  fs.writeFileSync('./backend/scripts/nitrogen_pdf_text.txt', fullText);
  console.log('Saved nitrogen_pdf_items.json and nitrogen_pdf_text.txt');
}

extract().catch(console.error);

