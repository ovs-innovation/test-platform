import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794312292089_4a659763.pdf';

export async function getPageItems(pageNum) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const tc = await page.getTextContent();
  return tc.items;
}

async function run() {
  const startPage = parseInt(process.argv[2] || '12', 10);
  const endPage = parseInt(process.argv[3] || startPage, 10);

  for (let p = startPage; p <= endPage; p++) {
    console.log(`\n=================== PAGE ${p} ===================`);
    const items = await getPageItems(p);
    // Sort items top-to-bottom (descending y), then left-to-right (ascending x)
    items.sort((a, b) => {
      const yDiff = Math.round(b.transform[5]) - Math.round(a.transform[5]);
      if (Math.abs(yDiff) > 3) return yDiff;
      return Math.round(a.transform[4]) - Math.round(b.transform[4]);
    });

    let currentY = null;
    let line = '';
    for (const it of items) {
      const y = Math.round(it.transform[5]);
      if (currentY === null || Math.abs(currentY - y) > 3) {
        if (line) console.log(line);
        currentY = y;
        line = `[y=${y}] ` + it.str;
      } else {
        line += ' ' + it.str;
      }
    }
    if (line) console.log(line);
  }
}

if (process.argv[1].endsWith('inspect_oscillations_pdf.mjs')) {
  run().catch(console.error);
}

