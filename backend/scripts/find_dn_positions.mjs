import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794376254043_af9d90fa.pdf';

async function findPositions() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let positions = [];

  for (let pageNum = 2; pageNum <= 30; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    for (const item of textContent.items) {
      const match = item.str.match(/^Q(\d+)\./);
      if (match) {
        const qNum = parseInt(match[1]);
        const [,, , , tx, ty] = item.transform;
        const [x, y] = viewport.convertToViewportPoint(tx, ty);
        positions.push({
          qNum,
          page: pageNum,
          rawY: y,
          str: item.str
        });
      }
    }
  }

  positions.sort((a, b) => a.qNum - b.qNum);
  console.log(`Found ${positions.length} question positions.`);
  fs.writeFileSync('backend/scripts/dn_q_positions.json', JSON.stringify(positions, null, 2));
}

findPositions().catch(console.error);

