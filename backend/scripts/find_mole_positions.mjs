import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794385913376_b2bcabf2.pdf';

async function findPositions() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let positions = [];

  for (let pageNum = 2; pageNum <= 14; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    for (const item of textContent.items) {
      const match = item.str.match(/^Q(\d+)\./);
      if (match) {
        const qNum = parseInt(match[1]);
        const [,, , , tx, ty] = item.transform;
        // In PDF coords, origin is bottom-left. In canvas (scale 2.0):
        const yTop = viewport.height - (ty * 2.0);
        positions.push({
          qNum,
          page: pageNum,
          yTop: Math.round(yTop),
          xLeft: Math.round(tx * 2.0)
        });
      }
    }
  }

  positions.sort((a, b) => a.qNum - b.qNum);
  console.log(`Found positions for ${positions.length} questions.`);
  fs.writeFileSync('backend/scripts/mole_q_positions.json', JSON.stringify(positions, null, 2), 'utf8');
}

findPositions().catch(console.error);

