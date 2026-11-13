import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794470772376_d8bf79c5.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const allLines = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const items = textContent.items;

    // Sort items top-to-bottom, left-to-right
    items.sort((a, b) => {
      if (Math.abs(b.transform[5] - a.transform[5]) > 3) {
        return b.transform[5] - a.transform[5];
      }
      return a.transform[4] - b.transform[4];
    });

    let currentY = null;
    let currentLine = [];
    for (const item of items) {
      if (currentY === null || Math.abs(item.transform[5] - currentY) > 3) {
        if (currentLine.length > 0) {
          allLines.push({ page: pageNum, text: currentLine.map(i => i.str).join(' ').trim() });
        }
        currentLine = [item];
        currentY = item.transform[5];
      } else {
        currentLine.push(item);
      }
    }
    if (currentLine.length > 0) {
      allLines.push({ page: pageNum, text: currentLine.map(i => i.str).join(' ').trim() });
    }
  }

  fs.writeFileSync('./backend/scripts/plant_growth_extracted_lines.txt', allLines.map(l => `[P${l.page}] ${l.text}`).join('\n'));
  console.log(`Saved ${allLines.length} lines to backend/scripts/plant_growth_extracted_lines.txt`);

  // Check for diagram/figure mentions
  const diagMentions = allLines.filter(l => /figure|diagram|curve|chart|graph|representation|structure/i.test(l.text));
  console.log('Lines mentioning diagram/figure/curve:', diagMentions);
}

main().catch(console.error);

