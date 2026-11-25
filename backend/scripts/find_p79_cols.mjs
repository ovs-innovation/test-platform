import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findCols() {
  const p79 = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const { data, info } = await sharp(p79).raw().toBuffer({ resolveWithObject: true });

  const colHist = new Array(info.width).fill(0);
  for (let x = 0; x < info.width; x++) {
    for (let y = 110; y <= 960; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 150 && g < 150 && b < 150) {
        colHist[x]++;
      }
    }
  }

  // Find min and max X
  let minX = 0, maxX = info.width;
  for (let x = 0; x < info.width; x++) {
    if (colHist[x] > 20) { minX = x; break; }
  }
  for (let x = info.width - 1; x >= 0; x--) {
    if (colHist[x] > 20) { maxX = x; break; }
  }
  console.log(`Content X range: ${minX} to ${maxX}, total width = ${maxX - minX}`);
  const colWidth = (maxX - minX) / 6;
  console.log(`Estimated col width: ${colWidth}`);
}

findCols().catch(console.error);
