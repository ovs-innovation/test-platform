import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batch3Dir = path.resolve(__dirname, 'thermal_pages_batch3');
const img1 = path.join(batch3Dir, 'media_1793074592814_rot270.png');

async function recrop() {
  const meta = await sharp(img1).metadata();
  // img1 width is 650, height is 568
  // Page 218 starts around x = 220
  // Let's crop col1 with x from 220 to 460 (width 240)
  await sharp(img1)
    .extract({ left: 220, top: 0, width: 235, height: meta.height })
    .toFile(path.join(batch3Dir, 'crop_p218_col1_wide.png'));

  // Col 2 from 430 to 650 (width 220)
  await sharp(img1)
    .extract({ left: 430, top: 0, width: meta.width - 430, height: meta.height })
    .toFile(path.join(batch3Dir, 'crop_p218_col2_wide.png'));

  console.log('Recropped page 218 wide!');
}

recrop().catch(console.error);
