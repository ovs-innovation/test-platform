import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'fluids_pages');
const outDir = path.resolve(__dirname, 'fluids_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Page dimensions: 918 x 1188
// Search regions [minX, minY, maxX, maxY] containing the diagram
const TARGET_REGIONS = [
  // Q6: Jar with 2 liquids on Page 2 (top right)
  { qNum: 6, page: 2, search: [480, 160, 800, 430] },

  // Q7: Capillary tubes on Page 3 (options A, B, C, D across the top)
  { qNum: 7, page: 3, search: [50, 40, 880, 420] },

  // Q9: Ball in oil/water on Page 4 (options A, B, C, D at top)
  { qNum: 9, page: 4, search: [50, 40, 880, 360] },

  // Q12: U-shaped wire with slider on Page 5 (top right)
  { qNum: 12, page: 5, search: [450, 30, 820, 260] },

  // Q13: Water tank with 2 holes on Page 5 (lower right)
  { qNum: 13, page: 5, search: [450, 520, 860, 780] },

  // Q34: Manometer tube on Page 16 (middle-top)
  { qNum: 34, page: 16, search: [60, 30, 850, 350] },

  // Q37: Two glass plates on Page 18 (top right)
  { qNum: 37, page: 18, search: [450, 30, 850, 300] },

  // Q39: Water jar on Page 20 (top right)
  { qNum: 39, page: 20, search: [450, 30, 850, 300] },

  // Q61: Wall with 2 liquids on Page 31 (top right)
  { qNum: 61, page: 31, search: [450, 30, 850, 280] },

  // Q62: Horizontal tube with manometers on Page 31 (bottom right)
  { qNum: 62, page: 31, search: [450, 520, 870, 780] },

  // Q64: Rotating cylinder on Page 33 (top right)
  { qNum: 64, page: 33, search: [450, 30, 860, 300] },

  // Q78: Water tank with orifice on Page 39 (lower right)
  { qNum: 78, page: 39, search: [440, 500, 880, 780] },

  // Q81: Cylindrical vessel on Page 40 (bottom right)
  { qNum: 81, page: 40, search: [440, 550, 880, 850] },

  // Q89: Bent tapering pipe on Page 43 (middle right)
  { qNum: 89, page: 43, search: [440, 350, 880, 650] },

  // Q110: Metal block on liquid film on Page 54 (middle right)
  { qNum: 110, page: 54, search: [440, 550, 880, 820] },

  // Q121: Liquid pushed by piston on Page 58 (middle)
  { qNum: 121, page: 58, search: [60, 60, 860, 380] },

  // Q125: Tube with manometers on Page 60 (top)
  { qNum: 125, page: 60, search: [60, 40, 860, 350] },

  // Q138: Fluid pressure / velocity on Page 65 (middle)
  { qNum: 138, page: 65, search: [60, 60, 860, 400] },

  // Q156: Tapering pipe point 1 to 2 on Page 71 (top)
  { qNum: 156, page: 71, search: [60, 40, 860, 380] },

  // Q175: Horizontal tube with columns on Page 80 (top)
  { qNum: 175, page: 80, search: [60, 40, 860, 350] },
];

async function cropAccurately(item) {
  const pageFile = path.join(pagesDir, `page_${String(item.page).padStart(3, '0')}.png`);
  if (!fs.existsSync(pageFile)) {
    console.error(`Page ${item.page} does not exist!`);
    return;
  }

  const [minX, minY, maxX, maxY] = item.search;
  const region = {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY
  };

  const { data, info } = await sharp(pageFile)
    .extract(region)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Scan for non-white pixels (< 235 brightness in RGB)
  let bMinX = info.width, bMaxX = 0, bMinY = info.height, bMaxY = 0;
  let count = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 235 || g < 235 || b < 235) {
        count++;
        if (x < bMinX) bMinX = x;
        if (x > bMaxX) bMaxX = x;
        if (y < bMinY) bMinY = y;
        if (y > bMaxY) bMaxY = y;
      }
    }
  }

  if (count === 0) {
    console.warn(`No non-white pixels found for Q${item.qNum} on page ${item.page}!`);
    return;
  }

  const pad = 12;
  const cropLeft = Math.max(0, minX + bMinX - pad);
  const cropTop = Math.max(0, minY + bMinY - pad);
  const cropWidth = Math.min(918 - cropLeft, (bMaxX - bMinX + 1) + 2 * pad);
  const cropHeight = Math.min(1188 - cropTop, (bMaxY - bMinY + 1) + 2 * pad);

  const outFile = path.join(outDir, `q${item.qNum}_diagram.png`);
  await sharp(pageFile)
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: cropHeight
    })
    .png()
    .toFile(outFile);

  console.log(`Cropped Q${item.qNum} (Page ${item.page}): ${cropWidth}x${cropHeight} -> ${outFile}`);
}

async function main() {
  for (const item of TARGET_REGIONS) {
    await cropAccurately(item);
  }
  console.log('All 20 diagrams cropped!');
}

main().catch(console.error);
