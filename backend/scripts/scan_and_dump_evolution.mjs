import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794552527555_ed3d3462.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Loaded PDF with ${doc.numPages} pages`);

  const pagesDump = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    
    // Sort items by vertical position top-to-bottom, then left-to-right
    // In PDF coordinates, y=0 is at bottom, so larger y is higher up
    const items = textContent.items.map(item => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      w: item.width,
      h: item.height
    }));

    // Group items into lines
    items.sort((a, b) => {
      const yDiff = b.y - a.y;
      if (Math.abs(yDiff) > 4) {
        return yDiff;
      }
      return a.x - b.x;
    });

    const lines = [];
    let currentLine = [];
    let currentY = null;

    for (const item of items) {
      if (!item.str.trim()) continue;
      if (currentY === null || Math.abs(item.y - currentY) <= 4) {
        currentLine.push(item);
        if (currentY === null) currentY = item.y;
      } else {
        currentLine.sort((a, b) => a.x - b.x);
        lines.push(currentLine.map(it => it.str).join('   '));
        currentLine = [item];
        currentY = item.y;
      }
    }
    if (currentLine.length > 0) {
      currentLine.sort((a, b) => a.x - b.x);
      lines.push(currentLine.map(it => it.str).join('   '));
    }

    pagesDump.push({
      page: i,
      rawText: items.map(it => it.str).join(' '),
      lines: lines
    });
  }

  const outFile = path.resolve(__dirname, 'evolution_pages_dump.json');
  fs.writeFileSync(outFile, JSON.stringify(pagesDump, null, 2));
  console.log(`Saved dump of ${pagesDump.length} pages to ${outFile}`);
}

main().catch(console.error);

