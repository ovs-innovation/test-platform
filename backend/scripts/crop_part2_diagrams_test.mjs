import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'chemical_pages_part2');

async function findDiagramCoords() {
  const p334 = path.join(PAGES_DIR, 'page_334.png');
  const meta = await sharp(p334).metadata();
  console.log('Page 334 dimensions:', meta.width, 'x', meta.height);

  // Q210 is in column 1 (bottom half)
  // Q214 is in column 2 (middle)
  // Let's create high resolution crops
  const colW = Math.floor(meta.width / 2);

  // Q210 diagram: in left column, roughly Y = 180 to 280
  await sharp(p334)
    .extract({ left: 10, top: 180, width: 100, height: 90 })
    .resize(400, 360, { kernel: 'lanczos3' })
    .toFile(path.join(__dirname, 'chem_q210_pituitary_crop.png'));

  // Q214 diagram: in right column, roughly X = 150 to 220, Y = 110 to 230
  await sharp(p334)
    .extract({ left: colW + 20, top: 100, width: 90, height: 120 })
    .resize(360, 480, { kernel: 'lanczos3' })
    .toFile(path.join(__dirname, 'chem_q214_endocrine_body_crop.png'));

  console.log('Cropped test images saved!');
}

findDiagramCoords().catch(console.error);

