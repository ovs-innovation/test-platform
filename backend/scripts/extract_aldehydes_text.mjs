import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794456819268_7513c93f.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/' }).promise;

  console.log(`Total Pages: ${doc.numPages}`);

  const allItems = [];
  let fullText = '';

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

    const pageItems = content.items.map(item => ({
      pageNum,
      str: item.str,
      x: item.transform[4],
      y: viewport.height - item.transform[5],
      width: item.width,
      height: item.height,
      fontName: item.fontName
    }));

    allItems.push(...pageItems);

    const pageStrings = content.items.map(i => i.str).join(' ');
    fullText += `\n--- PAGE ${pageNum} ---\n` + pageStrings + '\n';
  }

  fs.writeFileSync('./backend/scripts/aldehydes_pdf_items.json', JSON.stringify(allItems, null, 2));
  fs.writeFileSync('./backend/scripts/aldehydes_pdf_text.txt', fullText);
  console.log(`Extracted ${allItems.length} text items.`);
}

main().catch(console.error);

