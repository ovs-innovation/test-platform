import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794468143327_57e3c8ba.pdf';

async function extractKeyAndPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  // 1. Extract keys from Page 16
  const keyPage = await doc.getPage(16);
  const keyContent = await keyPage.getTextContent();
  const keyText = keyContent.items.map(it => it.str).join(' ');
  console.log('Page 16 Text:\n', keyText);

  const keys = {};
  const regex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = regex.exec(keyText)) !== null) {
    keys[parseInt(match[1], 10)] = match[2];
  }
  console.log(`Extracted ${Object.keys(keys).length} keys:`);
  console.log(keys);
  fs.writeFileSync('./backend/scripts/respiration_official_keys.json', JSON.stringify(keys, null, 2));

  // 2. Extract lines from Pages 2 to 15
  const allPages = [];
  let fullTextDump = '';

  for (let p = 2; p <= 15; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

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
        return b.y - a.y;
      }
      return a.x - b.x;
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

  fs.writeFileSync('./backend/scripts/respiration_pages_dump.json', JSON.stringify(allPages, null, 2));
  fs.writeFileSync('./backend/scripts/respiration_extracted_lines.txt', fullTextDump);
  console.log('Saved respiration_pages_dump.json and respiration_extracted_lines.txt');
}

extractKeyAndPages().catch(console.error);

