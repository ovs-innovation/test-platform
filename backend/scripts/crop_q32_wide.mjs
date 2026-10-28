import sharp from 'sharp';
import path from 'path';

const src = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter/rot_2.png';
const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/mag_matter';

async function cropQ32Wide() {
  const meta = await sharp(src).metadata();
  await sharp(src).extract({
    left: Math.floor(meta.width * 0.0),
    top: Math.floor(meta.height * 0.7),
    width: Math.floor(meta.width * 0.5),
    height: Math.floor(meta.height * 0.3)
  }).toFile(path.join(outDir, 'crop_q32_wide.png'));
  console.log('Q32 wide crop done.');
}

cropQ32Wide().catch(console.error);
