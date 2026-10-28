import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const scratchDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';
const inputImg = path.join(scratchDir, 'rot_4.png');
const outDir = path.join(scratchDir, 'batch4_crops');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const meta = await sharp(inputImg).metadata();
  console.log('Image dimensions:', meta.width, meta.height);
  const w = meta.width;
  const h = meta.height;

  // Page 104 is left half: x: 0 to w/2
  // Page 105 is right half: x: w/2 to w

  // Page 104 Top: Q43, Q44, Q45
  await sharp(inputImg)
    .extract({ left: 0, top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p104_top.png'));

  // Page 104 Bottom: Q46, Q47, Q48
  await sharp(inputImg)
    .extract({ left: 0, top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p104_bottom.png'));

  // Page 105 Top: Q49, Q50, Q51, Q52
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p105_top.png'));

  // Page 105 Bottom: Q53, Q54, Q55, Q56
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p105_bottom.png'));

  console.log('Batch 4 crops saved successfully');
}

run();
