import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, 'gravitation_pages');

async function findBBox(pageNum, minX, minY, maxX, maxY, label) {
  const pagePath = path.join(pagesDir, `page_${pageNum}.png`);
  const img = await loadImage(pagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);
  const data = imgData.data;
  const width = maxX - minX;
  const height = maxY - minY;
  
  let boxMinX = width, boxMaxX = 0, boxMinY = height, boxMaxY = 0;
  let count = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Dark pixel (text or line)
      if (r < 210 || g < 210 || b < 210) {
        if (x < boxMinX) boxMinX = x;
        if (x > boxMaxX) boxMaxX = x;
        if (y < boxMinY) boxMinY = y;
        if (y > boxMaxY) boxMaxY = y;
        count++;
      }
    }
  }
  
  console.log(`${label}: count=${count}, bbox: x=${minX + boxMinX}, y=${minY + boxMinY}, w=${boxMaxX - boxMinX + 1}, h=${boxMaxY - boxMinY + 1}`);
  return { x: minX + boxMinX, y: minY + boxMinY, w: boxMaxX - boxMinX + 1, h: boxMaxY - boxMinY + 1 };
}

async function run() {
  console.log('=== EXACT BBOX DETECTION FOR GRAVITATION ===');
  // Q7 on page 3: between y=260 and y=630
  await findBBox(3, 50, 260, 520, 630, 'Q7 Diagram');

  // Q14 on page 4: between y=860 and y=1170
  await findBBox(4, 50, 860, 520, 1170, 'Q14 Diagram');

  // Q27 on page 7: between y=260 and y=555
  await findBBox(7, 50, 260, 500, 555, 'Q27 Diagram');

  // Q31 on page 8: Options A, B, C, D
  await findBBox(8, 105, 260, 350, 460, 'Q31 Opt A graph');
  await findBBox(8, 105, 470, 350, 680, 'Q31 Opt B graph');
  await findBBox(8, 105, 690, 350, 900, 'Q31 Opt C graph');
  await findBBox(8, 105, 910, 350, 1120, 'Q31 Opt D graph');

  // Q39 on page 10: Options A, B, C, D
  await findBBox(10, 105, 280, 350, 480, 'Q39 Opt A graph');
  await findBBox(10, 105, 490, 350, 700, 'Q39 Opt B graph');
  await findBBox(10, 105, 710, 350, 920, 'Q39 Opt C graph');
  await findBBox(10, 105, 930, 350, 1140, 'Q39 Opt D graph');

  // Q45 on page 12: Options A, B, C, D
  await findBBox(12, 105, 260, 360, 470, 'Q45 Opt A graph');
  await findBBox(12, 105, 480, 360, 690, 'Q45 Opt B graph');
  await findBBox(12, 105, 700, 360, 910, 'Q45 Opt C graph');
  await findBBox(12, 105, 920, 360, 1130, 'Q45 Opt D graph');

  // Q53 on page 14: Diagram showing 4 figures (1), (2), (3), (4)
  await findBBox(14, 50, 260, 550, 665, 'Q53 Diagram');

  // Q57 on page 15: between y=465 and y=835
  await findBBox(15, 50, 465, 560, 835, 'Q57 Diagram');
}

run().catch(console.error);

