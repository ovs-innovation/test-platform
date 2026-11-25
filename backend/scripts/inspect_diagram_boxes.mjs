import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'jee_gravitation_pages');
const outDir = path.resolve(__dirname, 'gravitation_diagrams_test');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Function to find non-white bounding box within a search region
async function findBox(page, searchRegion) {
  const pad = String(page).padStart(3, '0');
  const imgPath = path.join(pagesDir, `page_${pad}.png`);
  if (!fs.existsSync(imgPath)) return null;

  const [minX, minY, maxX, maxY] = searchRegion;
  const { data, info } = await sharp(imgPath)
    .extract({ left: minX, top: minY, width: maxX - minX, height: maxY - minY })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let bMinX = info.width, bMaxX = 0, bMinY = info.height, bMaxY = 0;
  let count = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 235 || data[idx+1] < 235 || data[idx+2] < 235) {
        count++;
        if (x < bMinX) bMinX = x;
        if (x > bMaxX) bMaxX = x;
        if (y < bMinY) bMinY = y;
        if (y > bMaxY) bMaxY = y;
      }
    }
  }

  if (count === 0) return null;
  const padPx = 10;
  const cropLeft = Math.max(0, minX + bMinX - padPx);
  const cropTop = Math.max(0, minY + bMinY - padPx);
  const cropWidth = Math.min(918 - cropLeft, (bMaxX - bMinX + 1) + 2 * padPx);
  const cropHeight = Math.min(1188 - cropTop, (bMaxY - bMinY + 1) + 2 * padPx);

  return { cropLeft, cropTop, cropWidth, cropHeight, count };
}

// Test list of diagram questions
const diagramTargets = [
  { qNum: 20, page: 7, search: [50, 80, 880, 480], desc: 'Q20 graphs A,B,C,D' },
  { qNum: 25, page: 10, search: [450, 40, 880, 320], desc: 'Q25 sphere cavity with point P' },
  { qNum: 29, page: 13, search: [450, 50, 880, 360], desc: 'Q29 Mangalyaan orbit' },
  { qNum: 30, page: 14, search: [450, 50, 880, 340], desc: 'Q30 sphere with cavity & 3R' },
  { qNum: 31, page: 15, search: [450, 30, 880, 260], desc: 'Q31 two planets m1 and m2' },
  { qNum: 35, page: 18, search: [450, 30, 880, 320], desc: 'Q35 solid sphere cavity' },
  { qNum: 37, page: 20, search: [50, 80, 880, 480], desc: 'Q37 V(r) vs r graphs' },
  { qNum: 39, page: 22, search: [450, 30, 880, 360], desc: 'Q39 elliptical path ABCD' },
  { qNum: 41, page: 23, search: [50, 80, 880, 480], desc: 'Q41 g vs d graphs' },
  { qNum: 43, page: 25, search: [50, 80, 880, 480], desc: 'Q43 a vs r graphs' },
  { qNum: 60, page: 35, search: [450, 50, 880, 360], desc: 'Q60 4 particles in square' },
  { qNum: 87, page: 54, search: [450, 30, 880, 350], desc: 'Q87 sphere with cavity & particle' },
  { qNum: 89, page: 56, search: [450, 50, 880, 350], desc: 'Q89 concentric satellite orbits' },
  { qNum: 91, page: 57, search: [450, 50, 880, 350], desc: 'Q91 ring and sphere' },
  { qNum: 102, page: 63, search: [450, 40, 880, 380], desc: 'Q102 weight vs time curves' },
  { qNum: 108, page: 66, search: [450, 500, 880, 850], desc: 'Q108 two planets R and 2R' },
  { qNum: 112, page: 70, search: [450, 30, 880, 350], desc: 'Q112 4 masses in square' },
  { qNum: 117, page: 74, search: [450, 30, 880, 350], desc: 'Q117 4 particles along circle' },
  { qNum: 123, page: 78, search: [50, 80, 880, 480], desc: 'Q123 g vs r graphs' },
  { qNum: 126, page: 80, search: [450, 30, 880, 350], desc: 'Q126 4 spheres with centre sphere' },
  { qNum: 205, page: 128, search: [450, 50, 880, 380], desc: 'Q205 cavity R/3 and point m' },
  { qNum: 219, page: 136, search: [450, 30, 880, 350], desc: 'Q219 4 particles M,2M,3M,4M' },
  { qNum: 220, page: 137, search: [450, 30, 880, 350], desc: 'Q220 4 particles M,2M,3M,4M' }
];

async function run() {
  for (const t of diagramTargets) {
    const box = await findBox(t.page, t.search);
    if (box) {
      const pad = String(t.page).padStart(3, '0');
      const imgPath = path.join(pagesDir, `page_${pad}.png`);
      const outFile = path.join(outDir, `q${t.qNum}_diagram.png`);
      await sharp(imgPath)
        .extract({
          left: box.cropLeft,
          top: box.cropTop,
          width: box.cropWidth,
          height: box.cropHeight
        })
        .png()
        .toFile(outFile);
      console.log(`Cropped Q${t.qNum} (Page ${t.page}): ${box.cropWidth}x${box.cropHeight} -> ${outFile}`);
    } else {
      console.warn(`No box found for Q${t.qNum} on Page ${t.page}`);
    }
  }
}

run().catch(console.error);
