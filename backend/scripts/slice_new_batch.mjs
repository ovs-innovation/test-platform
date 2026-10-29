import sharp from 'sharp';
import fs from 'fs';

const dir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/1fe9b0b1-e6b1-44d1-9b90-eceb46bb512f/.user_uploaded/';
const outDir = 'scripts/new_slices/';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function sliceImage(src, name) {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  const hw = Math.floor(w / 2);
  const hh = Math.floor(h / 2);

  // Top Left
  await sharp(src).extract({ left: 0, top: 0, width: hw, height: hh }).toFile(`${outDir}${name}_tl.png`);
  // Top Right
  await sharp(src).extract({ left: hw, top: 0, width: w - hw, height: hh }).toFile(`${outDir}${name}_tr.png`);
  // Bottom Left
  await sharp(src).extract({ left: 0, top: hh, width: hw, height: h - hh }).toFile(`${outDir}${name}_bl.png`);
  // Bottom Right
  await sharp(src).extract({ left: hw, top: hh, width: w - hw, height: h - hh }).toFile(`${outDir}${name}_br.png`);
}

async function sliceHalfImage(src, name) {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  const hw = Math.floor(w / 2);

  // Left
  await sharp(src).extract({ left: 0, top: 0, width: hw, height: h }).toFile(`${outDir}${name}_left.png`);
  // Right
  await sharp(src).extract({ left: hw, top: 0, width: w - hw, height: h }).toFile(`${outDir}${name}_right.png`);
}

async function run() {
  // media_1793256952931.png is 467 x 667 (has 4 pages: 258, 259, 260, 261)
  await sliceImage(dir + 'media_1793256952931.png', 'p258_261');
  // media_1793256972716.png is 463 x 666 (has 4 pages: 268, 269, 270, 271)
  await sliceImage(dir + 'media_1793256972716.png', 'p268_271');
  // media_1793257035541.png is 467 x 327 (has 2 pages: 264, 265)
  await sliceHalfImage(dir + 'media_1793257035541.png', 'p264_265');
  // media_1793256997458.png is 467 x 330 (has 2 pages: 266, 267)
  await sliceHalfImage(dir + 'media_1793256997458.png', 'p266_267');
  console.log('All slices created successfully!');
}
run();
