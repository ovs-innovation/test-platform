import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batch3Dir = path.resolve(__dirname, 'thermal_pages_batch3');
const img1 = path.join(batch3Dir, 'media_1793074592814_rot270.png');

async function zoomQ5_Q12() {
  // Let's crop Q5-Q8
  await sharp(img1)
    .extract({ left: 240, top: 100, width: 220, height: 210 })
    .toFile(path.join(batch3Dir, 'zoom_q5_8.png'));

  // Let's crop Q9-Q12
  await sharp(img1)
    .extract({ left: 240, top: 310, width: 220, height: 220 })
    .toFile(path.join(batch3Dir, 'zoom_q9_12.png'));

  console.log('Zoomed crops for Q5-Q12 created!');
}

zoomQ5_Q12().catch(console.error);
