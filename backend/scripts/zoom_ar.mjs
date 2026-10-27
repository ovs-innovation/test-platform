import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batch3Dir = path.resolve(__dirname, 'thermal_pages_batch3');
const img1 = path.join(batch3Dir, 'media_1793074592814_rot270.png');

async function zoomQ13_Q20() {
  // Let's crop Q13-Q16
  await sharp(img1)
    .extract({ left: 450, top: 100, width: 200, height: 230 })
    .toFile(path.join(batch3Dir, 'zoom_q13_16.png'));

  // Let's crop Q17-Q20
  await sharp(img1)
    .extract({ left: 450, top: 320, width: 200, height: 240 })
    .toFile(path.join(batch3Dir, 'zoom_q17_20.png'));

  console.log('Zoomed crops created!');
}

zoomQ13_Q20().catch(console.error);
