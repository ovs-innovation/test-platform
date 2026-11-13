import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794548038310_babd284c.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF Loaded. Total pages: ${doc.numPages}`);

  const pagesDump = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const items = content.items.map(it => ({
      str: it.str,
      x: it.transform[4],
      y: it.transform[5],
      hasEOL: it.hasEOL
    }));

    // Group items into lines by y-coordinate
    const lines = [];
    let currentY = null;
    let currentLine = [];
    
    // Sort items top-to-bottom, left-to-right
    items.sort((a, b) => b.y - a.y || a.x - b.x);

    for (const item of items) {
      if (currentY === null || Math.abs(item.y - currentY) > 3) {
        if (currentLine.length > 0) {
          lines.push(currentLine.map(t => t.str).join(' ').trim());
        }
        currentLine = [item];
        currentY = item.y;
      } else {
        currentLine.push(item);
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine.map(t => t.str).join(' ').trim());
    }

    pagesDump.push({
      page: i,
      rawText: lines.join('\n'),
      lines: lines
    });
  }

  fs.writeFileSync('backend/scripts/biotech_pages_dump.json', JSON.stringify(pagesDump, null, 2));
  console.log('Dumped all pages to backend/scripts/biotech_pages_dump.json');

  // Let's print out pages 33, 34, 35, 36 to see the Answer Key
  for (let p = Math.max(1, doc.numPages - 3); p <= doc.numPages; p++) {
    console.log(`\n--- PAGE ${p} ---`);
    console.log(pagesDump[p - 1].rawText);
  }
}

main().catch(console.error);
