import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const positions = JSON.parse(fs.readFileSync('backend/scripts/capacitor_q_positions.json', 'utf8'));
const outDir = 'backend/scripts/capacitor_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Diagram y-ranges based on text positions (with some padding)
// Page dimensions are width ~1189, height ~1682
const diagramCoords = {
  1: { page: 2, top: 380, bottom: 740, left: 60, right: 650 },
  2: { page: 2, top: 935, bottom: 1290, left: 60, right: 600 },
  7: { page: 3, top: 1045, bottom: 1400, left: 60, right: 600 },
  8: { page: 4, top: 235, bottom: 450, left: 60, right: 750 },
  10: { page: 4, top: 975, bottom: 1335, left: 60, right: 750 },
  12: { page: 5, top: 440, bottom: 755, left: 60, right: 750 },
  15: { page: 6, top: 295, bottom: 610, left: 60, right: 750 },
  17: { page: 6, top: 1015, bottom: 1335, left: 60, right: 750 },
  18: { page: 7, top: 290, bottom: 720, left: 60, right: 600 },
  20: { page: 8, top: 290, bottom: 685, left: 60, right: 700 },
  24: { page: 9, top: 325, bottom: 690, left: 60, right: 650 },
  25: { page: 9, top: 995, bottom: 1260, left: 60, right: 700 },
  28: { page: 11, top: 295, bottom: 605, left: 60, right: 600 },
  35: { page: 13, top: 260, bottom: 580, left: 60, right: 750 },
  37: { page: 13, top: 975, bottom: 1365, left: 60, right: 600 },
  43: { page: 15, top: 235, bottom: 510, left: 60, right: 750 },
  46: { page: 15, top: 1030, bottom: 1305, left: 60, right: 750 }
};

async function cropDiagrams() {
  for (const [qNumStr, coords] of Object.entries(diagramCoords)) {
    const qNum = parseInt(qNumStr);
    const pagePath = `backend/scripts/capacitor_pages/page_${coords.page}.png`;
    const outPath = path.join(outDir, `cap_q${qNum}_diagram.png`);

    const width = coords.right - coords.left;
    const height = coords.bottom - coords.top;

    // First do rough crop
    const tempBuffer = await sharp(pagePath)
      .extract({ left: coords.left, top: coords.top, width, height })
      .toBuffer();

    // Now auto-trim whitespace from edges with small threshold
    // sharp trim can trim whitespace
    const trimmed = await sharp(tempBuffer)
      .trim({ background: '#ffffff', threshold: 10 })
      .toBuffer();

    // Add 15px white padding
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

