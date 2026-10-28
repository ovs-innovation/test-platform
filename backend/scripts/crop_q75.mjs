import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_4.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropQ75() {
  const meta = await sharp(src).metadata();
  console.log('Rot 4 dims:', meta.width, meta.height);

  // Q75 is lower-left
  await sharp(src).extract({
    left: 0,
    top: Math.floor(meta.height * 0.55),
    width: Math.floor(meta.width * 0.28),
    height: Math.floor(meta.height * 0.25)
  }).toFile(path.join(outDir, 'crop_q75.png'));

  console.log('Q75 crop done.');
}

cropQ75().catch(console.error);
