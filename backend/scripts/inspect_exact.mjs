import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectExact() {
  const p40 = path.resolve(__dirname, 'fluids_pages', 'page_040.png');
  // Q81: vessel with hole 'a'
  await sharp(p40)
    .extract({ left: 495, top: 780, width: 195, height: 135 })
    .png()
    .toFile(path.resolve(__dirname, 'test_q81_final.png'));

  const p3 = path.resolve(__dirname, 'fluids_pages', 'page_003.png');
  // Q7: Capillary tubes (A, B, C, D)
  await sharp(p3)
    .extract({ left: 180, top: 180, width: 620, height: 260 })
    .png()
    .toFile(path.resolve(__dirname, 'test_q7_final.png'));
}

inspectExact().catch(console.error);
