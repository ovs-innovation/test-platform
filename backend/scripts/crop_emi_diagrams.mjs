import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = 'backend/scripts/emi_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Diagram coordinates [left, top, right, bottom] on the 2x rendered page
const diagramCoords = {
  2: { page: 2, top: 620, bottom: 995, left: 60, right: 600 },
  3: { page: 3, top: 320, bottom: 1220, left: 60, right: 400 }, // option graphs for Q3
  5: { page: 4, top: 270, bottom: 380, left: 60, right: 750 },
  7: { page: 4, top: 710, bottom: 955, left: 60, right: 750 },
  21: { page: 7, top: 295, bottom: 625, left: 60, right: 750 },
  23: { page: 8, top: 260, bottom: 545, left: 60, right: 750 },
  24: { page: 8, top: 855, bottom: 1255, left: 60, right: 700 },
  25: { page: 9, top: 260, bottom: 680, left: 60, right: 700 },
  28: { page: 10, top: 265, bottom: 655, left: 60, right: 550 },
  30: { page: 11, top: 245, bottom: 615, left: 60, right: 650 },
  31: { page: 13, top: 260, bottom: 655, left: 60, right: 650 },
  38: { page: 15, top: 650, bottom: 1045, left: 60, right: 600 },
  44: { page: 17, top: 260, bottom: 625, left: 60, right: 650 }
};

async function cropDiagrams() {
  for (const [qNumStr, coords] of Object.entries(diagramCoords)) {
    const qNum = parseInt(qNumStr);
    const pagePath = `backend/scripts/emi_pages/page_${coords.page}.png`;
    const outPath = path.join(outDir, `emi_q${qNum}_diagram.png`);

    const width = coords.right - coords.left;
    const height = coords.bottom - coords.top;

    const tempBuffer = await sharp(pagePath)
      .extract({ left: coords.left, top: coords.top, width, height })
      .toBuffer();

    const trimmed = await sharp(tempBuffer)
      .trim({ background: '#ffffff', threshold: 10 })
      .toBuffer();

    await sharp(trimmed)
      .extend({
        top: 15,
        bottom: 15,
        left: 15,
        right: 15,
        background: '#ffffff'
      })
      .toFile(outPath);

    const meta = await sharp(outPath).metadata();
    console.log(`Cropped diagram for Q${qNum}: ${meta.width}x${meta.height} -> ${outPath}`);
  }
}

cropDiagrams().catch(console.error);

