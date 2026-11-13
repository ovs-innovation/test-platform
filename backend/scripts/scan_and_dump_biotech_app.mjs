import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794556325199_cba0886b.pdf';

async function main() {
  console.log('Loading PDF:', PDF_PATH);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  const pagesData = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });

    const items = textContent.items.map(item => ({
      str: item.str,
      x: Math.round(item.transform[4]),
      y: Math.round(item.transform[5]),
      width: Math.round(item.width),
      height: Math.round(item.height)
    }));

    // Sort items top-to-bottom (y descending in pdfjs), then left-to-right (x ascending)
    // Using a line tolerance
    items.sort((a, b) => {
      const yDiff = b.y - a.y;
      if (Math.abs(yDiff) > 4) {
        return yDiff;
      }
      return a.x - b.x;
    });

    pagesData.push({
      page: pageNum,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height),
      items
    });
  }

  const dumpPath = path.resolve('backend/scripts/biotech_app_pages_dump.json');
  fs.writeFileSync(dumpPath, JSON.stringify(pagesData, null, 2), 'utf-8');
  console.log(`Saved pages dump to ${dumpPath}`);
}

main().catch(console.error);
