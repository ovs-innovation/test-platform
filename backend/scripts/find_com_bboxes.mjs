import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, 'com_pages');

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
  console.log('=== EXACT BBOX DETECTION ===');
  // Q1 on page 2: between y=400 and y=780
  await findBBox(2, 60, 400, 600, 780, 'Q1 Diagram');

  // Q2 on page 3: between y=345 and y=725
  await findBBox(3, 60, 345, 550, 725, 'Q2 Diagram');

  // Q2 options (A), (B), (C) on page 3
  await findBBox(3, 60, 730, 400, 950, 'Q2 Opt A');
  await findBBox(3, 60, 950, 400, 1170, 'Q2 Opt B');
  await findBBox(3, 60, 1170, 400, 1400, 'Q2 Opt C');

  // Q2 option (D) on page 4: between y=145 and y=395
  await findBBox(4, 60, 145, 400, 395, 'Q2 Opt D');

  // Q13 on page 6: between y=290 and y=665
  await findBBox(6, 60, 290, 500, 665, 'Q13 Diagram');

  // Q20 on page 7: between y=1070 and y=1440
  await findBBox(7, 60, 1070, 450, 1440, 'Q20 Diagram');

  // Q26 on page 9: between y=260 and y=665
  await findBBox(9, 60, 260, 600, 665, 'Q26 Diagram');
}

run().catch(console.error);
