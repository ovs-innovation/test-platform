import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'basic_chem_pages');
const outDir = path.resolve(__dirname, 'basic_chem_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAndTrim(pageFile, searchRegion, outFilename) {
  const [minX, minY, maxX, maxY] = searchRegion;
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

  // Scan bounding box of non-white pixels (< 240 brightness)
  let bMinX = info.width, bMaxX = 0, bMinY = info.height, bMaxY = 0;
  let count = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 235 || g < 235 || b < 235) {
        if (x < bMinX) bMinX = x;
        if (x > bMaxX) bMaxX = x;
        if (y < bMinY) bMinY = y;
        if (y > bMaxY) bMaxY = y;
        count++;
      }
    }
  }

  if (count < 20) {
    console.warn(`[WARN] Very few dark pixels for ${outFilename}`);
    return;
  }

  const pad = 12;
  const cLeft = Math.max(0, bMinX - pad);
  const cTop = Math.max(0, bMinY - pad);
  const cWidth = Math.min(info.width - cLeft, (bMaxX - bMinX) + pad * 2);
  const cHeight = Math.min(info.height - cTop, (bMaxY - bMinY) + pad * 2);

  const finalBuf = await sharp(pageFile)
    .extract({
      left: minX + cLeft,
      top: minY + cTop,
      width: cWidth,
      height: cHeight
    })
    .png()
    .toBuffer();

  const outPath = path.resolve(outDir, outFilename);
  fs.writeFileSync(outPath, finalBuf);
  console.log(`Saved ${outFilename}: ${cWidth}x${cHeight} (${count} pixels)`);
}

async function main() {
  console.log('=== CROPPING BASIC CHEM DIAGRAMS ===');

  // Page 31 Q88 stem
  await cropAndTrim(
    path.join(pagesDir, 'page_031.png'),
    [240, 480, 520, 620],
    'q88_diagram.png'
  );

  // Page 31 Q88 sol
  await cropAndTrim(
    path.join(pagesDir, 'page_031.png'),
    [240, 680, 560, 800],
    'q88_sol_diagram.png'
  );

  // Page 33 Q93 stem
  await cropAndTrim(
    path.join(pagesDir, 'page_033.png'),
    [240, 80, 850, 220],
    'q93_diagram.png'
  );

  // Page 44 Q127 stem
  await cropAndTrim(
    path.join(pagesDir, 'page_044.png'),
    [240, 80, 850, 240],
    'q127_diagram.png'
  );

  // Page 28 Q79 sol
  await cropAndTrim(
    path.join(pagesDir, 'page_028.png'),
    [240, 500, 850, 660],
    'q79_sol_diagram.png'
  );

  // Page 58 Q172 sol
  await cropAndTrim(
    path.join(pagesDir, 'page_058.png'),
    [240, 180, 750, 360],
    'q172_sol_diagram.png'
  );

  // Page 66 Q198 stem
  await cropAndTrim(
    path.join(pagesDir, 'page_066.png'),
    [240, 80, 850, 220],
    'q198_diagram.png'
  );

  // Page 66 Q198 sol
  await cropAndTrim(
    path.join(pagesDir, 'page_066.png'),
    [240, 320, 750, 580],
    'q198_sol_diagram.png'
  );
}

main().catch(console.error);
