import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi/rot_1.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi';

async function cropBatch1() {
  const meta = await sharp(src).metadata();
  console.log('Rot 1 dims:', meta.width, meta.height);

  // Left page (Page 98)
  await sharp(src).extract({
    left: 0,
    top: 0,
    width: Math.floor(meta.width * 0.5),
    height: meta.height
  }).toFile(path.join(outDir, 'page_98.png'));

  // Right page (Page 99)
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.48),
    top: 0,
    width: Math.floor(meta.width * 0.52),
    height: meta.height
  }).toFile(path.join(outDir, 'page_99.png'));

  console.log('Batch 1 pages cropped.');
}

cropBatch1().catch(console.error);
