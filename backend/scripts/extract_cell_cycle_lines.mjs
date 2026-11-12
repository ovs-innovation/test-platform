import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794467569071_9fda0808.pdf';

async function extractLines() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  
  const allPages = [];
  let fullTextDump = '';

  for (let p = 2; p <= 24; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

    // Group items into lines by y-coordinate (tolerance ~3)
    const items = content.items.map(it => ({
      str: it.str,
      x: it.transform[4],
      y: it.transform[5],
      w: it.width,
      h: it.height
    }));

    // Sort items top-to-bottom, left-to-right
    items.sort((a, b) => {
      if (Math.abs(b.y - a.y) > 3) {
        return b.y - a.y; // top to bottom
      }
      return a.x - b.x; // left to right
    });

    const lines = [];
    let currentLine = [];
    let currentY = null;

    for (const it of items) {
      if (currentY === null || Math.abs(currentY - it.y) <= 3) {
        currentLine.push(it);
        currentY = it.y;
      } else {
        lines.push({
          y: currentY,
          text: currentLine.map(i => i.str).join(' ').trim()
        });
        currentLine = [it];
        currentY = it.y;
      }
    }
    if (currentLine.length > 0) {
      lines.push({
        y: currentY,
        text: currentLine.map(i => i.str).join(' ').trim()
      });
    }

    allPages.push({ page: p, viewport: { width: viewport.width, height: viewport.height }, lines, rawItems: items });
    fullTextDump += `\n=== PAGE ${p} ===\n` + lines.map(l => l.text).join('\n') + '\n';
  }

  fs.writeFileSync('./backend/scripts/cell_cycle_pages_dump.json', JSON.stringify(allPages, null, 2));
  fs.writeFileSync('./backend/scripts/cell_cycle_extracted_lines.txt', fullTextDump);
  console.log('Successfully dumped pages 2 to 24 into cell_cycle_pages_dump.json and cell_cycle_extracted_lines.txt');
}

extractLines().catch(console.error);
