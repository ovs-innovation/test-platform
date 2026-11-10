import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, 'com_pages');

async function inspectOptA() {
  const pagePath = path.join(pagesDir, `page_3.png`);
  const img = await loadImage(pagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  // Find where the graph is vs where (A) is
  // (A) is near x=69..100, y=730..755
  // Let's check non-white pixels for x > 100
  const minX = 105, minY = 730, maxX = 400, maxY = 950;
  const imgData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);
  const data = imgData.data;
  let count = 0;
  let boxMinX = maxX - minX, boxMaxX = 0, boxMinY = maxY - minY, boxMaxY = 0;
  for (let y = 0; y < maxY - minY; y++) {
    for (let x = 0; x < maxX - minX; x++) {
      const idx = (y * (maxX - minX) + x) * 4;
      if (data[idx] < 210) {
        if (x < boxMinX) boxMinX = x;
        if (x > boxMaxX) boxMaxX = x;
        if (y < boxMinY) boxMinY = y;
        if (y > boxMaxY) boxMaxY = y;
        count++;
      }
    }
  }
  console.log(`Graph part only: x=${minX + boxMinX}, y=${minY + boxMinY}, w=${boxMaxX - boxMinX + 1}, h=${boxMaxY - boxMinY + 1}`);
}

inspectOptA().catch(console.error);

