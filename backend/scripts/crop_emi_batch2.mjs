import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const scratchDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';
const inputImg = path.join(scratchDir, 'rot_2.png');
const outDir = path.join(scratchDir, 'batch2_crops');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const meta = await sharp(inputImg).metadata();
  console.log('Image dimensions:', meta.width, meta.height);

  const w = meta.width;
  const h = meta.height;

  // Page 100: Top (Q14, Q15, Q16)
  await sharp(inputImg)
    .extract({ left: 0, top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.48) })
    .toFile(path.join(outDir, 'p100_top.png'));

  // Page 100: Bottom (Q17, Q18, Q19)
  await sharp(inputImg)
    .extract({ left: 0, top: Math.floor(h * 0.44), width: Math.floor(w / 2), height: Math.floor(h * 0.56) })
    .toFile(path.join(outDir, 'p100_bottom.png'));

  // Page 101: Top (Q20, Q21, Q22, Q23)
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: 0, width: Math.floor(w / 2), height: Math.floor(h * 0.50) })
    .toFile(path.join(outDir, 'p101_top.png'));

  // Page 101: Bottom (Q24, Q25)
  await sharp(inputImg)
    .extract({ left: Math.floor(w / 2), top: Math.floor(h * 0.48), width: Math.floor(w / 2), height: Math.floor(h * 0.52) })
    .toFile(path.join(outDir, 'p101_bottom.png'));

  console.log('Batch 2 crops saved successfully to:', outDir);
}

run();
