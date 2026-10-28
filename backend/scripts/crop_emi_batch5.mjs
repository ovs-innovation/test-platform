import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const scratchDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';
const inputImg = path.join(scratchDir, 'rot_5.png');
const outDir = path.join(scratchDir, 'batch5_crops');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const meta = await sharp(inputImg).metadata();
  console.log('Image dimensions:', meta.width, meta.height);
  const w = meta.width;
  const h = meta.height;

  // Page 106 is left half: x: 0 to w/2
  // Page 107 is right half: x: w/2 to w

  // Page 106 Top: Q57, Q58, Q59, Q60, Q61, Q62
  await sharp(inputImg)
    .extract({ left: 0, top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p106_top.png'));

  // Page 106 Bottom: Q63, Q64, Q65, Q66, Q67
  await sharp(inputImg)
    .extract({ left: 0, top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p106_bottom.png'));

  // Page 107 Top: Q68, Q69, Q70, Q71, Q72
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p107_top.png'));

  // Page 107 Bottom: Q73, Q74
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p107_bottom.png'));

  console.log('Batch 5 crops saved successfully');
}

run();
