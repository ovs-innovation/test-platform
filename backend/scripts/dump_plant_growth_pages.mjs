import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794470772376_d8bf79c5.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const pages = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const items = textContent.items.map(item => ({
      str: item.str,
      x: Math.round(item.transform[4] * 100) / 100,
      y: Math.round(item.transform[5] * 100) / 100,
      w: Math.round(item.width * 100) / 100,
      h: Math.round(item.height * 100) / 100
    }));

    pages.push({
      page: pageNum,
      items
    });
  }

  fs.writeFileSync('./backend/scripts/plant_growth_pages_dump.json', JSON.stringify(pages, null, 2));
  console.log(`Dumped ${pages.length} pages to backend/scripts/plant_growth_pages_dump.json`);
}

main().catch(console.error);

