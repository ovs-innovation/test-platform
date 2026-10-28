import sharp from 'sharp';
import path from 'path';

const scratch = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/emi_batch6';
const src = path.join(scratch, 'rot_4.png');

async function cropColumns() {
  const meta = await sharp(src).metadata();
  console.log('rot_4 meta:', meta.width, meta.height);
  // rot_4 has 2 columns:
  // Col 1: left half (x: 0 to 150)
  // Col 2: right half (x: 140 to 296)
  await sharp(src).extract({ left: 0, top: 0, width: 155, height: meta.height }).toFile(path.join(scratch, 'ar_col1.png'));
  await sharp(src).extract({ left: 145, top: 0, width: meta.width - 145, height: meta.height }).toFile(path.join(scratch, 'ar_col2.png'));
  console.log('Cropped ar_col1 and ar_col2');
}

cropColumns().catch(console.error);
