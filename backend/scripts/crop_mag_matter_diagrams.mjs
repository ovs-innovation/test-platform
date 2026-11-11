import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = 'backend/scripts/mag_matter_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Diagram coordinates [left, top, right, bottom]
const diagramCoords = {
  3: { page: 2, top: 730, bottom: 1100, left: 60, right: 600 },
  5: { page: 3, top: 295, bottom: 665, left: 60, right: 650 },
  8: { page: 4, top: 260, bottom: 1160, left: 60, right: 400 }, // Q8 option plots
  15: { page: 6, top: 265, bottom: 645, left: 60, right: 700 },
  18: { page: 7, top: 260, bottom: 665, left: 60, right: 650 },
  23: { page: 8, top: 480, bottom: 780, left: 60, right: 750 }
};

async function cropDiagrams() {
  for (const [qNumStr, coords] of Object.entries(diagramCoords)) {
    const qNum = parseInt(qNumStr);
    const pagePath = `backend/scripts/mag_matter_pages/page_${coords.page}.png`;
    const outPath = path.join(outDir, `mag_q${qNum}_diagram.png`);

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
