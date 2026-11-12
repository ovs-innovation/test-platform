import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794472024943_fa5f34f8.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Loaded PDF with ${doc.numPages} pages.`);

  const pages = [];
  const allLines = [];
  const diagramPages = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    const textContent = await page.getTextContent();

    // Check for images
    const imageNames = [];
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (
        ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
        ops.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject
      ) {
        imageNames.push(ops.argsArray[i][0]);
      }
    }

    const items = textContent.items.map(item => ({
      str: item.str,
      x: Math.round(item.transform[4] * 100) / 100,
      y: Math.round(item.transform[5] * 100) / 100,
      w: Math.round(item.width * 100) / 100,
      h: Math.round(item.height * 100) / 100
    }));

    // If image count > 1 (more than just the QR code)
    if (imageNames.length > 1) {
      diagramPages.push({ page: pageNum, count: imageNames.length, imageNames });
    }

    // Reconstruct lines
    const sortedItems = [...items].sort((a, b) => {
      if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
      return a.x - b.x;
    });

    let currentY = null;
    let currentLine = [];
    for (const item of sortedItems) {
      if (currentY === null || Math.abs(item.y - currentY) > 3) {
        if (currentLine.length > 0) {
          allLines.push({ page: pageNum, text: currentLine.map(i => i.str).join(' ').trim() });
        }
        currentLine = [item];
        currentY = item.y;
      } else {
        currentLine.push(item);
      }
    }
    if (currentLine.length > 0) {
      allLines.push({ page: pageNum, text: currentLine.map(i => i.str).join(' ').trim() });
    }

    pages.push({ page: pageNum, items });
  }

  console.log(`Pages with >1 image:`, diagramPages);
  fs.writeFileSync('./backend/scripts/inheritance_pages_dump.json', JSON.stringify(pages, null, 2));
  fs.writeFileSync('./backend/scripts/inheritance_extracted_lines.txt', allLines.map(l => `[P${l.page}] ${l.text}`).join('\n'));
  console.log(`Dumped ${pages.length} pages and ${allLines.length} lines.`);
}

main().catch(console.error);
