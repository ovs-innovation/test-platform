import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794464450803_b2764650.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let allLines = [];

  for (let pageNum = 2; pageNum <= 33; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const content = await page.getTextContent();
    
    // Sort items by y (top to bottom: a.y - b.y), then x (left to right: a.x - b.x)
    const items = content.items.map(item => {
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      return {
        str: item.str,
        x: tx[4],
        y: tx[5],
        width: item.width,
        height: item.height
      };
    });

    items.sort((a, b) => a.y - b.y || a.x - b.x);

    let currentLine = [];
    let currentY = null;
    const pageLines = [];

    for (const item of items) {
      if (!item.str.trim()) continue;
      if (currentY === null || Math.abs(item.y - currentY) < 3.5) {
        currentLine.push(item);
        if (currentY === null) currentY = item.y;
      } else {
        currentLine.sort((a, b) => a.x - b.x);
        pageLines.push(currentLine.map(i => i.str).join(' '));
        currentLine = [item];
        currentY = item.y;
      }
    }
    if (currentLine.length > 0) {
      currentLine.sort((a, b) => a.x - b.x);
      pageLines.push(currentLine.map(i => i.str).join(' '));
    }

    allLines.push(`\n=== PAGE ${pageNum} ===`);
    allLines = allLines.concat(pageLines);
  }

  fs.writeFileSync('./backend/scripts/pk_extracted_lines.txt', allLines.join('\n'));
  console.log(`Extracted ${allLines.length} lines from pages 2 to 33 (top-to-bottom order).`);
}

main().catch(console.error);
