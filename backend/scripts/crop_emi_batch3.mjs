import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const scratchDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';
const inputImg = path.join(scratchDir, 'rot_3.png');
const outDir = path.join(scratchDir, 'batch3_crops');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const meta = await sharp(inputImg).metadata();
  console.log('Image dimensions:', meta.width, meta.height);
  const w = meta.width;
  const h = meta.height;

  // Page 102 is left half: x: 0 to w/2
  // Page 103 is right half: x: w/2 to w

  // Page 102 Top: Q26, Q27, Q28, Q29, Q30, Q31
  await sharp(inputImg)
    .extract({ left: 0, top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p102_top.png'));

  // Page 102 Bottom: Q32, Q33
  await sharp(inputImg)
    .extract({ left: 0, top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p102_bottom.png'));

  // Page 103 Top: Q34, Q35, Q36, Q37, Q38
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p103_top.png'));

  // Page 103 Bottom: Q39, Q40, Q41, Q42
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p103_bottom.png'));

  console.log('Batch 3 crops saved successfully');
}

run();
