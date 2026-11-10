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
  // Q7 on page 3: between y=230 and y=600
  await findBBox(3, 50, 230, 500, 600, 'Q7 Diagram');

  // Q14 on page 4: between y=500 and y=730
  await findBBox(4, 50, 500, 520, 730, 'Q14 Diagram');

  // Q27 on page 7: between y=270 and y=500
  await findBBox(7, 50, 270, 500, 500, 'Q27 Diagram');

  // Q31 on page 8: Options A, B, C, D
  await findBBox(8, 50, 260, 350, 460, 'Q31 Opt A');
  await findBBox(8, 50, 470, 350, 680, 'Q31 Opt B');
  await findBBox(8, 50, 690, 350, 900, 'Q31 Opt C');
  await findBBox(8, 50, 910, 350, 1120, 'Q31 Opt D');

  // Q39 on page 10: Options A, B, C, D
  await findBBox(10, 50, 280, 350, 480, 'Q39 Opt A');
  await findBBox(10, 50, 490, 350, 700, 'Q39 Opt B');
  await findBBox(10, 50, 710, 350, 920, 'Q39 Opt C');
  await findBBox(10, 50, 930, 350, 1140, 'Q39 Opt D');

  // Q45 on page 12: Options A, B, C, D
  await findBBox(12, 50, 260, 360, 470, 'Q45 Opt A');
  await findBBox(12, 50, 480, 360, 690, 'Q45 Opt B');
  await findBBox(12, 50, 700, 360, 910, 'Q45 Opt C');
  await findBBox(12, 50, 920, 360, 1130, 'Q45 Opt D');

  // Q53 on page 14: Diagram showing 4 figures (1), (2), (3), (4)
  await findBBox(14, 50, 260, 550, 650, 'Q53 Diagram');

  // Q57 on page 15: Diagram
  await findBBox(15, 50, 280, 560, 780, 'Q57 Diagram');
}

run().catch(console.error);

