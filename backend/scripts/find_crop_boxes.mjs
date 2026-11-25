import { loadImage, createCanvas } from '@napi-rs/canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scanPage(pageName, minWidth = 100, minHeight = 50) {
  const imgPath = path.resolve(__dirname, 'periodicity_pages', pageName);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imgData.data;

  console.log(`Page: ${pageName}, dimensions: ${img.width}x${img.height}`);
  
  // Let's sample horizontal dark lines or boxes (where border is drawn)
  // Look for horizontal line segments of length > 150 that are dark (r,g,b < 100)
  const lines = [];
  for (let y = 0; y < img.height; y += 4) {
    let darkLen = 0;
    let startX = 0;
    for (let x = 0; x < img.width; x += 4) {
      const idx = (y * img.width + x) * 4;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const isDark = (r < 100 && g < 100 && b < 100);
      if (isDark) {
        if (darkLen === 0) startX = x;
        darkLen += 4;
      } else {
        if (darkLen > 200) {
          lines.push({ y, startX, len: darkLen });
        }
        darkLen = 0;
      }
    }
    if (darkLen > 200) lines.push({ y, startX, len: darkLen });
  }

  console.log(`Found ${lines.length} dark horizontal lines in ${pageName}`);
  lines.slice(0, 15).forEach(l => console.log(`  y=${l.y}, startX=${l.startX}, len=${l.len}`));
}

async function run() {
  await scanPage('page_015.png');
  await scanPage('page_027.png');
  await scanPage('page_036.png');
  await scanPage('page_045.png');
}
run().catch(console.error);
