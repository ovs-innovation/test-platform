import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'jee_gravitation_pages');
const outDir = path.resolve(__dirname, 'gravitation_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const TARGETS = [
  { qNum: 20, page: 7, region: [110, 50, 810, 360], desc: 'Q20 4 graphs g vs r' },
  { qNum: 25, page: 10, region: [140, 58, 540, 195], desc: 'Q25 sphere cavity & P' },
  { qNum: 29, page: 13, region: [120, 125, 420, 335], desc: 'Q29 Mangalyaan orbit' },
  { qNum: 30, page: 14, region: [150, 115, 600, 300], desc: 'Q30 sphere cavity & 3R' },
  { qNum: 31, page: 15, region: [130, 15, 520, 95], desc: 'Q31 two planets m1 and m2' },
  { qNum: 35, page: 18, region: [450, 86, 730, 290], desc: 'Q35 solid sphere cavity' },
  { qNum: 37, page: 20, region: [110, 70, 750, 270], desc: 'Q37 4 graphs V(r) vs r' },
  { qNum: 39, page: 22, region: [130, 100, 520, 255], desc: 'Q39 elliptical path ABCD' },
  { qNum: 41, page: 23, region: [110, 70, 810, 410], desc: 'Q41 4 graphs g vs d' },
  { qNum: 43, page: 25, region: [110, 110, 810, 370], desc: 'Q43 4 graphs a vs r' },
  { qNum: 60, page: 35, region: [330, 55, 500, 160], desc: 'Q60 4 particles in square' },
  { qNum: 87, page: 54, region: [420, 80, 730, 220], desc: 'Q87 sphere with cavity & particle' },
  { qNum: 89, page: 56, region: [230, 68, 460, 225], desc: 'Q89 concentric satellite orbits' },
  { qNum: 91, page: 57, region: [130, 80, 420, 205], desc: 'Q91 ring and sphere' },
  { qNum: 94, page: 58, region: [250, 520, 450, 690], desc: 'Q94 earth points A,B,C' },
  { qNum: 102, page: 63, region: [310, 95, 680, 270], desc: 'Q102 weight vs time curves' },
  { qNum: 108, page: 66, region: [610, 600, 840, 715], desc: 'Q108 two planets R and 2R' },
  { qNum: 112, page: 70, region: [600, 80, 860, 300], desc: 'Q112 4 masses in square' },
  { qNum: 117, page: 74, region: [140, 60, 410, 240], desc: 'Q117 4 particles along circle' },
  { qNum: 123, page: 78, region: [110, 375, 810, 570], desc: 'Q123 4 graphs g vs r' },
  { qNum: 126, page: 80, region: [140, 60, 380, 240], desc: 'Q126 4 spheres with centre sphere' },
  { qNum: 205, page: 128, region: [620, 570, 890, 700], desc: 'Q205 cavity R/3 and point m' },
  { qNum: 219, page: 136, region: [140, 90, 410, 260], desc: 'Q219 4 particles M,2M,3M,4M' },
  { qNum: 220, page: 137, region: [140, 100, 880, 550], desc: 'Q220 4 particles M,2M,3M,4M' }
];

async function cropAccurately(item) {
  const pad = String(item.page).padStart(3, '0');
  const imgPath = path.join(pagesDir, `page_${pad}.png`);
  if (!fs.existsSync(imgPath)) return;

  const [minX, minY, maxX, maxY] = item.region;
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

  if (count === 0) return;

  const padPx = 10;
  const cropLeft = Math.max(0, minX + bMinX - padPx);
  const cropTop = Math.max(0, minY + bMinY - padPx);
  const cropWidth = Math.min(918 - cropLeft, (bMaxX - bMinX + 1) + 2 * padPx);
  const cropHeight = Math.min(1188 - cropTop, (bMaxY - bMinY + 1) + 2 * padPx);

  const outFile = path.join(outDir, `q${item.qNum}_diagram.png`);
  await sharp(imgPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(outFile);

  console.log(`Cropped Q${item.qNum} (${item.desc}): ${cropWidth}x${cropHeight}`);
}

async function main() {
  for (const t of TARGETS) {
    await cropAccurately(t);
  }
  console.log('All 24 calibrated diagrams cropped successfully!');
}

main().catch(console.error);
